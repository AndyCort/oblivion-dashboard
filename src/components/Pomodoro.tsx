import { useState, useEffect } from 'react';
import { Play, Square, RotateCcw } from 'lucide-react';

export function Pomodoro({ className = '' }: { className?: string }) {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const secs = (timeLeft % 60).toString().padStart(2, '0');
  const progress = ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  return (
    <div className={`widget ${className}`} style={{ position: 'relative' }}>
      <div className="widget-title">Focus</div>
      
      {/* Background Progress */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, height: '4px', width: `${progress}%`, background: 'rgba(255,255,255,0.5)', transition: 'width 1s linear' }}></div>

      <div className="flex-center flex-col">
        <div style={{ fontSize: '3rem', fontWeight: 200, letterSpacing: '-1px' }}>
          {mins}:{secs}
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button onClick={() => setIsRunning(!isRunning)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
            {isRunning ? <Square size={24} /> : <Play size={24} />}
          </button>
          <button onClick={() => { setIsRunning(false); setTimeLeft(25 * 60); }} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
            <RotateCcw size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
