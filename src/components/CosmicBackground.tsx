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
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-indigo-50/40">
      {/* Soft Luminous Celestial Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.08),rgba(255,255,255,0))]" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl" />
      <div className="absolute top-2/3 left-1/3 w-80 h-80 bg-amber-100/50 rounded-full blur-3xl" />

      {/* Twinkling Stars (in blue, indigo, and gold on bright white) */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full transition-opacity"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.id % 3 === 0 ? '#6366f1' : star.id % 3 === 1 ? '#0ea5e9' : '#f59e0b',
            opacity: star.opacity * 0.7,
            animation: `pulse ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
            boxShadow: star.size > 2 ? '0 0 4px rgba(99,102,241,0.4)' : 'none',
          }}
        />
      ))}

      {/* Delicate Orbit Rings */}
      <div className="absolute -bottom-48 -left-48 w-[600px] h-[600px] rounded-full border border-indigo-200/40 pointer-events-none" />
      <div className="absolute -bottom-64 -left-64 w-[850px] h-[850px] rounded-full border border-indigo-200/25 pointer-events-none" />
    </div>
  );
};
