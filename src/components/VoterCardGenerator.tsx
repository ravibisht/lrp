import React, { useState } from "react";
import { CUSTOM_AVATARS } from "../data";
import { Award, User, Calendar, ShieldCheck, Download, CheckCircle, RefreshCcw, Landmark } from "lucide-react";

export default function VoterCardGenerator() {
  const [name, setName] = useState("Rahul Shrivastava");
  const [designation, setDesignation] = useState(CUSTOM_AVATARS[0].name);
  const [avatarId, setAvatarId] = useState(CUSTOM_AVATARS[0].id);
  const [cardId, setCardId] = useState(() => generateNewCardId());
  const [stampActive, setStampActive] = useState(true);

  function generateNewCardId() {
    return `LRP-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`;
  }

  const selectedAvatar = CUSTOM_AVATARS.find((av) => av.id === avatarId) || CUSTOM_AVATARS[0];

  const handleRandomize = () => {
    setCardId(generateNewCardId());
    const randAv = CUSTOM_AVATARS[Math.floor(Math.random() * CUSTOM_AVATARS.length)];
    setAvatarId(randAv.id);
    setDesignation(randAv.name);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white border-4 border-black shadow-[6px_6px_0px_#000] p-6 md:p-8 space-y-8 text-black">
      
      <div className="border-b-4 border-black pb-5 flex justify-between items-center bg-[#FFD700] p-4 border-2 border-black">
        <div>
          <h3 className="font-display font-black text-black text-xl tracking-tight uppercase flex items-center gap-2">
            <Landmark className="w-5 h-5 text-black" /> REKHA YOUTH REGISTRY
          </h3>
          <p className="text-xs text-zinc-800 font-mono mt-1 font-bold">
            Apply for your National Anti-Cockroach Defense Voter ID. Completely non-aligned with couch laziness.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Inputs */}
        <div className="lg:col-span-5 space-y-5 font-mono text-xs">
          <div className="space-y-2">
            <label className="text-black block uppercase tracking-wider font-extrabold text-[11px]">1. VOLUNTEER FULL NAME</label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 w-4 h-4 text-black font-black" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={26}
                className="w-full bg-white border-3 border-black text-black pl-10 pr-4 py-2.5 focus:outline-none focus:ring-0 font-sans font-bold shadow-[2px_2px_0px_#000]"
                placeholder="Enter full name..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-black block uppercase tracking-wider font-extrabold text-[11px]">2. TACTICAL SPECIALIZATION</label>
            <select
              value={designation}
              onChange={(e) => {
                setDesignation(e.target.value);
                const matched = CUSTOM_AVATARS.find((av) => av.name === e.target.value);
                if (matched) setAvatarId(matched.id);
              }}
              className="w-full bg-white border-3 border-black text-black px-4 py-2.5 focus:outline-none focus:ring-0 font-sans font-bold shadow-[2px_2px_0px_#000]"
            >
              {CUSTOM_AVATARS.map((av) => (
                <option key={av.id} value={av.name}>
                  {av.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-black block uppercase tracking-wider font-extrabold text-[11px]">3. CHOOSE FORCE ICON</label>
            <div className="grid grid-cols-3 gap-2">
              {CUSTOM_AVATARS.map((av) => (
                <button
                  key={av.id}
                  onClick={() => {
                    setAvatarId(av.id);
                    setDesignation(av.name);
                  }}
                  className={`p-2.5 rounded-none border-2 text-center transition flex flex-col items-center justify-center gap-1 cursor-pointer ${
                    avatarId === av.id
                      ? "bg-black text-[#FFD700] border-black shadow-[3px_3px_0_#FFD700]"
                      : "bg-white text-zinc-700 border-black hover:bg-zinc-100"
                  }`}
                >
                  <span className="text-xl">{av.icon}</span>
                  <span className="text-[9px] font-sans font-black truncate w-full">{av.name.split(" ")[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              onClick={handleRandomize}
              className="flex-1 brutalist-button-yellow py-3 text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCcw className="w-3.5 h-3.5" /> RANDOMIZE PROFILE
            </button>
          </div>
        </div>

        {/* Voter ID Preview Container */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          
          {/* Fictional ID badge layout with Brutalist style */}
          <div 
            id="lrp-identity-badge"
            className="w-full max-w-sm bg-white border-4 border-black p-5 shadow-[8px_8px_0px_rgba(0,0,0,1)] relative overflow-hidden text-black rounded-none"
          >
            {/* Top Tri-Color Accent representing national election feel */}
            <div className="absolute top-0 left-0 right-0 h-1.5 flex">
              <div className="w-1/3 bg-[#FFD700]" />
              <div className="w-1/3 bg-black" />
              <div className="w-1/3 bg-rose-500" />
            </div>

            {/* Header Authority Emblem */}
            <div className="flex items-center justify-between border-b-2 border-black pb-3 mt-1.5">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-none bg-black text-white flex items-center justify-center text-sm shadow-[2px_2px_0_#FFD700]">
                  🎯
                </div>
                <div>
                  <h4 className="font-banner text-xl leading-none text-black tracking-widest font-black uppercase">
                    LAKSHMAN REKHA AUTHORITY
                  </h4>
                  <p className="text-[8px] text-zinc-600 font-mono tracking-wider uppercase font-bold">
                    ANTI-COCKROACH CENTRAL REGISTRY
                  </p>
                </div>
              </div>
              <div className="text-[8px] bg-black text-[#FFD700] px-1.5 py-0.5 rounded-none font-mono border border-black font-black tracking-tighter">
                ELECTION CODE: 2026
              </div>
            </div>

            {/* Card Content Layout */}
            <div className="mt-4 grid grid-cols-12 gap-4 items-center">
              
              {/* Photo Frame or Mascot ID */}
              <div className="col-span-4 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#FFD700] border-2 border-black flex items-center justify-center text-3xl shadow-[3px_3px_0_#000] relative overflow-hidden">
                  <span className="relative z-10">{selectedAvatar.icon}</span>
                  {/* Watermark logo */}
                  <div className="absolute bottom-0 right-0 text-black font-black text-[7px] uppercase select-none opacity-50 bg-white border-l border-t border-black px-0.5">LRP</div>
                </div>
                <span className="text-[7px] text-black font-mono uppercase mt-1.5 font-bold">BIOMETRIC VALID</span>
              </div>

              {/* Verified Details */}
              <div className="col-span-8 font-mono text-black text-[11px] space-y-1.5">
                <div>
                  <span className="text-zinc-500 text-[8px] block font-bold">MEMBER ID NO:</span>
                  <span className="font-black text-black text-xs tracking-wider font-sans">{cardId}</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[8px] block font-bold">FULL CITIZEN NAME:</span>
                  <span className="font-extrabold text-black uppercase text-[11px] truncate block font-sans">{name || "Rahul Shrivastava"}</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[8px] block font-bold">TACTICAL LEVEL:</span>
                  <span className="text-[#ef4444] font-black uppercase text-[10px]">{selectedAvatar.name}</span>
                </div>
              </div>

            </div>

            {/* Card Footer Details */}
            <div className="mt-5 pt-3 border-t-2 border-black flex items-center justify-between text-[9px] font-mono">
              <div>
                <span className="text-zinc-500 text-[7px] block font-bold">AUTH STATUS:</span>
                <span className="text-black font-bold">COGNIZANT</span>
              </div>
              <div>
                <span className="text-zinc-500 text-[7px] block font-bold text-right">LRP STATUS</span>
                <span className="text-emerald-700 font-bold flex items-center gap-0.5 font-sans justify-end">
                  <CheckCircle className="w-2.5 h-2.5" /> SECURE UNIT
                </span>
              </div>
            </div>

            {/* Interactive certified stamp overlay with high-contrast rotation */}
            {stampActive && (
              <div 
                className="absolute right-4 top-16 border-2 border-rose-500 text-rose-500 font-banner text-xs font-black px-2 py-1 rotate-12 bg-white select-none cursor-pointer rounded-none hover:scale-105 active:scale-95 transition shadow-[2px_2px_0_rgba(244,63,94,0.2)] uppercase"
                onClick={() => setStampActive(!stampActive)}
                title="Click to toggle stamp alignment"
              >
                REKHA APPROVED
              </div>
            )}

            {/* Security barcode visual */}
            <div className="mt-3.5 flex flex-col items-center border-t border-black/10 pt-2">
              <div className="w-full h-4 bg-white border border-black p-[1px] flex items-center justify-between gap-[1px]">
                {Array.from({ length: 44 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="h-full bg-black" 
                    style={{ width: `${Math.max(1, (i % 3 === 0 ? 3 : i % 5 === 0 ? 1 : 2))}px` }} 
                  />
                ))}
              </div>
              <span className="text-[7px] text-zinc-500 uppercase mt-0.5 font-bold font-mono">BARCODE SYNC - SECURE COUPLING SYSTEM</span>
            </div>
          </div>

          {/* Action Tools */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 text-xs font-mono w-full items-center justify-center">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto brutalist-button-dark py-2.5 px-6 text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#FFD700]" /> PRINT CARD BADGE
            </button>
            <p className="text-[10px] text-zinc-500 max-w-[200px] leading-tight font-bold text-center sm:text-left mt-2 sm:mt-0">
              *Printed badging qualifies you for localized border immunity.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
