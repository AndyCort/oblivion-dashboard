import { useState, useEffect } from 'react';
import { Battery, BatteryCharging, BatteryFull, BatteryLow, BatteryMedium } from 'lucide-react';

export function BatteryStatus({ className = '' }: { className?: string }) {
  const [level, setLevel] = useState<number | null>(null);
  const [charging, setCharging] = useState<boolean>(false);

  useEffect(() => {
    let batteryPromise: any;
    
    // Check if Battery Status API is supported
    if ('getBattery' in navigator) {
      batteryPromise = (navigator as any).getBattery();
      batteryPromise.then((battery: any) => {
        setLevel(battery.level * 100);
        setCharging(battery.charging);

        battery.addEventListener('levelchange', () => setLevel(battery.level * 100));
        battery.addEventListener('chargingchange', () => setCharging(battery.charging));
      });
    } else {
      // Mock for unsupported browsers
      setLevel(85);
      setCharging(false);
    }
  }, []);

  const getIcon = () => {
    if (charging) return <BatteryCharging size={48} />;
    if (level === null) return <Battery size={48} />;
    if (level > 80) return <BatteryFull size={48} />;
    if (level > 30) return <BatteryMedium size={48} />;
    return <BatteryLow size={48} />;
  };

  return (
    <div className={`widget ${className}`}>
      <div className="widget-title">System</div>
      <div className="flex-center flex-col">
        {getIcon()}
        <div style={{ fontSize: '1.5rem', fontWeight: 300, marginTop: '0.5rem' }}>
          {level !== null ? `${Math.round(level)}%` : 'Unknown'}
        </div>
        <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>
          {charging ? 'Charging' : 'On Battery'}
        </div>
      </div>
    </div>
  );
}
