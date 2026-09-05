export function MoonPhase({ className = '' }: { className?: string }) {
  // Mock moon phase calculation
  const getPhaseIcon = () => '🌔';
  const getPhaseName = () => 'Waxing Gibbous';

  return (
    <div className={`widget flex-center flex-col ${className}`}>
      <div className="widget-title" style={{ alignSelf: 'flex-start' }}>Moon</div>
      <div className="moon-icon">{getPhaseIcon()}</div>
      <div style={{ marginTop: '0.5rem', opacity: 0.8 }}>{getPhaseName()}</div>
    </div>
  );
}
