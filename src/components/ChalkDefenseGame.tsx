import React, { useRef, useState, useEffect } from "react";
import { Shield, Sparkles, RefreshCw, Volume2, Info, Moon } from "lucide-react";

interface Point {
  x: number;
  y: number;
}

interface ChalkLine {
  id: string;
  points: Point[];
  intensity: number; // starts at 100, drops on bug contact
}

interface Cockroach {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  speed: number;
  size: number;
  isRoasted: boolean;
  roastedTimer: number;
  angle: number;
  wiggle: number;
  type: "classic" | "flyer" | "boss";
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
}

export default function ChalkDefenseGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem("lrp_defense_highscore") || "0", 10);
    } catch {
      return 0;
    }
  });
  const [repelled, setRepelled] = useState(0);
  const [health, setHealth] = useState(100);
  const [chalkSupply, setChalkSupply] = useState(100);
  const [level, setLevel] = useState(1);
  const [isDrawing, setIsDrawing] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Core game objects stored in refs for the 60fps loop
  const cockroachesRef = useRef<Cockroach[]>([]);
  const chalkLinesRef = useRef<ChalkLine[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const currentLineRef = useRef<Point[]>([]);
  const nextBugIdRef = useRef(1);
  const animationFrameIdRef = useRef<number | null>(null);
  
  // Audio synths purely using WebAudio API for absolute client independence (no external assets to break!)
  const audioCtxRef = useRef<AudioContext | null>(null);
  
  const playBeep = (freq: number, duration: number, type: "sine" | "triangle" | "sawtooth" = "sine") => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio failed, ignore gracefully
    }
  };

  // Safe window-resizer logic using ResizeObserver
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        canvas.width = Math.max(width, 300);
        canvas.height = Math.max(height, 420);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Set highscore updates
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      try {
        localStorage.setItem("lrp_defense_highscore", score.toString());
      } catch (e) {}
    }
  }, [score, highScore]);

  // Point-to-segment distance check for precise drawing collisions
  const getDistanceToSegment = (px: number, py: number, ax: number, ay: number, bx: number, by: number) => {
    const dx = bx - ax;
    const dy = by - ay;
    const lenSq = dx * dx + dy * dy;
    
    if (lenSq === 0) {
      return Math.sqrt((px - ax) * (px - ax) + (py - ay) * (py - ay));
    }
    
    let t = ((px - ax) * dx + (py - ay) * dy) / lenSq;
    t = Math.max(0, Math.min(1, t)); // clamp projection to segment boundary
    
    const cx = ax + t * dx;
    const cy = ay + t * dy;
    
    return Math.sqrt((px - cx) * (px - cx) + (py - cy) * (py - cy));
  };

  // Canvas drawing, insect paths, logic operations frame-by-frame
  const updateGame = () => {
    const canvas = canvasRef.current;
    if (!canvas || gameState !== "playing") return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear Canvas with alpha trail for neat motion flow
    ctx.fillStyle = "rgba(9, 9, 11, 0.28)"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const targetX = canvas.width / 2;
    const targetY = canvas.height - 45;

    // 1. Draw Target (The Fortress Zone/Safe Sugar Box)
    // Draw outer boundary warning circle
    ctx.beginPath();
    ctx.arc(targetX, targetY, 40, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(234, 179, 8, 0.15)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Draw the Sacred Sugar Bowl / Sneakers
    ctx.fillStyle = "#eab308";
    ctx.shadowColor = "#eab308";
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(targetX, targetY - 12, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0; // reset glow

    // Pot base
    ctx.fillStyle = "#a1a1aa";
    ctx.beginPath();
    ctx.moveTo(targetX - 18, targetY);
    ctx.lineTo(targetX + 18, targetY);
    ctx.lineTo(targetX + 12, targetY + 14);
    ctx.lineTo(targetX - 12, targetY + 14);
    ctx.closePath();
    ctx.fill();

    // Text on the Safe Zone
    ctx.font = "bold 10px monospace";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText("LRP FORTRESS", targetX, targetY + 28);


    // 2. Draw Chalk Lines
    chalkLinesRef.current.forEach((line) => {
      if (line.points.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(line.points[0].x, line.points[0].y);
      for (let i = 1; i < line.points.length; i++) {
        ctx.lineTo(line.points[i].x, line.points[i].y);
      }
      
      // Make chalk look organic using stroke dash and varying alpha
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 + (line.intensity / 100) * 0.6})`;
      ctx.shadowColor = "#ffffff";
      ctx.shadowBlur = 4;
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Semi-rough line texture
      ctx.setLineDash([1, Math.random() * 2 + 1]);
      ctx.stroke();
      ctx.setLineDash([]); // clear dash
      ctx.shadowBlur = 0; // clear shadow
    });

    // Draw current active drawing line
    if (isDrawing && currentLineRef.current.length > 1) {
      ctx.beginPath();
      ctx.moveTo(currentLineRef.current[0].x, currentLineRef.current[0].y);
      currentLineRef.current.forEach((p) => ctx.lineTo(p.x, p.y));
      ctx.strokeStyle = "#38bdf8"; // cyan drawing line
      ctx.lineWidth = 3.5;
      ctx.stroke();
    }

    // 3. Spawning Cockroaches at the top corners (representing CJP damp areas)
    const spawnRate = Math.max(12, 45 - level * 3); // Spawns faster as level advances
    if (Math.random() * spawnRate < 1 && cockroachesRef.current.length < 18 + level * 2) {
      const typeRand = Math.random() * 100;
      let type: "classic" | "flyer" | "boss" = "classic";
      let size = 9 + Math.random() * 6;
      let speed = 0.8 + Math.random() * 0.7 + (level * 0.1);
      let color = "#7c2d12"; // red-brown classic

      if (typeRand > 88 && level >= 2) {
        type = "flyer";
        speed = 1.6 + Math.random() * 0.9;
        size = 8 + Math.random() * 4;
      } else if (typeRand < 8 && level >= 3) {
        type = "boss";
        size = 24 + Math.random() * 6;
        speed = 0.4 + Math.random() * 0.3;
      }

      // Spawns from top 30% of screen height from sides or absolute top edge
      const spawnSide = Math.floor(Math.random() * 3);
      let sx = 0, sy = 0;
      
      if (spawnSide === 0) { // Top edge
        sx = Math.random() * canvas.width;
        sy = -20;
      } else if (spawnSide === 1) { // Left edge
        sx = -20;
        sy = Math.random() * (canvas.height * 0.4);
      } else { // Right edge
        sx = canvas.width + 20;
        sy = Math.random() * (canvas.height * 0.4);
      }

      cockroachesRef.current.push({
        id: nextBugIdRef.current++,
        x: sx,
        y: sy,
        vx: 0,
        vy: 0,
        speed,
        size,
        isRoasted: false,
        roastedTimer: 0,
        angle: 0,
        wiggle: Math.random() * Math.PI,
        type
      });
    }

    // 4. Update and Draw Cockroaches
    cockroachesRef.current = cockroachesRef.current.filter((bug) => {
      // If roasted, draw dying animated explosion and discard
      if (bug.isRoasted) {
        bug.roastedTimer += 1.5;
        ctx.save();
        ctx.translate(bug.x, bug.y);
        ctx.beginPath();
        ctx.arc(0, 0, bug.size * (1 + bug.roastedTimer / 10), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(234, 179, 8, ${Math.max(0, 1 - bug.roastedTimer / 25)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Little burning sparks
        ctx.fillStyle = `rgba(34, 211, 238, ${Math.max(0, 1 - bug.roastedTimer / 25)})`;
        ctx.font = "bold 8px monospace";
        ctx.textAlign = "center";
        ctx.fillText("ZEPT!", 0, -10);
        ctx.restore();

        return bug.roastedTimer < 25; // keep in array until fade out completes
      }

      // Compute vector towards target LRP Fortress
      const dx = targetX - bug.x;
      const dy = targetY - bug.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Simple navigation towards the sugar bowl
      let targetVx = (dx / dist) * bug.speed;
      let targetVy = (dy / dist) * bug.speed;

      // Add a little sinusoidal swagger/wiggle (very cockroach-like creeping!)
      bug.wiggle += 0.12;
      const wiggleAmp = bug.type === "flyer" ? 1.4 : 0.6;
      targetVx += Math.sin(bug.wiggle) * wiggleAmp;
      
      // Update position
      bug.x += targetVx;
      bug.y += targetVy;
      bug.angle = Math.atan2(targetVy, targetVx);

      // Check collision with ANY active chalk line
      let contactLineId: string | null = null;
      let collided = false;

      for (let line of chalkLinesRef.current) {
        if (line.points.length < 2) continue;
        for (let i = 0; i < line.points.length - 1; i++) {
          const ptA = line.points[i];
          const ptB = line.points[i + 1];
          const d = getDistanceToSegment(bug.x, bug.y, ptA.x, ptA.y, ptB.x, ptB.y);
          if (d < bug.size / 2 + 10) {
            collided = true;
            contactLineId = line.id;
            break;
          }
        }
        if (collided) break;
      }

      if (collided) {
        // Spark audio & particle emission
        playBeep(440 + Math.random() * 200, 0.08, "triangle");
        
        // Spawn sparks
        for (let j = 0; j < 8; j++) {
          particlesRef.current.push({
            x: bug.x,
            y: bug.y,
            vx: (Math.random() - 0.5) * 5,
            vy: (Math.random() - 0.5) * 5,
            color: j % 2 === 0 ? "#22d3ee" : "#facc15",
            size: Math.random() * 3 + 1.5,
            alpha: 1
          });
        }

        if (bug.type === "boss") {
          // Bosses split or bounce hard
          bug.x -= targetVx * 18;
          bug.y -= targetVy * 18;
          bug.speed *= 1.2; // get angry
          // De-grade corresponding chalk line intensity
          if (contactLineId) {
            chalkLinesRef.current = chalkLinesRef.current.map((cl) => {
              if (cl.id === contactLineId) return { ...cl, intensity: cl.intensity - 34 };
              return cl;
            }).filter((cl) => cl.intensity > 0);
          }
        } else {
          // Regular bug roasted!
          bug.isRoasted = true;
          setScore((prev) => prev + (bug.type === "flyer" ? 150 : 100));
          setRepelled((prev) => prev + 1);
          // De-grade chalk line slightly on bug impact
          if (contactLineId) {
            chalkLinesRef.current = chalkLinesRef.current.map((cl) => {
              if (cl.id === contactLineId) return { ...cl, intensity: cl.intensity - 12 };
              return cl;
            }).filter((cl) => cl.intensity > 0);
          }
        }
      }

      // Check if reached sugar/fortress box
      if (dist < 46) {
        // Fortress infiltrated! Hurt health and damage CJP influence!
        playBeep(120, 0.2, "sawtooth");
        
        // Red blood/goo particles showing breach
        for (let j = 0; j < 12; j++) {
          particlesRef.current.push({
            x: bug.x,
            y: bug.y,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            color: "#ef4444", // red alert
            size: Math.random() * 4 + 2,
            alpha: 1
          });
        }

        const dmg = bug.type === "boss" ? 25 : bug.type === "flyer" ? 15 : 10;
        setHealth((prev) => {
          const nextHealth = prev - dmg;
          if (nextHealth <= 0) {
            // End Game!
            setGameState("gameover");
            playBeep(80, 0.6, "sawtooth");
          }
          return Math.max(0, nextHealth);
        });

        // Discard bug from simulation
        return false;
      }

      // DRAW ACTIVE cockroach
      ctx.save();
      ctx.translate(bug.x, bug.y);
      ctx.rotate(bug.angle);

      // Draw creepy legs wiggle
      const legOffset = Math.sin(bug.wiggle * 2.5) * 3;
      ctx.strokeStyle = bug.type === "boss" ? "#451a03" : "#451a03";
      ctx.lineWidth = bug.type === "boss" ? 3 : 1.5;
      
      // Left legs
      ctx.beginPath();
      ctx.moveTo(-bug.size/3, -legOffset); ctx.lineTo(-bug.size, -bug.size * 1.1);
      ctx.moveTo(0, 0); ctx.lineTo(0, -bug.size * 1.1);
      ctx.moveTo(bug.size/3, legOffset); ctx.lineTo(bug.size, -bug.size * 1.1);
      // Right legs
      ctx.moveTo(-bug.size/3, legOffset); ctx.lineTo(-bug.size, bug.size * 1.1);
      ctx.moveTo(0, 0); ctx.lineTo(0, bug.size * 1.1);
      ctx.moveTo(bug.size/3, -legOffset); ctx.lineTo(bug.size, bug.size * 1.1);
      ctx.stroke();

      // Antennae
      ctx.beginPath();
      ctx.moveTo(bug.size/2, -2);
      ctx.quadraticCurveTo(bug.size * 1.2, -6 + Math.sin(bug.wiggle) * 4, bug.size * 1.5, -8);
      ctx.moveTo(bug.size/2, 2);
      ctx.quadraticCurveTo(bug.size * 1.2, 6 - Math.sin(bug.wiggle) * 4, bug.size * 1.5, 8);
      ctx.strokeStyle = "#27272a";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Bug Body Shell
      ctx.fillStyle = bug.type === "boss" ? "#451a03" : bug.type === "flyer" ? "#ea580c" : "#7c2d12";
      ctx.beginPath();
      ctx.ellipse(0, 0, bug.size, bug.size / 1.7, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Little yellow and orange wings for status/flight
      if (bug.type === "flyer") {
        ctx.fillStyle = "rgba(251, 146, 60, 0.6)";
        ctx.beginPath();
        ctx.ellipse(-2, -2, bug.size*0.8, bug.size*0.4, -0.4, 0, Math.PI * 2);
        ctx.ellipse(-2, 2, bug.size*0.8, bug.size*0.4, 0.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Cockroach stripe/abdomen grid
      ctx.strokeStyle = "rgba(0, 0, 0, 0.35)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-bug.size/2, 0); ctx.lineTo(bug.size/2, 0);
      ctx.stroke();

      // Mini text on major boss
      if (bug.type === "boss") {
        ctx.restore(); // momentarily unrotate
        ctx.save();
        ctx.translate(bug.x, bug.y);
        ctx.fillStyle = "#ef4444";
        ctx.font = "bold 9px monospace";
        ctx.textAlign = "center";
        ctx.fillText("CJP INFLUENCER", 0, -bug.size * 0.9);
        ctx.restore();
        ctx.save();
        ctx.translate(bug.x, bug.y);
        ctx.rotate(bug.angle);
      }

      ctx.restore();
      return true;
    });

    // 5. Update and Draw Particles
    particlesRef.current = particlesRef.current.filter((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.08; // dynamic gravity
      p.alpha -= 0.03;

      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1.0; // reset

      return p.alpha > 0;
    });

    // Slow ambient replenish chalk when not drawing
    if (!isDrawing && chalkSupply < 100) {
      setChalkSupply((prev) => Math.min(100, prev + 0.08));
    }

    // Dynamic level progression
    const idealLevel = Math.floor(score / 1200) + 1;
    if (idealLevel > level) {
      setLevel(idealLevel);
      playBeep(600, 0.4, "triangle");
      // Give a little bonus health
      setHealth((prev) => Math.min(100, prev + 15));
    }

    // Continue frame rendering
    animationFrameIdRef.current = requestAnimationFrame(updateGame);
  };

  // Start the render loop when game transitions to active playing state
  useEffect(() => {
    if (gameState === "playing") {
      animationFrameIdRef.current = requestAnimationFrame(updateGame);
    } else {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    }
    return () => {
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, [gameState, isDrawing, level, soundEnabled]); // rebuild on structural state shifts

  // Mouse / Touch Event Triggers
  const getMouseCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    
    let clientX = 0;
    let clientY = 0;
    
    if ("touches" in e) {
      if (e.touches.length === 0) return null;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    // Map precisely taking canvas scaling and offsets into account
    return {
      x: ((clientX - rect.left) / rect.width) * canvas.width,
      y: ((clientY - rect.top) / rect.height) * canvas.height
    };
  };

  const handleStartDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (gameState !== "playing" || chalkSupply < 10) return;
    
    // Prevent scrolling parent page on mobile touches
    if (e.cancelable) e.preventDefault();

    const coords = getMouseCoords(e);
    if (!coords) return;

    setIsDrawing(true);
    currentLineRef.current = [coords];
    playBeep(280, 0.05, "sine");
  };

  const handleDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || gameState !== "playing") return;
    
    if (e.cancelable) e.preventDefault();

    const coords = getMouseCoords(e);
    if (!coords) return;

    // Check distance from last point to throttle coordinates count
    const lastPoint = currentLineRef.current[currentLineRef.current.length - 1];
    const d = Math.sqrt((coords.x - lastPoint.x) * (coords.x - lastPoint.x) + (coords.y - lastPoint.y) * (coords.y - lastPoint.y));
    
    if (d > 4) {
      if (chalkSupply > 1) {
        currentLineRef.current.push(coords);
        setChalkSupply((prev) => Math.max(0, prev - 0.95)); // consume chalk
      } else {
        // out of chalk, commit line!
        handleEndDraw();
      }
    }
  };

  const handleEndDraw = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (currentLineRef.current.length >= 2) {
      const newLineId = "line_" + Date.now() + "_" + Math.floor(Math.random() * 100);
      chalkLinesRef.current.push({
        id: newLineId,
        points: [...currentLineRef.current],
        intensity: 100
      });
      // Play heavy boundary lock tone
      playBeep(320, 0.12, "sine");
    }

    currentLineRef.current = [];
  };

  // Game flow triggers
  const startGame = () => {
    // Purge previous leftovers
    cockroachesRef.current = [];
    chalkLinesRef.current = [];
    particlesRef.current = [];
    currentLineRef.current = [];
    nextBugIdRef.current = 1;

    setScore(0);
    setRepelled(0);
    setHealth(100);
    setChalkSupply(100);
    setLevel(1);
    setGameState("playing");

    playBeep(330, 0.1, "sine");
    setTimeout(() => playBeep(392, 0.1, "sine"), 100);
    setTimeout(() => playBeep(523, 0.25, "sine"), 200);
  };

  const clearAllLines = () => {
    chalkLinesRef.current = [];
    playBeep(180, 0.15, "triangle");
  };

  return (
    <div className="bg-white border-4 border-black shadow-[6px_6px_0px_#000] overflow-hidden relative">
      {/* Header HUD panel */}
      <div className="bg-black text-white border-b-4 border-black px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#FFD700] text-black border border-black shadow-[2px_2px_0_#fff]">
            <Shield className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-display font-black text-white tracking-tight text-sm flex items-center gap-2">
              REKHA SHIELD DEFENSE <span className="text-[10px] bg-[#FFD700] text-black px-2 py-0.5 font-mono font-black">LIVE V1</span>
            </h3>
            <p className="text-xs text-zinc-400 font-mono">Banish the crawling Cockroaches of Cockroach Janta Party!</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-none border-2 font-bold cursor-pointer ${
              soundEnabled
                ? "bg-[#FFD700] border-black text-black"
                : "bg-zinc-800 border-black text-zinc-500"
            } transition`}
            title={soundEnabled ? "Mute audio synths" : "Enable audio synths"}
          >
            <Volume2 className="w-4 h-4" />
          </button>
          
          <div className="text-right">
            <div className="text-[9px] text-[#FFD700] font-bold">HIGH SCORE</div>
            <div className="text-sm font-black text-white tracking-widest">{highScore} pts</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 bg-[#FFD700]/10">
        
        {/* Game instructions of boundary */}
        <div className="p-5 border-b md:border-b-0 md:border-r-4 border-black space-y-4 flex flex-col justify-between bg-white text-[#1A1A1A]">
          <div className="space-y-4">
            <h4 className="font-display font-black text-black flex items-center gap-2 text-sm border-b-2 border-black pb-2">
              <Info className="w-4 h-4" /> REKHA TACTICS
            </h4>
            
            <ul className="space-y-2.5 text-xs font-mono text-zinc-750 leading-relaxed list-none pl-0">
              <li className="flex gap-2">
                <span className="text-black font-black">1.</span>
                <span>Drag inside the canvas surface with a <b>mouse or finger</b> to draw white chalk barriers.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-black font-black">2.</span>
                <span>Insects <b>bounce off or vaporize</b> on meeting active chalk lines.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-black font-black">3.</span>
                <span>Each Bug impact <b>degrades Chalk thickness</b>. Maintain barriers regularly.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-black font-black">4.</span>
                <span>Stop bugs before they breach the base <b>LRP Fortress Box</b>.</span>
              </li>
            </ul>

            {/* Level & stats display */}
            <div className="p-3.5 bg-[#FFD700]/10 border-2 border-black space-y-2.5 font-mono text-xs">
              <div className="flex justify-between items-center text-zinc-800 font-bold">
                <span>REKHA UNIT LEVEL:</span>
                <span className="bg-black text-white font-black px-2 py-0.5 border border-black">{level}</span>
              </div>
              <div className="flex justify-between items-center text-zinc-800 font-bold">
                <span>BUGS ROASTED:</span>
                <span className="text-black font-black">{repelled}</span>
              </div>
            </div>
          </div>

          <div className="pt-4">
            {gameState === "playing" && (
              <button
                onClick={clearAllLines}
                className="w-full brutalist-button-yellow py-2 text-xs"
              >
                <RefreshCw className="w-3.5 h-3.5 inline-block mr-1.5 animate-spin" /> PURGE LINES
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Canvas Playing Screen */}
        <div className="md:col-span-3 relative p-4 flex flex-col justify-between" ref={containerRef}>
          
          {/* Core HUD Indicators atop of Game Screen */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between bg-black text-white px-4 py-3 rounded-none border-2 border-black z-10 select-none shadow-[4px_4px_0_#FFD700]">
            {/* LRP Fortress Integrity Gauge */}
            <div className="space-y-1 w-2/5">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-[#FFD700] font-black">FORTRESS INTEGRITY</span>
                <span className="text-white font-black">{health}%</span>
              </div>
              <div className="w-full bg-[#1A1A1A] h-2.5 border border-white">
                <div
                  className={`h-full duration-150 transition-all ${
                    health > 60 ? "bg-[#FFD700]" : health > 30 ? "bg-orange-500" : "bg-red-500"
                  }`}
                  style={{ width: `${health}%` }}
                />
              </div>
            </div>

            {/* Score */}
            <div className="text-center font-mono">
              <div className="text-[10px] text-zinc-400 font-bold">LRP COINS</div>
              <div className="text-lg font-black text-[#FFD700] tracking-widest">{score}</div>
            </div>

            {/* Chalk Supply Tank */}
            <div className="space-y-1 w-2/5">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-cyan-400 font-black">CHALK RESERVES</span>
                <span className="text-white font-black">{Math.round(chalkSupply)}%</span>
              </div>
              <div className="w-full bg-[#1A1A1A] h-2.5 border border-white">
                <div
                  className={`h-full bg-cyan-400 duration-100`}
                  style={{ width: `${chalkSupply}%` }}
                />
              </div>
            </div>
          </div>

          <div className="relative bg-zinc-950 border-4 border-black h-[430px]">
            <canvas
              ref={canvasRef}
              onMouseDown={handleStartDraw}
              onMouseMove={handleDrawing}
              onMouseUp={handleEndDraw}
              onMouseLeave={handleEndDraw}
              onTouchStart={handleStartDraw}
              onTouchMove={handleDrawing}
              onTouchEnd={handleEndDraw}
              className="w-full h-full block cursor-crosshair touch-none"
            />

            {/* Screen State Modals */}
            {gameState === "idle" && (
              <div className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center p-6 text-center z-20">
                <div className="w-20 h-20 bg-[#FFD700] text-black border-4 border-black flex items-center justify-center animate-bounce mb-6 shadow-[4px_4px_0_#fff]">
                  <Shield className="w-10 h-10" />
                </div>
                <h3 className="font-display font-black text-5xl text-[#FFD700] tracking-tight leading-none mb-2">
                  CHALK THE ROACH
                </h3>
                <p className="font-mono text-xs text-zinc-300 max-w-sm mb-6 leading-relaxed">
                  The lazy forces of the Cockroach Janta Party are crawling from the damp PG corners toward your study desk! Draw the ultimate Lakshman Rekha.
                </p>
                <button
                  onClick={startGame}
                  className="brutalist-button-yellow px-8 py-3.5 text-sm tracking-widest cursor-pointer"
                >
                  INITIALIZE REKHA OPERATION →
                </button>
              </div>
            )}

            {gameState === "gameover" && (
              <div className="absolute inset-0 bg-[#3f0000]/95 flex flex-col items-center justify-center p-6 text-center z-20 animate-fade-in">
                <div className="text-5xl mb-4 select-none">🪳💥</div>
                <h3 className="font-display font-black text-5xl text-red-500 tracking-tighter uppercase mb-2">
                  FORTRESS OVERRUN!
                </h3>
                <p className="font-mono text-xs text-zinc-300 max-w-sm mb-2 leading-relaxed">
                  Your desk has been overrun with laziness and damp bowls. CJP bugs breached the secure borders!
                </p>
                <div className="my-4 px-4 py-2 bg-black text-white border-2 border-white font-mono text-xs inline-block">
                  <span className="text-[#FFD700] font-bold">Total LRP Coins:</span>{" "}
                  <span className="font-black text-white">{score} pts</span>
                </div>
                <button
                  onClick={startGame}
                  className="brutalist-button-yellow px-8 py-3.5 text-sm cursor-pointer"
                >
                  RE-DRAW THE LINE NOW
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
