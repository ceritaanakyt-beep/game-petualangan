import React, { useMemo } from 'react';

export const CosmicBackground: React.FC = () => {
  // Generate stable random stars
  const stars = useMemo(() => {
    return Array.from({ length: 48 }, (_, i) => ({
      id: i,
      x: (i * 37 + 13) % 100,
      y: (i * 53 + 29) % 100,
      size: (i % 3) + 1.2,
      delay: (i % 5) * 0.7,
      duration: 2 + (i % 4),
      opacity: 0.3 + ((i % 5) * 0.14),
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-slate-950">
      {/* Deep Space Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.25),rgba(255,255,255,0))]" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl" />
      <div className="absolute top-2/3 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />

      {/* Twinkling Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white transition-opacity"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `pulse ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
            boxShadow: star.size > 2 ? '0 0 6px rgba(255,255,255,0.8)' : 'none',
          }}
        />
      ))}

      {/* Distant Orbit Rings */}
      <div className="absolute -bottom-48 -left-48 w-[600px] h-[600px] rounded-full border border-indigo-500/10 pointer-events-none" />
      <div className="absolute -bottom-64 -left-64 w-[850px] h-[850px] rounded-full border border-indigo-500/5 pointer-events-none" />
    </div>
  );
};
