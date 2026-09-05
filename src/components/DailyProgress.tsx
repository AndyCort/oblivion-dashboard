import { useState, useEffect } from 'react';

export function DailyProgress({ className = '' }: { className?: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calcProgress = () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
      const diff = now.getTime() - start.getTime();
      setProgress(Math.min(100, (diff / (24 * 60 * 60 * 1000)) * 100));
    };
    calcProgress();
    const timer = setInterval(calcProgress, 60000);
    return () => clearInterval(timer);
  }, []);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`widget ${className}`}>
      <div className="widget-title">Day Progress</div>
      <div className="flex-center" style={{ position: 'relative' }}>
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
          <circle 
            cx="50" cy="50" r={radius} 
            fill="none" 
            stroke="rgba(255,255,255,0.8)" 
            strokeWidth="8" 
            strokeDasharray={circumference} 
            strokeDashoffset={strokeDashoffset} 
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
          />
        </svg>
        <div style={{ position: 'absolute', fontWeight: 300, fontSize: '1.2rem' }}>
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
}
