import { createContext, useContext } from "react";

export interface Track {
  title: string;
  artist: string;
  url: string;
  cover?: string;
}

interface MusicContextType {
  track: Track | null;
  isPlaying: boolean;
  isLoading: boolean;
  progress: number;
  currentTime: number;
  duration: number;
  volume: number;
  muted: boolean;
  loop: boolean;
  seek: (seconds: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleLoop: () => void;
  error: string | null;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
}

export const MusicContext = createContext<MusicContextType | undefined>(undefined);
export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) throw new Error("useMusic must be used within a MusicProvider");
  return context;
}
