import React, { useState } from "react";
import { AuditResult } from "../types";
import { Sparkles, Skull, HelpCircle, Activity, Flame, ShieldAlert, BadgeInfo } from "lucide-react";

export default function RekhaAuditor() {
  const [name, setName] = useState("");
  const [behavior, setBehavior] = useState("I woke up at 1 PM, ate dry raw Maggi in bed while watching reels, and left my wet towels on the floor in a moldy heap.");
  const [scale, setScale] = useState(8);
  const [loading, setLoading] = useState(false);
  const [statusStep, setStatusStep] = useState("");
  const [result, setResult] = useState<AuditResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const auditSequence = [
    "Contacting General Secretariat of Border Control...",
    "Measuring ambient humidity of dark PG corners...",
    "Tracing historical sleeping intervals (Target: 4 AM - 2 PM)...",
    "Pretesting atmospheric Baygon quotient...",
    "Grinding chalk into high-density defensive barriers...",
    "Formulating Hinglish roasting sanctions..."
  ];

  const handleAudit = async () => {
    setLoading(true);
    setResult(null);
    setErrorMsg("");
    
    // Cycle loading phrases for comedic impact
    let step = 0;
    setStatusStep(auditSequence[0]);
    const interval = setInterval(() => {
      step++;
      if (step < auditSequence.length) {
        setStatusStep(auditSequence[step]);
      }
    }, 900);

    try {
      const response = await fetch("/api/audit-cjp-behavior", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || "Anonymous Citizen",
          behavior,
          cjpAffiliationScale: scale
        })
      });

      const data = await response.json();
      clearInterval(interval);
      
      if (data.success) {
        setResult(data);
      } else {
        setErrorMsg("Failed to communicate with the central border council. Try again.");
      }
    } catch (e) {
      clearInterval(interval);
      setErrorMsg("Network failure inside border coordinates. Ensure server is active!");
    } finally {
      setLoading(false);
    }
  };

  const statusColors: { [key: string]: string } = {
    COCKROACH_INFESTED_BRAIN: "bg-red-500 text-white font-black border-2 border-black",
    REKHA_RANGER_CANDIDATE: "bg-emerald-500 text-white font-black border-2 border-black",
    BAYGON_TARGET_LEVEL_9: "bg-orange-500 text-white font-black border-2 border-black",
    CHALK_REKHA_ACTIVE: "bg-cyan-400 text-black font-black border-2 border-black",
    REKHA_ALERT_ACTIVE: "bg-[#FFD700] text-black font-black border-2 border-black"
  };

  return (
    <div className="bg-white border-4 border-black shadow-[6px_6px_0px_#000] p-6 md:p-8 space-y-8 font-mono text-xs text-black">
      
      <div className="border-b-4 border-black pb-5 bg-black text-white p-4 border-2 border-black shadow-[4px_4px_0_#FFD700]">
        <h3 className="font-display font-black text-white text-lg tracking-wide flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-cyan-400 animate-pulse" /> REKHA ALIGNMENT AUDITOR
        </h3>
        <p className="text-zinc-400 mt-1">
          Have you crossed the line of self-improvement? Submit your habits or daily behavior logs to get checked by our borders high-command.
        </p>
      </div>

      <div className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-black uppercase font-black text-[11px] block">CITIZEN NAME (OR CODE):</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border-3 border-black text-black px-4 py-2.5 focus:outline-none font-sans font-bold shadow-[2px_2px_0px_#000]"
              placeholder="e.g. Berozgaar Rohan, Corner Shreya"
            />
          </div>

          <div className="space-y-2">
            <label className="text-black uppercase font-black text-[11px] flex justify-between">
              <span>ESTIMATED CJP LAZINESS VALUE:</span>
              <span className="text-cyan-500 font-extrabold font-mono">{scale}/10</span>
            </label>
            <div className="pt-2">
              <input
                type="range"
                min="1"
                max="10"
                value={scale}
                onChange={(e) => setScale(parseInt(e.target.value))}
                className="w-full h-2 bg-zinc-200 border-2 border-black appearance-none cursor-pointer accent-black"
              />
              <div className="flex justify-between text-[9px] text-zinc-650 mt-1 font-bold">
                <span>1 (Neat & Clean)</span>
                <span>5 (Hostel Normie)</span>
                <span>10 (Absolute Roach)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-black uppercase font-black text-[11px] block">DESCRIBE HABIT OR RECENT CONVERSATIONS:</label>
          <textarea
            value={behavior}
            onChange={(e) => setBehavior(e.target.value)}
            rows={3}
            className="w-full bg-white border-3 border-black text-black p-4 focus:outline-none font-sans text-sm shadow-[2px_2px_0px_#000] font-bold"
            placeholder="Introduce laziness details... e.g. Left breakfast dish in corner to wash later, had Maggi, slept on sofa."
          />
        </div>

        <button
          onClick={handleAudit}
          disabled={loading || !behavior.trim()}
          className="w-full py-4 bg-cyan-400 hover:bg-cyan-300 text-black font-display font-black tracking-widest border-3 border-black shadow-[4px_4px_0_#000] active:translate-x-0.5 active:translate-y-0.5 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-xs uppercase"
        >
          {loading ? "COMMENCING COURT-MARTIAL PROCEDURES..." : "SUBMIT HABIT FOR REKHA VERDICT"}
        </button>

        {loading && (
          <div className="bg-[#FFD700]/10 border-3 border-black p-5 flex flex-col items-center justify-center space-y-3 animate-pulse shadow-[3px_3px_0_#000]">
            <div className="flex gap-1.5 items-center justify-center">
              <div className="w-2.5 h-2.5 bg-black rounded-full animate-bounce delay-75" />
              <div className="w-2.5 h-2.5 bg-black rounded-full animate-bounce delay-150" />
              <div className="w-2.5 h-2.5 bg-black rounded-full animate-bounce delay-300" />
            </div>
            <p className="text-black font-mono text-[10px] uppercase text-center tracking-widest font-black">{statusStep}</p>
          </div>
        )}

        {errorMsg && (
          <div className="bg-rose-100 border-3 border-black text-rose-700 p-4 font-black text-center shadow-[3px_3px_0_#000]">
            {errorMsg}
          </div>
        )}

        {result && (
          <div className="border-4 border-black bg-white p-6 space-y-5 animate-fade-in relative overflow-hidden shadow-[6px_6px_0_#000]">
            
            {/* Pop border stripes */}
            <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#FFD700]" />
            
            <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-black pb-4">
              <div>
                <span className="text-[10px] text-zinc-500 block uppercase font-bold">AUDIT RESULT CASEFILE:</span>
                <span className="font-sans text-lg text-black font-black tracking-tight">CENTRAL INVESTIGATION VERDICT</span>
              </div>
              <div className={`px-3 py-1 rounded-none text-[10px] font-black uppercase shadow-[2px_2px_0_#000] ${statusColors[result.status] || "bg-white border-2 border-black text-black"}`}>
                STATUS: {result.status}
              </div>
            </div>

            {/* AI result roasting content */}
            <div className="space-y-4">
              <div>
                <span className="text-[9px] text-zinc-500 uppercase block font-black">JUDICIAL REKHA ROAST:</span>
                <p className="font-sans text-black text-sm leading-relaxed whitespace-pre-wrap bg-[#FFD700]/10 p-4 border-2 border-black font-bold shadow-[2px_2px_0_#000]">
                  {result.roast}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-cyan-100 border-2 border-black p-4 space-y-1 shadow-[2px_2px_0_#000]">
                  <span className="text-black text-[9px] font-black block uppercase flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5" /> CHAKRA SLOGAN GENERATED:
                  </span>
                  <p className="text-black font-extrabold font-sans italic text-sm">
                    "{result.slogan}"
                  </p>
                </div>

                <div className="bg-[#FFD700]/20 border-2 border-black p-4 space-y-1 shadow-[2px_2px_0_#000]">
                  <span className="text-black text-[9px] font-black block uppercase flex items-center gap-1">
                    <Skull className="w-3.5 h-3.5 animate-pulse" /> MANDATORY DIRECTIVE:
                  </span>
                  <p className="text-black font-sans font-extrabold text-xs">
                    {result.actionRequired}
                  </p>
                </div>
              </div>
            </div>

            {result.isFallback && (
              <div className="bg-zinc-100 p-2.5 border border-black text-[10px] text-zinc-650 flex items-center gap-1.5 font-sans font-bold">
                <BadgeInfo className="w-4 h-4 text-zinc-550 flex-shrink-0" />
                <span>Running in local ledger simulation mode. Submit actual API key in Secrets panel for customized AI roasts.</span>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
}
