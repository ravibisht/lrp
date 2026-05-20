import React, { useState } from "react";
import { Flame } from "lucide-react";

export default function RallyChantsWidget() {
  const [customTopic, setCustomTopic] = useState("");
  const [genSlogan, setGenSlogan] = useState("");
  const [isGenLoading, setIsGenLoading] = useState(false);

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
    <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-zinc-900 shadow-[6px_6px_0_#18181b] space-y-6 relative overflow-hidden h-full flex flex-col justify-center">
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#FFD700] rounded-full opacity-20 pointer-events-none" />
      
      <div className="space-y-3 relative z-10 w-full max-w-sm mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center border-2 border-zinc-900 text-[#FFD700] shadow-[2px_2px_0_#FFD700]">
            <Flame className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-black tracking-tight text-zinc-900 uppercase">
            Rally Chants
          </h3>
        </div>
        <p className="text-sm text-zinc-600 font-medium pb-2">
          Pass a mundane chore to our AI reasoning model and receive an official manifesto chant.
        </p>
        
        <div className="space-y-3">
          <input
            type="text"
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            className="w-full bg-[#F4F4F0] border-2 border-zinc-900 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition-shadow placeholder:text-zinc-400"
            placeholder="e.g. Washing towels..."
          />
          <button
            type="button"
            onClick={handleGenerateSlogan}
            disabled={isGenLoading || !customTopic.trim()}
            className="w-full bg-zinc-900 text-white border-2 border-zinc-900 rounded-xl py-3 text-sm font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors disabled:opacity-50 shadow-[3px_3px_0_#FFD700] active:translate-y-1 active:shadow-none"
          >
            {isGenLoading ? "Analyzing Strategy..." : "Generate AI Slogan"}
          </button>
        </div>
      </div>

      {genSlogan && (
        <div className="pt-4 border-t-2 border-dashed border-zinc-300 animate-fade-in w-full max-w-sm mx-auto z-10">
          <span className="text-[10px] bg-[#FFD700] px-2 py-0.5 rounded text-zinc-900 uppercase tracking-widest block mb-2 font-bold w-fit border border-zinc-900">Official Output</span>
          <p className="text-zinc-900 font-black italic text-lg leading-tight">
            "{genSlogan}"
          </p>
        </div>
      )}
    </div>
  );
}
