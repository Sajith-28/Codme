export function Spotlight({ className, fill }: { className?: string, fill?: string }) {
  return (
    <div className={`absolute pointer-events-none ${className || ''}`} style={{ width: 800, height: 800 }}>
      <div 
        className="absolute inset-0 rounded-full" 
        style={{
          background: `radial-gradient(circle at center, ${fill || 'white'} 0%, transparent 60%)`,
          opacity: 0.1,
          filter: 'blur(100px)'
        }}
      />
    </div>
  );
}
