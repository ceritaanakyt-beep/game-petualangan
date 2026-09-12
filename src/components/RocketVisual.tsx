import React from 'react';
import { ROCKET_SKINS } from '../data/gameData';
import { RocketSkin } from '../types';

interface RocketVisualProps {
  skinId: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isFlying?: boolean;
  className?: string;
}

export const RocketVisual: React.FC<RocketVisualProps> = ({
  skinId,
  size = 'md',
  isFlying = false,
  className = '',
}) => {
  const skin: RocketSkin =
    ROCKET_SKINS.find((s) => s.id === skinId) || ROCKET_SKINS[0];

  const sizeMap = {
    sm: 'w-12 h-16',
    md: 'w-20 h-28',
    lg: 'w-32 h-44',
    xl: 'w-44 h-60',
  };

  const getFlameGradient = () => {
    switch (skin.flameType) {
      case 'solar':
        return (
          <linearGradient id={`flameGrad-${skin.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
          </linearGradient>
        );
      case 'plasma':
        return (
          <linearGradient id={`flameGrad-${skin.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a5f3fc" />
            <stop offset="45%" stopColor="#06b6d4" />
            <stop offset="85%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
        );
      case 'cosmic':
        return (
          <linearGradient id={`flameGrad-${skin.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fbcfe8" />
            <stop offset="40%" stopColor="#ec4899" />
            <stop offset="80%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#312e81" stopOpacity="0" />
          </linearGradient>
        );
      case 'fire':
      default:
        return (
          <linearGradient id={`flameGrad-${skin.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="35%" stopColor="#f97316" />
            <stop offset="85%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#991b1b" stopOpacity="0" />
          </linearGradient>
        );
    }
  };

  return (
    <div className={`relative inline-flex flex-col items-center justify-center ${sizeMap[size]} ${className}`}>
      <svg
        viewBox="0 0 100 140"
        className={`w-full h-full drop-shadow-lg transition-transform duration-300 ${
          isFlying ? 'animate-float' : ''
        }`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {getFlameGradient()}
          <linearGradient id={`hullGrad-${skin.id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={skin.primaryColor} />
            <stop offset="100%" stopColor={skin.secondaryColor} />
          </linearGradient>
          <linearGradient id={`glassGrad-${skin.id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Thruster Flame */}
        <g className="animate-thruster origin-top">
          {/* Outer Flame */}
          <path
            d="M38 102 C35 125, 45 138, 50 142 C55 138, 65 125, 62 102 Z"
            fill={`url(#flameGrad-${skin.id})`}
            opacity="0.9"
          />
          {/* Inner Flame Core */}
          <path
            d="M43 102 C42 118, 47 128, 50 131 C53 128, 58 118, 57 102 Z"
            fill="#ffffff"
            opacity="0.85"
          />
        </g>

        {/* Left Wing / Fin */}
        <path
          d="M30 75 L10 104 L30 96 Z"
          fill={skin.secondaryColor}
          stroke={skin.accentColor}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Left Fin Accent Stripe */}
        <path d="M22 86 L15 101 L25 97 Z" fill={skin.accentColor} opacity="0.8" />

        {/* Right Wing / Fin */}
        <path
          d="M70 75 L90 104 L70 96 Z"
          fill={skin.secondaryColor}
          stroke={skin.accentColor}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Right Fin Accent Stripe */}
        <path d="M78 86 L85 101 L75 97 Z" fill={skin.accentColor} opacity="0.8" />

        {/* Engine Nozzle */}
        <rect
          x="40"
          y="98"
          width="20"
          height="8"
          rx="2"
          fill={skin.engineColor}
          stroke="#0f172a"
          strokeWidth="1.5"
        />
        <line x1="44" y1="102" x2="56" y2="102" stroke="#334155" strokeWidth="2" />

        {/* Main Body Hull */}
        <path
          d="M50 12 C34 32, 28 65, 30 100 L70 100 C72 65, 66 32, 50 12 Z"
          fill={`url(#hullGrad-${skin.id})`}
          stroke={skin.accentColor}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Center Hull Highlight Stripe */}
        <path
          d="M48 18 C46 35, 45 60, 46 98 L52 98 C53 60, 52 35, 50 18 Z"
          fill="#ffffff"
          opacity="0.25"
        />

        {/* Nose Cone Tip */}
        <path
          d="M50 12 C44 24, 40 32, 38 38 L62 38 C60 32, 56 24, 50 12 Z"
          fill={skin.accentColor}
          stroke={skin.accentColor}
          strokeWidth="1"
        />

        {/* Cockpit Porthole Glass */}
        <circle
          cx="50"
          cy="52"
          r="13"
          fill={`url(#glassGrad-${skin.id})`}
          stroke={skin.accentColor}
          strokeWidth="2.5"
        />
        {/* Cockpit Glare Reflection */}
        <path
          d="M43 45 A10 10 0 0 1 54 43"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Center Insignia / School Badge Decal */}
        {skin.id === 'rocket_satria_bakalan' ? (
          // SD Bakalan 01 Special Gold Crest Decal
          <g transform="translate(50, 77)">
            {/* Shield Outline */}
            <path
              d="M-8 -7 L8 -7 L8 1 C8 6, 0 10, 0 10 C0 10, -8 6, -8 1 Z"
              fill="#1e3a8a"
              stroke="#fbbf24"
              strokeWidth="1.2"
            />
            {/* Center Star */}
            <polygon
              points="0,-5 1.5,-2 4.5,-2 2,0 3,3 0,1.2 -3,3 -2,0 -4.5,-2 -1.5,-2"
              fill="#fbbf24"
            />
          </g>
        ) : (
          // Standard Space Wing Emblem
          <g transform="translate(50, 78)">
            <circle cx="0" cy="0" r="6" fill="#0f172a" stroke={skin.accentColor} strokeWidth="1" />
            <polygon
              points="0,-4 1.2,-1 3.5,-1 1.6,0.5 2.2,2.8 0,1.5 -2.2,2.8 -1.6,0.5 -3.5,-1 -1.2,-1"
              fill={skin.accentColor}
            />
          </g>
        )}

        {/* Rivets / Technical Panel Dots */}
        <circle cx="34" cy="70" r="1" fill="#ffffff" opacity="0.6" />
        <circle cx="34" cy="85" r="1" fill="#ffffff" opacity="0.6" />
        <circle cx="66" cy="70" r="1" fill="#ffffff" opacity="0.6" />
        <circle cx="66" cy="85" r="1" fill="#ffffff" opacity="0.6" />
      </svg>
    </div>
  );
};
