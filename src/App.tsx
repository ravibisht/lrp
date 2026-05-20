import React, { useState } from "react";
import { MANIFESTO_ITEMS, MEME_POSTERS, QUIZ_QUESTIONS, CUSTOM_AVATARS } from "./data";
import ChalkDefenseGame from "./components/ChalkDefenseGame";
import VoterCardGenerator from "./components/VoterCardGenerator";
import RekhaAuditor from "./components/RekhaAuditor";
import { 
  Shield, 
  Info, 
  CheckCircle, 
  Flame, 
  TrendingUp, 
  Award, 
  BookOpen, 
  Plus, 
  Lightbulb, 
  Image as ImageIcon, 
  AlertTriangle 
} from "lucide-react";
import { motion } from "motion/react";

export default function App() {
  // Client Quiz States
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);

  // Custom User Slogan Generator Fallback state
  const [customTopic, setCustomTopic] = useState("");
  const [genSlogan, setGenSlogan] = useState("");
  const [isGenLoading, setIsGenLoading] = useState(false);

  const handleNextQuiz = (points: number) => {
    setQuizScore((prev) => prev + points);
    setSelectedOpt(null);
    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setQuizStep((prev) => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const getQuizVerdict = (score: number) => {
    const totalMax = QUIZ_QUESTIONS.length * 10;
    const pct = (score / totalMax) * 100;

    if (pct >= 85) {
      return {
        title: "SUPREME BORDER GENERAL",
        desc: "You are the epitome of human discipline! Clean desk, early sleep, pristine posture. Cockroaches fear your presence.",
        badge: "👑"
      };
    } else if (pct >= 50) {
      return {
        title: "BORDERLINE SYMPATHIZER",
        desc: "You have potential, but occasionally you eat chips in dark corners and ignore the rules. Draw 3 chalk lines on your study bed.",
        badge: "🩴"
      };
    } else {
      return {
        title: "COCKROACH JANTA EMISSARY",
        desc: "Total emergency! You sleep when the sun rises, wake up in damp shadows, and haven't touched a wooden chair in 4 days. Contact the LRP immediately for active Baygon treatment.",
        badge: "🪳"
      };
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizScore(0);
    setQuizFinished(false);
    setSelectedOpt(null);
  };

  // Call backend to generate funny topic slogan
  const handleGenerateSlogan = async () => {
    if (!customTopic.trim()) return;
    setIsGenLoading(true);
    setGenSlogan("");
    try {
      const response = await fetch("/api/generate-slogan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: customTopic })
      });
      const data = await response.json();
      setGenSlogan(data.slogan || "Chalk uthao, sansaar bachao!");
    } catch {
      setGenSlogan("Border ke is paar dildar, border ke us paar bekar!");
    } finally {
      setIsGenLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFD700] text-[#1A1A1A] flex flex-col font-sans selection:bg-black selection:text-[#FFD700] p-3 sm:p-5 md:p-8 relative">
      
      {/* Outer Brutalist Frame enclosing the whole campaign page */}
      <div className="w-full max-w-7xl mx-auto bg-white border-[8px] sm:border-[12px] border-black shadow-[12px_12px_0px_#000] flex flex-col">
        
        {/* Top Ticker representing bold Indian election posters */}
        <div className="bg-black text-white border-b-4 border-black text-xs font-mono font-black tracking-[0.2em] text-center py-3.5 px-4 overflow-hidden relative">
          <div className="inline-block animate-[pulse_2s_infinite_alternate] whitespace-nowrap">
            LATEST LRP CAMPAIGN DESPATCH: "CHALK IN HAND, BOUNDARY ON LAND!" • NEW POLLS: LRP SURGES TO 98% IN MULTIPLE HOSTELS • STRICT BOUNDARIES! 🏁
          </div>
        </div>

        {/* Clean, High-Contrast Header in line with Artistic Flair */}
        <header className="flex flex-col md:flex-row justify-between items-center px-6 sm:px-8 py-6 border-b-4 border-black bg-white gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-black flex items-center justify-center rounded-none border-2 border-black shadow-[4px_4px_0_#FFD700]">
              <span className="text-3xl relative animate-pulse select-none">🎯</span>
            </div>
            <div className="leading-none">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tighter uppercase font-display">
                LRP SARKAR <span className="text-sm bg-[#FFD700] text-black border border-black px-2 py-0.5 font-mono inline-block font-black ml-1">OFFICIAL PARODY</span>
              </h1>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] font-mono mt-1 text-zinc-500">
                LAKSHMAN REKHA PARTY • DIGITAL BOUNDARY INITIATIVE
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
            <div className="px-4 py-2 bg-[#FFD700] border-2 border-black font-black flex items-center gap-2 shadow-[3px_3px_0_#000]">
              <TrendingUp className="w-4 h-4 text-black" />
              <span>CJP PANIC LEVEL: 97.4%</span>
            </div>
            <div className="px-4 py-2 bg-black text-white border-2 border-black font-black flex items-center gap-2 shadow-[3px_3px_0_#FFD700]">
              <Award className="w-4 h-4 text-[#FFD700] animate-pulse" />
              <span>CHALK LEVEL: HIGH SPEED</span>
            </div>
          </div>
        </header>

        {/* Dynamic Vertical / Horizontal Promo Divider Grid */}
        <div className="grid grid-cols-12 gap-0 border-b-4 border-black bg-black">
          <div className="col-span-12 md:col-span-1 bg-black text-white p-4 flex md:flex-col justify-center items-center gap-2 border-b-4 md:border-b-0 md:border-r-4 border-black">
            <p className="md:vertical-rl md:rotate-180 text-[10px] font-black tracking-[0.4em] uppercase text-[#FFD700] text-center">
              MARYADA • BOUNDARIES • CLEAN DESK
            </p>
          </div>

          {/* Central Hero Parody Banner */}
          <div className="col-span-12 md:col-span-7 bg-[#FFD700] p-6 sm:p-10 md:p-12 flex flex-col justify-between relative min-h-[300px]">
            <div className="absolute top-0 right-0 w-24 h-24 border-l-4 border-b-4 border-black opacity-15" />
            
            <div className="space-y-4">
              <span className="bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-widest inline-block">
                🚩 THE BORDER MANIFESTO RESOLUTION
              </span>
              <h2 className="text-4xl sm:text-6xl md:text-7xl leading-[0.9] font-black tracking-tighter uppercase">
                The Line<br /><span className="text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">is Drawn.</span>
              </h2>
              <p className="text-lg sm:text-xl font-bold italic border-l-4 sm:border-l-8 border-black pl-4 max-w-xl text-[#1A1A1A]">
                "Cockroaches belong in dark, unorganized corners. Clean work desks belong to the sovereign leaders of LRP. Choose your side!"
              </p>
            </div>

            <div className="pt-6 mt-6 border-t-2 border-black grid grid-cols-2 gap-4 font-mono text-xs">
              <div>
                <p className="font-extrabold uppercase text-black">🚀 ACTIVE DIRECTIVE</p>
                <p className="text-zinc-700">Wipe tables daily, draw borders around dishes, and throw slippers at slop.</p>
              </div>
              <div>
                <p className="font-extrabold uppercase text-[#ef4444]">⚔️ ENEMY BEHAVIOR</p>
                <p className="text-zinc-700">Eating dry instant noodles at 3 AM in hostel beds while scrolling social media feeds.</p>
              </div>
            </div>
          </div>

          {/* Slogan Sandbox Widget */}
          <div className="col-span-12 md:col-span-4 bg-white p-6 sm:p-8 flex flex-col justify-between border-t-4 md:border-t-0 border-black">
            <div className="space-y-4">
              <span className="bg-black text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-wider inline-block">
                SYNTH ENGINE V2
              </span>
              <h3 className="font-display font-black uppercase text-xl tracking-tight text-black flex items-center gap-2">
                <Flame className="w-5 h-5 text-[#FFD700] fill-black" /> RALLY CHANT SYNDICATE
              </h3>
              <p className="text-xs text-zinc-600 font-mono leading-relaxed">
                Enter any mundane routine chore to synthesize an election-grade rally slogan for LRP!
              </p>
              
              <div className="space-y-3 font-mono text-xs">
                <input
                  type="text"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  className="w-full brutalist-input px-3.5 py-2.5 text-xs focus:ring-0"
                  placeholder="e.g. Washing towels, reading core Java"
                />
                <button
                  type="button"
                  onClick={handleGenerateSlogan}
                  disabled={isGenLoading || !customTopic.trim()}
                  className="w-full brutalist-button-dark py-2.5 text-xs cursor-pointer"
                >
                  {isGenLoading ? "CONSTRUCTING CHANT..." : "CHURN MEME RALLY CHANT"}
                </button>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t-2 border-dashed border-black">
              {genSlogan ? (
                <div className="p-3 bg-[#FFD700]/10 border-2 border-black shadow-[3px_3px_0_#1A1A1A] relative overflow-hidden animate-fade-in">
                  <div className="absolute right-1 bottom-1 text-2xl opacity-10 select-none">📢</div>
                  <span className="text-[9px] text-zinc-500 font-mono block uppercase font-bold mb-1">Generated Output:</span>
                  <p className="text-black font-display font-black text-sm italic leading-tight">
                    "{genSlogan}"
                  </p>
                </div>
              ) : (
                <p className="text-[10px] text-zinc-500 font-mono italic text-center">
                  *Slogans are certified by the high chanter council.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* SECTION: The Chalk Defense Game Canvas */}
        <div id="game-simulator" className="border-b-4 border-black bg-[#FFD700] p-4 sm:p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-4 flex items-center justify-between">
              <span className="bg-black text-white px-3 py-1 text-xs font-black uppercase tracking-widest">
                WARZONE EXERCISE 01
              </span>
              <span className="text-xs font-mono font-bold text-black uppercase">
                DEFEND THE BORDER ZONE
              </span>
            </div>
            {/* The actual modular game element */}
            <ChalkDefenseGame />
          </div>
        </div>

        {/* SECTION: Voter Card Generator and Quiz Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b-4 border-black bg-zinc-100">
          
          {/* Left panel: Voter ID Generator */}
          <div className="lg:col-span-7 border-b-4 lg:border-b-0 lg:border-r-4 border-black bg-white p-4 sm:p-6 md:p-8" id="voter-card">
            <VoterCardGenerator />
          </div>

          {/* Right panel: CJP Alignment Quiz */}
          <div className="lg:col-span-5 bg-[#FFD700]/25 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b-2 border-black pb-3">
                <h3 className="font-display font-black text-black text-xl tracking-tighter uppercase flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-black" /> ROACH CONTAMINATION TEST
                </h3>
                <span className="text-[10px] bg-black text-white font-mono px-2 py-0.5 font-black uppercase">
                  DIAGNOSTIC
                </span>
              </div>
              <p className="text-xs text-zinc-700 font-mono leading-relaxed">
                Submit raw credentials to calculate your room integrity index. Are you fit to lead or contaminated by CJP crawl culture?
              </p>

              {!quizFinished ? (
                <div className="space-y-4 bg-white p-4 border-2 border-black shadow-[4px_4px_0_#000] mt-2">
                  <div className="flex justify-between items-center text-xs font-mono font-bold">
                    <span className="text-zinc-500 uppercase">STEP {quizStep + 1} OF {QUIZ_QUESTIONS.length}</span>
                    <span className="text-black font-black">REKHA ANALYZER</span>
                  </div>

                  <div className="w-full bg-zinc-200 h-2.5 border border-black overflow-hidden m-0">
                    <div 
                      className="h-full bg-black duration-300 transition-all"
                      style={{ width: `${((quizStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                    />
                  </div>

                  <h4 className="font-display font-black text-black text-sm tracking-tight leading-snug pt-1">
                    {QUIZ_QUESTIONS[quizStep].question}
                  </h4>

                  <div className="space-y-2 font-mono text-xs pt-1">
                    {QUIZ_QUESTIONS[quizStep].options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedOpt(idx)}
                        className={`w-full text-left p-3 border-2 transition font-medium ${
                          selectedOpt === idx
                            ? "bg-black text-white border-black"
                            : "bg-white text-zinc-800 border-black hover:bg-zinc-50"
                        }`}
                      >
                        <div className="flex items-start gap-1.5">
                          <span className="font-black">{String.fromCharCode(65 + idx)}.</span>
                          <span>{opt.text}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      if (selectedOpt !== null) {
                        handleNextQuiz(QUIZ_QUESTIONS[quizStep].options[selectedOpt].points);
                      }
                    }}
                    disabled={selectedOpt === null}
                    className="w-full brutalist-button-dark py-3.5 text-xs leading-none"
                  >
                    Confirm Choice & Advance →
                  </button>
                </div>
              ) : (
                <div className="space-y-5 flex flex-col items-center justify-center text-center p-6 bg-white border-4 border-black shadow-[6px_6px_0px_#000] mt-2 animate-fade-in">
                  <div className="text-5xl animate-bounce select-none">{getQuizVerdict(quizScore).badge}</div>
                  <div>
                    <span className="text-[10px] text-zinc-500 font-mono uppercase block font-black">REKHA REPORT VERDICT</span>
                    <h4 className="font-display font-black text-black text-xl tracking-tight uppercase">
                      {getQuizVerdict(quizScore).title}
                    </h4>
                  </div>
                  <p className="font-mono text-xs text-zinc-700 leading-relaxed px-2">
                    {getQuizVerdict(quizScore).desc}
                  </p>
                  <div className="text-xs font-black text-black bg-[#FFD700] px-4 py-1.5 border-2 border-black font-mono">
                    SCORE INDEX: {quizScore} / {QUIZ_QUESTIONS.length * 10} UNITS
                  </div>
                  <button
                    onClick={resetQuiz}
                    className="brutalist-button-dark px-6 py-2.5 text-xs text-white"
                  >
                    Retest Biometrics
                  </button>
                </div>
              )}
            </div>
            
            <p className="text-[10px] text-zinc-500 font-mono mt-4 border-t border-black/10 pt-2 text-center">
              *Warning: Dishonesty triggers automatic chappal dispatch notifications.
            </p>
          </div>

        </div>

        {/* SECTION: AI Behavior Auditor Portal */}
        <div id="ai-auditor" className="border-b-4 border-black bg-[#FFD700] p-4 sm:p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            <span className="bg-black text-white px-3 py-1 text-xs font-black uppercase tracking-widest mb-4 inline-block">
              REKHA COMPLIANCE EXAMINER
            </span>
            <RekhaAuditor />
          </div>
        </div>

        {/* SECTION: The Sacred Chalk Manifesto */}
        <div id="manifesto" className="bg-white border-b-4 border-black p-6 sm:p-8 md:p-10 space-y-6">
          <div className="border-b-2 border-black pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="font-display font-black text-black text-2xl tracking-tighter uppercase flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-black" /> THE SACRED LAW AMENDMENTS
              </h3>
              <p className="text-xs text-zinc-600 font-mono mt-1">
                Constitution of the Lakshman Rekha Party. Drafting modern lines to solve lazy corners.
              </p>
            </div>
            <span className="text-xs font-mono bg-[#FFD700] text-black border-2 border-black px-3 py-1 font-black">
              CONSTITUTION OF LRP
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {MANIFESTO_ITEMS.map((item) => (
              <div 
                key={item.id} 
                className="bg-zinc-50 border-4 border-black p-5 space-y-3 relative overflow-hidden flex flex-col justify-between transition-all hover:scale-102 hover:shadow-[4px_4px_0_#000]"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center border-b border-black/10 pb-1.5">
                    <span className="text-[9px] bg-black text-white px-2 py-0.5 font-mono font-black uppercase">
                      AMENDMENT {item.id}
                    </span>
                    <span className="text-zinc-500 font-mono text-[9px] font-bold">LRP-ACT</span>
                  </div>
                  <h4 className="font-display font-black text-black text-sm tracking-tight uppercase">
                    {item.unhumorousTitle}
                  </h4>
                  <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                    {item.comedyDetail}
                  </p>
                </div>

                <div className="pt-3 border-t-2 border-dashed border-black font-mono text-[10px] text-rose-600 leading-tight">
                  <span className="text-black font-black uppercase text-[8px] block mb-0.5">LAWFUL PUNISHMENT</span>
                  {item.punishment}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION: Media Assets / Meme Stickers */}
        <div id="materials" className="bg-[#FFD700]/10 p-6 sm:p-8 md:p-10 space-y-6">
          <div className="border-b-2 border-black pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="font-display font-black text-black text-2xl tracking-tighter uppercase flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-black" /> DIGITAL PROPAGANDA STICKERS
              </h3>
              <p className="text-xs text-zinc-600 font-mono mt-1">
                Flat visual stickers crafted by our visual chanter division. High contrast and print-friendly!
              </p>
            </div>
            <span className="text-xs font-mono bg-black text-white border-2 border-black px-3 py-1 font-bold">
              STICKER REPOSITORY
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            {MEME_POSTERS.map((post) => (
              <div 
                key={post.id} 
                className="bg-white border-4 border-black p-5 flex flex-col justify-between relative overflow-hidden transition-all hover:scale-105 shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] group cursor-pointer"
              >
                {/* Visual mock image card */}
                <div className="aspect-[4/3] bg-zinc-900 rounded-none border-2 border-black flex flex-col items-center justify-center text-center p-4 relative overflow-hidden group-hover:bg-black transition-colors">
                  
                  {/* Saffron S circle style decoration */}
                  <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#FFD700] border-l-2 border-b-2 border-black" />

                  {/* Icon depending on type */}
                  <span className="text-4xl z-10 mb-2 truncate">
                    {post.type === "warning" ? "🚨" : post.type === "rally" ? "📣" : post.type === "motivational" ? "💪" : "🩴"}
                  </span>

                  <h5 className="font-banner text-3xl text-white tracking-widest z-10 block truncate max-w-full">
                    {post.hindiSlogan}
                  </h5>
                  <p className="text-[10px] text-zinc-300 italic font-mono leading-tight max-w-full truncate">
                    "{post.slogan}"
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between font-mono text-[10px] border-t border-black/10 pt-3">
                  <div>
                    <span className="text-zinc-500 text-[8px] block uppercase font-bold">STICKER VIBE</span>
                    <span className="text-black font-extrabold">{post.vibe}</span>
                  </div>
                  <span className="text-black font-black uppercase text-[10px] underline underline-offset-2">PRINT →</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-white border-2 border-black shadow-[4px_4px_0_#000] font-mono text-xs text-black text-center uppercase tracking-widest leading-loose font-black mt-4">
            ⚡ MATERIALS CAPACITY: 100% EXCEL CHALK CONCENTRATE • SECURE YOUR SPACE WITH DISCIPLINE ⚡
          </div>
        </div>

      </div>

      {/* Brutalist Footer matches Design HTML marquee feel */}
      <footer className="mt-12 max-w-7xl mx-auto w-full border-[8px] border-black bg-black text-white py-8 px-6 text-center font-mono text-[10px] tracking-wide relative shadow-[8px_8px_0_rgba(0,0,0,1)]">
        <div className="whitespace-nowrap flex justify-center gap-6 sm:gap-12 text-xs font-black uppercase tracking-[0.2em] mb-6 overflow-hidden border-b border-zinc-800 pb-4">
          <span>STAY IN YOUR LANE</span>
          <span>•</span>
          <span>DRAW THE LINE</span>
          <span>•</span>
          <span>NO COCKROACH ALLOWED</span>
          <span>•</span>
          <span>LRP PARODY 2026</span>
          <span>•</span>
          <span>STAY IN YOUR LANE</span>
        </div>
        
        <p className="mb-2 leading-relaxed max-w-2xl mx-auto text-zinc-400">
          DISCLAIMER & LEGAL VERDICT: This portal is an interactive satirical parody web application designed around community humor and Indian Gen Z memes. It is NOT a real political organization, party, or system. All features, voter credentials, and game mechanics are for entertainment and amusement purposes.
        </p>
        <p className="uppercase mt-4 text-[#FFD700] font-black tracking-[0.1em]">
          © {new Date().getFullYear()} LAKSHMAN REKHA PARTY (LRP) • STICKER & CHALK REGISTRY SERVICES LIMIT
        </p>
      </footer>

    </div>
  );
}
