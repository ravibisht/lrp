import React from "react";
import { CUSTOM_AVATARS } from "../data";
import { User, RefreshCcw, Landmark, Download, CheckCircle } from "lucide-react";
import { toPng } from "html-to-image";

export function generateNewCardId() {
  return `LRP-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`;
}

export function VoterCardForm({ name, setName, designation, setDesignation, avatarId, setAvatarId, setCardId }) {
  const handleRandomize = () => {
    setCardId(generateNewCardId());
    const randAv = CUSTOM_AVATARS[Math.floor(Math.random() * CUSTOM_AVATARS.length)];
    setAvatarId(randAv.id);
    setDesignation(randAv.name);
  };

  return (
    <div className="space-y-5 font-mono text-xs w-full bg-white p-6 md:p-8 rounded-2xl border-2 border-zinc-900 shadow-[4px_4px_0_#18181b]">
      <div className="space-y-2">
        <label className="text-black block uppercase tracking-wider font-extrabold text-[11px]">1. VOLUNTEER FULL NAME</label>
        <div className="relative">
          <User className="absolute left-3.5 top-3 w-4 h-4 text-black font-black" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={26}
            className="w-full bg-[#f4f4f0] border-2 border-black text-black pl-10 pr-4 py-2.5 focus:outline-none focus:ring-0 font-sans font-bold shadow-[2px_2px_0px_#000]"
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
          className="w-full bg-[#f4f4f0] border-2 border-black text-black px-4 py-2.5 focus:outline-none focus:ring-0 font-sans font-bold shadow-[2px_2px_0px_#000]"
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
                  : "bg-white text-zinc-700 border-black hover:bg-zinc-100 shadow-[2px_2px_0_#000]"
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
  );
}

export function VoterCardPreview({ name, designation, avatarId, cardId, stampActive, setStampActive }) {
  const [isDownloading, setIsDownloading] = React.useState(false);
  const selectedAvatar = CUSTOM_AVATARS.find((av) => av.id === avatarId) || CUSTOM_AVATARS[0];

  const handlePrint = async () => {
    const badgeElement = document.getElementById("lrp-identity-badge");
    if (!badgeElement) return;
    
    setIsDownloading(true);
    try {
      const dataUrl = await toPng(badgeElement, {
        pixelRatio: 3,
        backgroundColor: "#ffffff",
      });
      
      const link = document.createElement("a");
      link.download = `LRP_ID_${name.replace(/\s+/g, '_')}_${cardId}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate image", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
      {/* Fictional ID badge layout with Brutalist style */}
      <div 
        id="lrp-identity-badge"
        className="w-full bg-white border-4 border-black p-5 shadow-[8px_8px_0px_rgba(0,0,0,1)] relative overflow-hidden text-black rounded-none"
      >
        {/* Top Tri-Color Accent */}
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
              <h4 className="font-banner text-[16px] sm:text-xl leading-none text-black tracking-widest font-black uppercase">
                LAKSHMAN REKHA AUTHORITY
              </h4>
              <p className="text-[7px] sm:text-[8px] text-zinc-600 font-mono tracking-wider uppercase font-bold">
                ANTI-COCKROACH CENTRAL REGISTRY
              </p>
            </div>
          </div>
        </div>

        {/* Card Content Layout */}
        <div className="mt-4 grid grid-cols-12 gap-4 items-center">
          {/* Photo Frame */}
          <div className="col-span-4 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#FFD700] border-2 border-black flex items-center justify-center text-3xl shadow-[3px_3px_0_#000] relative overflow-hidden">
              <span className="relative z-10">{selectedAvatar.icon}</span>
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

        {stampActive && (
          <div 
            className="absolute right-2 top-16 border-2 border-rose-500 text-rose-500 font-banner text-[10px] font-black px-2 py-1 rotate-12 bg-white select-none cursor-pointer rounded-none hover:scale-105 active:scale-95 transition shadow-[2px_2px_0_rgba(244,63,94,0.2)] uppercase"
            onClick={() => setStampActive(!stampActive)}
            title="Click to toggle stamp alignment"
          >
            REKHA APPROVED
          </div>
        )}

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

      <div className="mt-6 flex flex-col gap-3 text-xs font-mono w-full items-center justify-center">
        <button
          onClick={handlePrint}
          disabled={isDownloading}
          className="w-full brutalist-button-dark py-3 px-6 text-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-75 disabled:cursor-wait"
        >
          <Download className="w-3.5 h-3.5 text-[#FFD700]" /> {isDownloading ? "GENERATING FILE..." : "DOWNLOAD CARD BADGE"}
        </button>
      </div>
    </div>
  );
}
