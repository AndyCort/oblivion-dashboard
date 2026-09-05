import { useState } from 'react';
import { Droplet } from 'lucide-react';

export function WaterTracker({ className = '' }: { className?: string }) {
  const [glasses, setGlasses] = useState(3);
  const goal = 8;

  return (
    <div className={`widget ${className}`}>
      <div className="widget-title">Hydration</div>
      <div className="flex-center flex-col" style={{ flex: 1 }}>
        <div style={{ fontSize: '2rem', fontWeight: 300, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {glasses} <span style={{ fontSize: '1rem', opacity: 0.6 }}>/ {goal}</span>
        </div>
        <div style={{ display: 'flex', gap: '0.2rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem' }}>
          {Array.from({ length: goal }).map((_, i) => (
            <button 
              key={i}
              onClick={() => setGlasses(i + 1 === glasses ? i : i + 1)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: i < glasses ? '#3498db' : 'white', opacity: i < glasses ? 1 : 0.2 }}
            >
              <Droplet size={20} fill={i < glasses ? 'currentColor' : 'none'} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
