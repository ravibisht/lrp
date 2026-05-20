import React, { useState, useRef, useEffect } from 'react';
import { Fingerprint, CheckCircle } from 'lucide-react';

export default function RekhaOathScanner() {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [oathCompleted, setOathCompleted] = useState(false);
  const [oathId, setOathId] = useState("");

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startHold = (e: React.PointerEvent) => {
    e.preventDefault(); // Prevent text selection/scrolling on mobile
    if (oathCompleted) return;
    setIsHolding(true);
    
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setOathCompleted(true);
          setOathId("LRP-" + Math.floor(100000 + Math.random() * 900000));
          setIsHolding(false);
          return 100;
        }
        return prev + 2; // Takes ~2.5 seconds (50 loops of 50ms)
      });
    }, 50);
  };

  const stopHold = () => {
    if (oathCompleted) return;
    setIsHolding(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    // Only drop progress if it hasn't reached 100
    if (progress < 100) {
      setProgress(0);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const resetOath = () => {
    setOathCompleted(false);
    setProgress(0);
    setOathId("");
  };

  return (
    <div className="bg-black text-white border-4 border-black shadow-[6px_6px_0px_#000] p-6 sm:p-8 flex flex-col justify-between h-full font-mono relative">
      <div>
        <div className="flex justify-between items-center border-b-2 border-white pb-4 mb-4">
          <h3 className="font-display font-black text-xl uppercase tracking-tighter text-[#FFD700] flex items-center gap-2">
            <Fingerprint className="w-5 h-5 text-white" /> DIGITAL OATH SCANNER
          </h3>
          <span className="text-[9px] bg-white text-black font-black uppercase px-2 py-1">
            BIOMETRIC
          </span>
        </div>
        
        <p className="text-zinc-400 text-xs leading-relaxed font-bold mb-6">
          Swear your allegiance to the Lakshman Rekha Party. Place and hold your thumb on the scanner to declare your room a no-slop zone.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow py-4">
        {!oathCompleted ? (
          <div className="flex flex-col items-center gap-6 w-full">
            <div 
              className={`w-32 h-32 rounded-full border-4 ${isHolding ? 'border-[#FFD700] bg-[#FFD700]/20' : 'border-zinc-700 bg-zinc-900'} flex items-center justify-center transition-colors cursor-pointer select-none touch-none shadow-[0_0_15px_rgba(255,215,0,0.3)] relative overflow-hidden`}
              onPointerDown={startHold}
              onPointerUp={stopHold}
              onPointerOut={stopHold}
              onPointerCancel={stopHold}
            >
              <div 
                className="absolute bottom-0 left-0 right-0 bg-[#FFD700] opacity-30 transition-all duration-[50ms]"
                style={{ height: `${progress}%` }}
              />
              <Fingerprint className={`w-16 h-16 ${isHolding ? 'text-[#FFD700] scale-110 animate-pulse' : 'text-zinc-600'} transition-all z-10`} />
            </div>

            <div className="w-full max-w-xs space-y-2">
              <div className="flex justify-between text-[10px] font-black uppercase text-zinc-500">
                <span>VERIFICATION</span>
                <span className="text-[#FFD700]">{progress}%</span>
              </div>
              <div className="h-2 w-full bg-zinc-800 border-2 border-zinc-700">
                <div 
                  className="h-full bg-[#FFD700] transition-all duration-[50ms]" 
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-center text-[10px] font-bold text-zinc-500 min-h-4">
                {isHolding ? "HOLDING STRONG... DO NOT LET GO" : "PRESS AND HOLD SCANNER"}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white text-black border-4 border-zinc-200 p-6 w-full max-w-sm text-center relative font-mono animate-fade-in">
            <div className="absolute top-0 right-0 bg-[#FFD700] text-black text-[8px] font-black uppercase px-2 py-1 border-l-4 border-b-4 border-zinc-200">
              OFFICIAL RECORD
            </div>
            <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
            <h4 className="font-display font-black text-xl uppercase mb-1">OATH VERIFIED</h4>
            <p className="text-[10px] text-zinc-500 font-bold mb-4">CITIZEN ASSIGNED TO FRONT LINES</p>
            
            <div className="bg-zinc-100 border-2 border-black p-3 text-left space-y-1 mb-4 shadow-[2px_2px_0_#000]">
              <div className="text-[9px] text-zinc-500 font-black uppercase">PLEDGE ID:</div>
              <div className="font-extrabold text-[#ef4444] text-xs">{oathId}</div>
              <div className="text-[9px] text-zinc-500 font-black uppercase mt-2">DIRECTIVE:</div>
              <div className="font-bold text-xs uppercase leading-tight">Maintain 100% desk integrity. Report damp sponges immediately.</div>
            </div>

            <button 
              onClick={resetOath}
              className="brutalist-button-dark w-full py-3 text-[10px] uppercase cursor-pointer"
            >
              SWEAR ANOTHER DEVICE
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
