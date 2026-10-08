import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

export interface Track {
  title: string;
  artist: string;
  url: string;
  cover?: string;
}

interface MusicContextType {
  track: Track | null;
  isPlaying: boolean;
  progress: number;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [track, setTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      const audio = audioRef.current;

      audio.addEventListener("timeupdate", () => {
        if (audio.duration) {
          setProgress((audio.currentTime / audio.duration) * 100);
        }
      });

      audio.addEventListener("ended", () => {
        setIsPlaying(false);
        setProgress(0);
      });

      audio.addEventListener("play", () => setIsPlaying(true));
      audio.addEventListener("pause", () => setIsPlaying(false));
      
      // Handle errors (e.g. invalid URL)
      audio.addEventListener("error", () => {
        setIsPlaying(false);
        setProgress(0);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  const playTrack = (newTrack: Track) => {
    if (!audioRef.current) return;

    if (track?.url === newTrack.url) {
      audioRef.current.play().catch(console.error);
      return;
    }

    audioRef.current.src = newTrack.url;
    audioRef.current.play().catch(console.error);
    setTrack(newTrack);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      if (audioRef.current.src && audioRef.current.src !== window.location.href) {
        audioRef.current.play().catch(console.error);
      }
    }
  };

  return (
    <MusicContext.Provider value={{ track, isPlaying, progress, playTrack, togglePlay }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
}
