import { useState, useEffect } from 'react';

export function Scratchpad({ className = '' }: { className?: string }) {
  const [text, setText] = useState(() => localStorage.getItem('dashboard-scratchpad') || '');

  useEffect(() => {
    localStorage.setItem('dashboard-scratchpad', text);
  }, [text]);

  return (
    <div className={`widget ${className}`}>
      <div className="widget-title">Scratchpad</div>
      <textarea 
        className="scratchpad-area"
        placeholder="Jot down some quick thoughts..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}
