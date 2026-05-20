import React, { useState, useEffect, useRef } from "react";
import { Music, Play, Pause, Volume2, VolumeX } from "lucide-react";

export default function AnthemPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [language, setLanguage] = useState<"hindi" | "english">("hindi");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Uses files placed in the /public directory.
  const audioUrls = {
    hindi: "/rekha_kecho_v1.mp3",
    english: "/rekha_kecho_v1.mp3"
  };

  const hasInteracted = useRef(false);

  // Wait for user interaction before attempting to play, avoiding browser console errors
  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted.current && audioRef.current) {
        hasInteracted.current = true;
        setIsPlaying((prev) => {
          if (!prev) {
            audioRef.current?.play().catch(() => {});
            return true;
          }
          return prev;
        });
      }
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, language]);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    hasInteracted.current = true;
    setIsPlaying(!isPlaying);
  };
  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const handleAudioError = () => {
    setIsPlaying(false);
    console.warn(`Audio source not found for ${language} anthem. Please ensure the MP3 files are placed in the public/ folder.`);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 bg-white border-2 border-black p-3 shadow-[6px_6px_0_#000] flex flex-col gap-2 rounded-xl w-64 animate-fade-in">
      <audio 
        ref={audioRef} 
        src={audioUrls[language]} 
        loop
        muted={isMuted}
        onError={handleAudioError}
      />
      <div className="flex items-center justify-between border-b-2 border-black pb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#FFD700] rounded-none border-2 border-black flex items-center justify-center shadow-[2px_2px_0_#000]">
            <Music className={`w-4 h-4 text-black ${isPlaying ? 'animate-bounce' : ''}`} />
          </div>
          <div>
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 block leading-tight">Official</span>
            <span className="text-xs font-black uppercase text-black leading-tight">Party Anthem</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mt-1">
        <button 
          onClick={togglePlay}
          className="flex-1 bg-black text-white hover:bg-zinc-800 border-2 border-black text-[10px] font-black py-2 uppercase transition-colors shadow-[2px_2px_0_#FFD700] flex justify-center items-center gap-1.5 active:translate-y-px active:shadow-none"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          {isPlaying ? "PAUSE ANTHEM" : "PLAY ANTHEM"}
        </button>
        <button 
          onClick={toggleMute}
          className="w-10 h-8 bg-white text-black hover:bg-zinc-100 border-2 border-black flex items-center justify-center transition-colors shadow-[2px_2px_0_#000] active:translate-y-px active:shadow-none"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
