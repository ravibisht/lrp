import React, { useState, useEffect, useCallback } from 'react';
import { Target, Play, RotateCcw, AlertTriangle } from 'lucide-react';

export default function ChappalSmashGame() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [activeRoaches, setActiveRoaches] = useState<number[]>([]);
  const [splats, setSplats] = useState<{ id: number, index: number }[]>([]);

  // 9 holes/positions for roaches to appear
  const gridCount = 9;

  const startGame = () => {
    setScore(0);
    setTimeLeft(20);
    setActiveRoaches([]);
    setSplats([]);
    setGameState("playing");
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === "playing") {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameState("gameover");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState]);

  useEffect(() => {
    let spawner: NodeJS.Timeout;
    if (gameState === "playing") {
      const spawnRate = Math.max(400, 1000 - (20 - timeLeft) * 30); // Faster over time
      spawner = setInterval(() => {
        const availablePos = Array.from({ length: gridCount }, (_, i) => i).filter(i => !activeRoaches.includes(i));
        if (availablePos.length > 0) {
          const spawnCount = Math.random() > 0.7 ? 2 : 1; // Sometimes spawn two
          const toSpawn: number[] = [];
          for (let i = 0; i < Math.min(spawnCount, availablePos.length); i++) {
            const pos = availablePos[Math.floor(Math.random() * availablePos.length)];
            toSpawn.push(pos);
            // Remove from available so we don't pick it again this tick
            availablePos.splice(availablePos.indexOf(pos), 1);
          }
          
          setActiveRoaches(prev => [...prev, ...toSpawn]);

          // Roaches disappear if not smacked
          setTimeout(() => {
            setActiveRoaches(prev => prev.filter(p => !toSpawn.includes(p)));
          }, spawnRate * 1.5);
        }
      }, spawnRate);
    }
    return () => clearInterval(spawner);
  }, [gameState, activeRoaches, timeLeft]);

  const handleSmash = (index: number) => {
    if (gameState !== "playing" || !activeRoaches.includes(index)) return;

    // Successful hit
    setScore(s => s + 10);
    setActiveRoaches(prev => prev.filter(p => p !== index));
    
    // Add visual splat
    const splatId = Date.now() + Math.random();
    setSplats(prev => [...prev, { id: splatId, index }]);
    
    // Remove splat after a moment
    setTimeout(() => {
      setSplats(prev => prev.filter(s => s.id !== splatId));
    }, 500);
  };

  return (
    <div className="bg-[#FFD700] border-4 border-black p-4 sm:p-6 md:p-8 flex flex-col justify-between h-full relative font-mono shadow-[6px_6px_0px_#000]">
      <div className="absolute top-0 right-0 w-24 h-24 border-l-4 border-b-4 border-black opacity-15 pointer-events-none" />
      
      {/* Game Header */}
      <div className="flex items-center justify-between border-b-4 border-black pb-4 mb-4 select-none">
        <div className="flex items-center gap-2">
          <div className="bg-black text-white p-2 border-2 border-white">
            <Target className="w-5 h-5 text-[#FFD700] animate-pulse" />
          </div>
          <div>
            <h3 className="font-display font-black text-black text-lg sm:text-xl tracking-tighter uppercase leading-none">
              CHAPPAL STRIKE
            </h3>
            <p className="text-[9px] sm:text-[10px] text-zinc-800 font-extrabold uppercase mt-0.5">
              MOBILE TACTICAL EXERCISE
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-[10px] font-black text-black uppercase">TIME LEFT</div>
          <div className={`text-2xl font-black ${timeLeft <= 5 ? "text-red-600 animate-bounce" : "text-black"}`}>
            {timeLeft}s
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative bg-zinc-100 border-4 border-black w-full aspect-square mx-auto max-w-sm mb-4">
        
        <div className="absolute top-2 left-2 px-2 py-1 bg-black text-white text-xs font-black uppercase shadow-[2px_2px_0_#FFD700] z-10">
          SCORE: {score}
        </div>

        <div className="grid grid-cols-3 grid-rows-3 h-full w-full gap-0 divide-x-2 divide-y-2 divide-black/20">
          {Array.from({ length: gridCount }).map((_, i) => (
            <div 
              key={i} 
              className="relative flex items-center justify-center cursor-crosshair overflow-hidden touch-manipulation"
              onPointerDown={(e) => {
                e.preventDefault(); // Prevent touch scrolling while playing
                handleSmash(i);
              }}
            >
              {activeRoaches.includes(i) && (
                <div className="text-4xl sm:text-5xl animate-bounce pointer-events-none select-none filter drop-shadow-md">
                  🪳
                </div>
              )}
              {splats.find(s => s.index === i) && (
                <div className="absolute text-5xl sm:text-6xl text-rose-600 font-black rotate-12 scale-110 pointer-events-none select-none opacity-80">
                  💥
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Overlays */}
        {gameState === "idle" && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-4 text-center z-20">
            <div className="text-5xl mb-2 select-none animate-bounce">🩴</div>
            <h4 className="text-[#FFD700] font-black text-2xl uppercase font-display mb-2">Whack-a-Roach</h4>
            <p className="text-white text-[10px] font-bold mb-4 px-4 leading-relaxed uppercase">
              Tap the roaches with your tactical chappal before they hide. Perfect for mobile field agents!
            </p>
            <button
              onClick={startGame}
              className="brutalist-button-yellow px-6 py-3 flex items-center gap-2 cursor-pointer text-xs"
            >
              <Play className="w-4 h-4" /> START EXERCISE
            </button>
          </div>
        )}

        {gameState === "gameover" && (
          <div className="absolute inset-0 bg-[#FFD700]/95 flex flex-col items-center justify-center p-4 text-center z-20 border-4 border-black">
            <AlertTriangle className="w-10 h-10 text-black mb-2 animate-pulse" />
            <h4 className="text-black font-black text-2xl uppercase font-display mb-1">DRILL COMPLETE</h4>
            <div className="bg-black text-white px-4 py-2 font-black text-xl mb-4 border-2 border-white shadow-[4px_4px_0_#000]">
              SCORE: {score}
            </div>
            <p className="text-black text-[10px] font-bold mb-4 uppercase">
              {score > 150 ? "EXCEPTIONAL TACTICAL PRECISION." : "SUSTAINED DAMAGE. MORE PRACTICE REQUIRED."}
            </p>
            <button
              onClick={startGame}
              className="brutalist-button-dark px-6 py-3 flex items-center gap-2 cursor-pointer text-xs"
            >
              <RotateCcw className="w-4 h-4 text-[#FFD700]" /> PLAY AGAIN
            </button>
          </div>
        )}
      </div>

      <div className="text-[9px] font-black text-black text-center uppercase tracking-widest border-t-2 border-black pt-3">
        LRP Mobile Task Force • Chappal Division
      </div>
    </div>
  );
}
