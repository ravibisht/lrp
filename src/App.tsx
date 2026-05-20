import React, { useState } from "react";
import { MANIFESTO_ITEMS, MEME_POSTERS, QUIZ_QUESTIONS, CUSTOM_AVATARS } from "./data";
import ChalkDefenseGame from "./components/ChalkDefenseGame";
import { VoterCardForm, VoterCardPreview, generateNewCardId } from "./components/VoterCardGenerator";
import RallyChantsWidget from "./components/RallyChantsWidget";
import RekhaAuditor from "./components/RekhaAuditor";
import ChappalSmashGame from "./components/ChappalSmashGame";
import RekhaOathScanner from "./components/RekhaOathScanner";
import AnthemPlayer from "./components/AnthemPlayer";
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

  // Voter Card States
  const [name, setName] = useState("Rahul Shrivastava");
  const [designation, setDesignation] = useState(CUSTOM_AVATARS[0].name);
  const [avatarId, setAvatarId] = useState(CUSTOM_AVATARS[0].id);
  const [cardId, setCardId] = useState(() => generateNewCardId());
  const [stampActive, setStampActive] = useState(true);

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

  return (
    <div className="min-h-screen bg-[#F4F4F0] text-zinc-900 flex flex-col font-sans selection:bg-[#FFD700] selection:text-black p-0 relative overflow-x-hidden">
      
      {/* Sleek yet Satirical Outer Frame */}
      <AnthemPlayer />
      <div className="w-full flex flex-col items-center">
        
        {/* Themed Ticker */}
        <div className="w-full bg-[#FFD700] border-b-2 border-zinc-900 text-zinc-900 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-center py-2.5 px-4 flex justify-center items-center gap-3 overflow-hidden whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse hidden sm:block"></span>
          <span>🚨 LATEST DESPATCH: "CHALK IN HAND, BOUNDARY ON LAND!" • NEW POLLS: LRP SURGES TO 98% • DEFEAT CJP SECRECY! 🚨</span>
        </div>

        {/* Modern Satire Header */}
        <header className="flex flex-col md:flex-row w-full max-w-7xl justify-between items-center px-6 md:px-12 py-8 bg-transparent space-y-6 md:space-y-0 relative">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-zinc-900 text-[#FFD700] border-2 border-zinc-900 flex items-center justify-center rounded-xl shadow-[4px_4px_0_#18181b] rotate-[-2deg] transition-transform hover:rotate-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter text-zinc-900 uppercase flex items-center gap-2">
                Lakshman Rekha Party
                <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-md uppercase tracking-widest font-bold shadow-[2px_2px_0_#18181b]">Parody</span>
              </h1>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-0.5">The anti-roach initiative</p>
            </div>
          </div>

          <div className="flex items-center gap-4 font-mono text-xs font-bold">
            <div className="flex items-center gap-2 bg-white border-2 border-zinc-900 px-3 py-1.5 rounded-lg shadow-[2px_2px_0_#18181b]">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-bounce"></span>
              <span>CJP Panic: 97.4%</span>
            </div>
          </div>
        </header>

        {/* Punchy Hero Section */}
        <div className="w-full max-w-7xl px-6 md:px-12 py-12 md:py-20 flex flex-col md:flex-row gap-12 md:gap-24 items-center">
          
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-zinc-900 shadow-[2px_2px_0_#18181b] rounded-lg text-zinc-900 text-xs font-bold tracking-wider uppercase mb-2">
              <span>📜 The Border Manifesto</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-sans font-black tracking-tighter leading-tight text-zinc-900 uppercase">
              Discipline <br/>
              <span className="text-[#FFD700] translate-x-2 inline-block font-sans italic drop-shadow-[2px_2px_0_rgba(24,24,27,1)] [-webkit-text-stroke:2px_#18181b]">is the baseline.</span>
            </h2>
            
            <p className="text-lg md:text-xl text-zinc-700 font-medium leading-relaxed max-w-xl border-l-4 border-[#FFD700] pl-4">
              Cockroaches belong in dark corners. Clean workspaces belong to sovereign leaders. Draw your lines, respect your boundaries, and defeat the lazy CJP mindset.
            </p>

            <div className="pt-6 flex flex-col sm:flex-row gap-6 text-sm">
              <div className="flex-1 bg-white border-2 border-zinc-900 p-4 rounded-xl shadow-[4px_4px_0_#18181b]">
                <span className="text-emerald-600 text-[10px] font-black uppercase tracking-widest block mb-1">✅ Active Directive</span>
                <p className="text-zinc-800 font-medium leading-snug">Wipe tables daily, draw chalk borders around dishes, maintain desk integrity.</p>
              </div>
              <div className="flex-1 bg-zinc-900 border-2 border-zinc-900 p-4 rounded-xl shadow-[4px_4px_0_#FFD700]">
                <span className="text-rose-400 text-[10px] font-black uppercase tracking-widest block mb-1">🚫 Adversary Behavior</span>
                <p className="text-zinc-100 font-medium leading-snug">Consuming dry noodles at 3 AM in bed while doom-scrolling social feeds.</p>
              </div>
            </div>
          </div>

          {/* Hero Widget Area */}
          <div className="flex-1 w-full max-w-sm ml-auto space-y-4">
            <VoterCardPreview
              name={name}
              designation={designation}
              avatarId={avatarId}
              cardId={cardId}
              stampActive={stampActive}
              setStampActive={setStampActive}
            />
            {/* Quick Edit for Hero */}
            <div className="bg-white p-3 rounded-xl border-2 border-zinc-900 shadow-[4px_4px_0_#18181b] flex flex-col gap-3 relative z-10 w-full max-w-sm mx-auto">
              <div>
                <label className="text-zinc-600 font-black text-[10px] uppercase tracking-widest px-1 mb-1 block">QUICK EDIT NAME</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={26}
                  className="w-full bg-[#f4f4f0] border-2 border-black text-black px-3 py-2 text-sm focus:outline-none focus:ring-0 font-sans font-bold shadow-inner"
                  placeholder="Enter full name..."
                />
              </div>
              <div>
                <label className="text-zinc-600 font-black text-[10px] uppercase tracking-widest px-1 mb-1 block">FORCE ICON</label>
                <div className="grid grid-cols-3 gap-2">
                  {CUSTOM_AVATARS.slice(0, 3).map((av) => (
                    <button
                      key={av.id}
                      onClick={() => {
                        setAvatarId(av.id);
                        setDesignation(av.name);
                      }}
                      className={`py-1.5 rounded-none border-2 text-center transition flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                        avatarId === av.id
                          ? "bg-black text-[#FFD700] border-black shadow-[2px_2px_0_#FFD700]"
                          : "bg-white text-zinc-700 border-black hover:bg-zinc-100 shadow-[1px_1px_0_#000]"
                      }`}
                    >
                      <span className="text-lg">{av.icon}</span>
                      <span className="text-[8px] font-sans font-black truncate w-full px-1">{av.name.split(" ")[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Modules Container */}
        <div className="w-full bg-white border-t-2 border-zinc-900">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-24">
            
            {/* Section: Games */}
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black tracking-tight text-zinc-900 uppercase flex items-center gap-3">
                    Interactive Diagnostics <span className="text-2xl">🕹️</span>
                  </h3>
                  <p className="text-zinc-600 font-medium">Test your readiness and combat training in isolated simulation zones.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Embedded game components */}
                <div className="rounded-2xl overflow-hidden border-2 border-zinc-900 shadow-[6px_6px_0_#18181b] h-[550px] relative bg-[#FFD700]">
                  <div className="absolute top-0 left-0 w-full h-full transform scale-[0.98] origin-top md:scale-[0.85] md:origin-top-left md:-ml-4 overflow-y-auto overflow-x-hidden pt-4 no-scrollbar">
                    <ChalkDefenseGame />
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden border-2 border-zinc-900 shadow-[6px_6px_0_#18181b] h-[550px] bg-zinc-50 relative">
                   <div className="absolute inset-0 p-4 overflow-y-auto no-scrollbar pb-6">
                      <ChappalSmashGame />
                   </div>
                </div>
              </div>
            </div>

            {/* Section: Voter ID & Audit */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 rounded-2xl border-2 border-zinc-900 shadow-[6px_6px_0_#18181b] overflow-hidden relative bg-white h-[580px]">
                <div className="absolute top-4 left-4 z-10 bg-[#FFD700] border-2 border-zinc-900 shadow-[2px_2px_0_#18181b] rounded-lg px-3 py-1 text-xs font-black uppercase tracking-widest text-zinc-900">ID Registry</div>
                <div className="absolute inset-x-0 bottom-0 top-12 overflow-y-auto no-scrollbar pb-6 px-4">
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
                    <VoterCardForm
                      name={name} setName={setName}
                      designation={designation} setDesignation={setDesignation}
                      avatarId={avatarId} setAvatarId={setAvatarId}
                      setCardId={setCardId}
                    />
                    
                    {/* Oath Scanner Container */}
                    <div className="w-full aspect-square md:aspect-auto md:h-full min-h-[400px] rounded-2xl border-2 border-zinc-900 shadow-[4px_4px_0_#18181b] bg-zinc-900 relative">
                       <div className="absolute inset-0 p-4 md:p-6 pb-6">
                         <RekhaOathScanner />
                       </div>
                    </div>

                    <RallyChantsWidget />
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-5 bg-white rounded-2xl border-2 border-zinc-900 shadow-[6px_6px_0_#18181b] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden h-[580px]">
                {/* Decorative background stripe */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-100 rounded-bl-full opacity-50 pointer-events-none" />
                
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-rose-500 text-white flex items-center justify-center border-2 border-zinc-900 shadow-[2px_2px_0_#18181b]">
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-black tracking-tight text-zinc-900 uppercase leading-snug">Roach Integrity<br/>Test</h3>
                  </div>
                  <p className="text-sm text-zinc-600 font-medium leading-relaxed">
                    Submit raw credentials to calculate your room integrity index. Are you fit to lead or contaminated?
                  </p>

                  {!quizFinished ? (
                    <div className="space-y-6 pt-2">
                      <div className="space-y-3">
                        <div className="flex justify-between text-xs text-zinc-500 font-bold uppercase">
                          <span>Question {quizStep + 1} of {QUIZ_QUESTIONS.length}</span>
                        </div>
                        <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden border border-zinc-300">
                          <div 
                            className="h-full bg-zinc-900 duration-500 transition-all"
                            style={{ width: `${((quizStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                          />
                        </div>
                      </div>

                      <h4 className="text-zinc-900 font-black text-lg leading-tight">
                        {QUIZ_QUESTIONS[quizStep].question}
                      </h4>

                      <div className="space-y-3 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                        {QUIZ_QUESTIONS[quizStep].options.map((opt, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedOpt(idx)}
                            className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm transition-all font-bold ${
                              selectedOpt === idx
                                ? "bg-[#FFD700] text-zinc-900 border-zinc-900 shadow-[2px_2px_0_#18181b] translate-y-px"
                                : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400 hover:text-zinc-900"
                            }`}
                          >
                            <span className="opacity-70 mr-2">{String.fromCharCode(65 + idx)}.</span>
                            <span>{opt.text}</span>
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
                        className="w-full bg-zinc-900 text-white rounded-xl py-3.5 text-sm font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors disabled:opacity-50 border-2 border-zinc-900 shadow-[3px_3px_0_rgba(0,0,0,0.2)] active:translate-y-1 active:shadow-none"
                      >
                        Confirm Answer
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-6 bg-[#F4F4F0] rounded-xl border-2 border-zinc-900 shadow-inner mt-4 animate-fade-in space-y-4">
                      <div className="text-5xl animate-bounce mb-2 drop-shadow-md">{getQuizVerdict(quizScore).badge}</div>
                      <div>
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block mb-1">Official Verdict</span>
                        <h4 className="font-black text-zinc-900 text-xl uppercase">
                          {getQuizVerdict(quizScore).title}
                        </h4>
                      </div>
                      <p className="text-sm text-zinc-700 font-medium leading-relaxed">
                        {getQuizVerdict(quizScore).desc}
                      </p>
                      <button
                        onClick={resetQuiz}
                        className="bg-white border-2 border-zinc-900 text-zinc-900 rounded-lg px-4 py-2 text-xs font-black uppercase hover:bg-zinc-100 transition-colors mt-2 shadow-[2px_2px_0_#18181b]"
                      >
                         Recalibrate
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* AI Auditor Section embedded minimally */}
            <div className="bg-[#FFD700] rounded-3xl border-2 border-zinc-900 shadow-[6px_6px_0_#18181b] p-6 md:p-12 flex flex-col xl:flex-row gap-8 lg:gap-12 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-20 rounded-full blur-3xl" />
               <div className="xl:w-1/3 space-y-5 relative z-10">
                 <div className="inline-flex py-1 px-3 bg-zinc-900 text-white rounded-md text-[10px] font-black uppercase tracking-widest border border-zinc-700">Gemini AI Module</div>
                 <h3 className="text-3xl font-black tracking-tight text-zinc-900 uppercase">Rekha Auditor</h3>
                 <p className="text-zinc-800 font-medium leading-relaxed">Advanced AI behavior analysis tool. Logs your daily routines to check against the sacred timeline and ensures compliance. Will mercilessly mock any CJP tendencies.</p>
                 
                 <div className="hidden xl:flex mt-8 rounded-2xl overflow-hidden border-2 border-zinc-900 shadow-[4px_4px_0_#18181b] bg-white h-[260px]">
                    <div className="w-full h-full flex flex-col p-6 space-y-4">
                      <div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-red-500"/><div className="w-3 h-3 rounded-full bg-yellow-500"/><div className="w-3 h-3 rounded-full bg-green-500"/></div>
                      <div className="w-full h-4 bg-zinc-100 rounded animate-pulse" />
                      <div className="w-3/4 h-4 bg-zinc-100 rounded animate-pulse" />
                      <div className="mt-auto pt-4 border-t-2 border-dashed border-zinc-300">
                         <span className="text-xs font-bold text-zinc-400 uppercase">System Active...</span>
                      </div>
                    </div>
                 </div>
               </div>
               
               <div className="xl:w-2/3 bg-white rounded-2xl border-2 border-zinc-900 shadow-[6px_6px_0_#18181b] relative overflow-y-auto max-h-[700px] no-scrollbar">
                 <div className="p-4 md:p-6 min-h-full">
                   <div className="transform origin-top scale-[0.9] md:scale-100 md:-mx-4">
                     <RekhaAuditor />
                   </div>
                 </div>
               </div>
            </div>
            
          </div>
        </div>

        {/* Container for Manifesto & Literature */}
        <div className="w-full bg-[#FFD700] border-t-2 border-b-2 border-zinc-900">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-16">
            
            <div className="space-y-3 max-w-xl">
              <h3 className="text-3xl font-black tracking-tight text-zinc-900 uppercase">The Sacred Law Amendments</h3>
              <p className="text-zinc-800 font-bold">Drafting strict lines to solve lazy corners. Essential reading for all initiates.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MANIFESTO_ITEMS.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-2xl p-6 md:p-8 border-2 border-zinc-900 space-y-6 shadow-[4px_4px_0_#18181b] hover:shadow-[8px_8px_0_#18181b] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="inline-flex py-1 px-2.5 rounded-lg bg-[#FFD700] text-zinc-900 text-[10px] font-black tracking-widest uppercase border-2 border-zinc-900">
                      Amendment {item.id}
                    </div>
                    <h4 className="text-zinc-900 font-black tracking-tight h-12 flex items-center leading-tight">
                      {item.unhumorousTitle}
                    </h4>
                    <p className="text-sm text-zinc-700 font-medium leading-relaxed">
                      {item.comedyDetail}
                    </p>
                  </div>

                  <div className="pt-6 border-t-2 border-dashed border-zinc-200 space-y-1.5">
                    <span className="text-[10px] text-rose-500 font-black uppercase tracking-widest block">Penalty Clause</span>
                    <p className="text-zinc-900 text-xs font-bold leading-tight">{item.punishment}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Typography / Assets */}
            <div className="pt-8 max-w-xl">
               <h3 className="text-3xl font-black tracking-tight text-zinc-900 uppercase">Digital Archive</h3>
               <p className="text-zinc-800 font-bold mt-2">Historical records, visual assets, and high-contrast propaganda suitable for print.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {MEME_POSTERS.map((post) => (
                <div 
                  key={post.id} 
                  className="bg-white rounded-2xl border-2 border-zinc-900 p-4 lg:p-6 flex flex-col gap-6 shadow-[4px_4px_0_#18181b] hover:shadow-[6px_6px_0_#18181b] hover:-translate-y-1 transition-all group cursor-pointer"
                >
                  <div className="aspect-[4/3] bg-zinc-900 rounded-xl flex flex-col items-center justify-center text-center p-4 relative overflow-hidden group-hover:bg-zinc-800 transition-colors border-2 border-zinc-900 shadow-inner">
                    <span className="text-4xl mb-3 opacity-90 group-hover:scale-110 transition-transform">
                      {post.type === "warning" ? "🚨" : post.type === "rally" ? "📣" : post.type === "motivational" ? "💪" : "🩴"}
                    </span>
                    <h5 className="font-sans font-black text-xl text-[#FFD700] leading-tight uppercase tracking-tighter">
                      {post.hindiSlogan}
                    </h5>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-xs text-zinc-600 font-bold line-clamp-2">"{post.slogan}"</span>
                     <span className="text-zinc-900 text-[10px] font-black uppercase bg-[#FFD700] px-2 py-1 rounded md border-2 border-zinc-900 shadow-[2px_2px_0_#18181b] opacity-0 group-hover:opacity-100 transition-opacity ml-2">Print</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Modern Satire Footer */}
      <footer className="w-full bg-zinc-900 py-16 px-6 relative flex flex-col items-center overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700] opacity-10 rounded-bl-full pointer-events-none" />
        
        <div className="flex gap-4 sm:gap-8 text-[10px] sm:text-xs font-black text-[#FFD700] uppercase tracking-widest mb-10 flex-wrap justify-center relative z-10">
          <span>Discipline</span>
          <span>•</span>
          <span>Boundaries</span>
          <span>•</span>
          <span>Integrity</span>
        </div>
        
        <p className="text-xs text-zinc-400 max-w-xl text-center leading-loose font-bold relative z-10">
          DISCLAIMER & LEGAL VERDICT: This portal is an interactive satirical parody web application designed around community humor and Gen Z memes. It is NOT a real political organization, party, or system. 
        </p>
        
        <p className="mt-10 text-[10px] text-zinc-500 font-black tracking-widest uppercase relative z-10">
          © {new Date().getFullYear()} LAKSHMAN REKHA PARTY. Chalk reserved.
        </p>
      </footer>
    </div>
  );
}
