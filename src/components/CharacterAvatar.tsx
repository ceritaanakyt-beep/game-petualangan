import React from 'react';
import { SCHOOL_CHARACTERS } from '../data/gameData';
import { Character } from '../types';

interface CharacterAvatarProps {
  characterId: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  className?: string;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  characterId,
  size = 'md',
  showBadge = false,
  className = '',
}) => {
  const character: Character =
    SCHOOL_CHARACTERS.find((c) => c.id === characterId) || SCHOOL_CHARACTERS[0];

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
  };

  const renderVisual = () => {
    if (character.id === 'bima_bakalan') {
      // Custom illustration faithful to the user's uploaded image:
      // Ksatria SD Negeri Bakalan 01 Polokarto
      return (
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circular halo background */}
          <circle cx="60" cy="60" r="58" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="2.5" />
          
          {/* Traditional Candi / Temple Silhouette in background */}
          <path
            d="M32 78 L32 50 L38 50 L38 42 L42 42 L42 36 L46 36 L46 78 Z"
            fill="#312e81"
            opacity="0.6"
          />
          <path
            d="M88 78 L88 50 L82 50 L82 42 L78 42 L78 36 L74 36 L74 78 Z"
            fill="#312e81"
            opacity="0.6"
          />

          {/* Golden Crown (Makuta / Kuluk) with celestial star */}
          <path
            d="M44 38 C44 20, 60 14, 60 14 C60 14, 76 20, 76 38 Z"
            fill="#1e3a8a"
            stroke="#fbbf24"
            strokeWidth="2"
          />
          {/* Gold Filigree on Crown */}
          <path
            d="M47 36 Q60 26 73 36"
            stroke="#fbbf24"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Center Crown Big Star */}
          <polygon
            points="60,20 62,25 67,25 63,28 65,33 60,30 55,33 57,28 53,25 58,25"
            fill="#fbbf24"
          />
          {/* Left and right side mini stars */}
          <circle cx="51" cy="27" r="1.5" fill="#fbbf24" />
          <circle cx="69" cy="27" r="1.5" fill="#fbbf24" />

          {/* Head & Face */}
          <ellipse cx="60" cy="46" rx="14" ry="12" fill="#fed7aa" stroke="#78350f" strokeWidth="1" />
          {/* Ears */}
          <circle cx="45" cy="46" r="3" fill="#fed7aa" />
          <circle cx="75" cy="46" r="3" fill="#fed7aa" />
          <circle cx="45" cy="47" r="1" fill="#fbbf24" />
          <circle cx="75" cy="47" r="1" fill="#fbbf24" />

          {/* Eyes (Friendly & Joyful) */}
          <ellipse cx="55" cy="44" rx="2" ry="2.2" fill="#0f172a" />
          <ellipse cx="65" cy="44" rx="2" ry="2.2" fill="#0f172a" />
          <circle cx="56" cy="43.5" r="0.8" fill="#ffffff" />
          <circle cx="66" cy="43.5" r="0.8" fill="#ffffff" />
          {/* Eyebrows */}
          <path d="M52 40 Q55 39 58 41" stroke="#451a03" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M68 40 Q65 39 62 41" stroke="#451a03" strokeWidth="1.2" strokeLinecap="round" />
          {/* Smile */}
          <path d="M56 50 Q60 54 64 50" stroke="#b91c1c" strokeWidth="1.5" fill="#fca5a5" />

          {/* School Uniform / Batik Robe Collar */}
          <path
            d="M42 60 L78 60 L84 100 L36 100 Z"
            fill="#f5f5f4"
            stroke="#d6d3d1"
            strokeWidth="1"
          />
          {/* Traditional motif hints */}
          <line x1="46" y1="65" x2="52" y2="72" stroke="#a8a29e" strokeWidth="1" />
          <line x1="68" y1="65" x2="74" y2="72" stroke="#a8a29e" strokeWidth="1" />

          {/* Chest Shield Emblem: SD NEGERI BAKALAN 01 POLOKARTO */}
          <g transform="translate(60, 80)">
            {/* White/Silver badge */}
            <path
              d="M-15 -14 L15 -14 L15 2 C15 10, 0 16, 0 16 C0 16, -15 10, -15 2 Z"
              fill="#ffffff"
              stroke="#1e3a8a"
              strokeWidth="1.5"
            />
            {/* 3 mini stars on shield */}
            <circle cx="-6" cy="-10" r="1.2" fill="#f59e0b" />
            <circle cx="0" cy="-11" r="1.5" fill="#f59e0b" />
            <circle cx="6" cy="-10" r="1.2" fill="#f59e0b" />
            {/* Open Book Logo on Shield */}
            <path
              d="M-6 -4 Q0 -6 0 -1 Q0 -6 6 -4 L6 2 Q0 0 0 5 Q0 0 -6 2 Z"
              fill="#2563eb"
            />
            {/* Tiny Laurel Wreath */}
            <path
              d="M-11 4 C-11 8, -6 12, 0 14 C6 12, 11 8, 11 4"
              stroke="#f59e0b"
              strokeWidth="1"
              fill="none"
            />
          </g>

          {/* Open Blue Book held in Hand */}
          <g transform="translate(86, 68) rotate(15)">
            <rect x="0" y="0" width="16" height="20" rx="1.5" fill="#1d4ed8" stroke="#ffffff" strokeWidth="1" />
            <line x1="8" y1="1" x2="8" y2="19" stroke="#93c5fd" strokeWidth="1" />
            <line x1="2" y1="4" x2="6" y2="4" stroke="#ffffff" strokeWidth="0.8" />
            <line x1="2" y1="7" x2="6" y2="7" stroke="#ffffff" strokeWidth="0.8" />
            <line x1="10" y1="4" x2="14" y2="4" stroke="#ffffff" strokeWidth="0.8" />
            <line x1="10" y1="7" x2="14" y2="7" stroke="#ffffff" strokeWidth="0.8" />
          </g>
        </svg>
      );
    }

    if (character.id === 'alya_siswi') {
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" fill="none">
          <circle cx="60" cy="60" r="58" fill="#581c87" stroke="#f472b6" strokeWidth="2.5" />
          {/* Hair */}
          <path d="M35 48 C35 24, 85 24, 85 48 C85 64, 75 75, 75 75 L45 75 C45 75, 35 64, 35 48 Z" fill="#3b0764" />
          <ellipse cx="60" cy="50" rx="16" ry="14" fill="#fed7aa" />
          {/* Glasses */}
          <rect x="46" y="44" width="11" height="8" rx="2" stroke="#e11d48" strokeWidth="1.5" fill="#ffffff" fillOpacity="0.2" />
          <rect x="63" y="44" width="11" height="8" rx="2" stroke="#e11d48" strokeWidth="1.5" fill="#ffffff" fillOpacity="0.2" />
          <line x1="57" y1="48" x2="63" y2="48" stroke="#e11d48" strokeWidth="1.5" />
          {/* Eyes */}
          <circle cx="51" cy="48" r="1.5" fill="#0f172a" />
          <circle cx="68" cy="48" r="1.5" fill="#0f172a" />
          {/* Smile */}
          <path d="M56 56 Q60 60 64 56" stroke="#b91c1c" strokeWidth="1.5" fill="#fca5a5" />
          {/* Red and White SD Necktie / Scarf */}
          <path d="M44 68 L76 68 L82 105 L38 105 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
          <path d="M57 68 L63 68 L65 85 L60 90 L55 85 Z" fill="#dc2626" />
        </svg>
      );
    }

    if (character.id === 'rian_teknisi') {
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" fill="none">
          <circle cx="60" cy="60" r="58" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="2.5" />
          {/* Cap / Helmet */}
          <path d="M38 48 C38 28, 82 28, 82 48 Z" fill="#2563eb" />
          <rect x="34" y="44" width="52" height="6" rx="3" fill="#f97316" />
          {/* Face */}
          <ellipse cx="60" cy="54" rx="15" ry="13" fill="#fed7aa" />
          {/* Eyes with excitement */}
          <circle cx="53" cy="52" r="2" fill="#0f172a" />
          <circle cx="67" cy="52" r="2" fill="#0f172a" />
          <path d="M55 60 Q60 65 65 60" stroke="#b91c1c" strokeWidth="1.5" fill="#f87171" />
          {/* Space Tech Jumpsuit with Wrench */}
          <path d="M42 70 L78 70 L84 105 L36 105 Z" fill="#0284c7" />
          <circle cx="60" cy="84" r="5" fill="#facc15" />
        </svg>
      );
    }

    // Pak Guru Surya
    return (
      <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" fill="none">
        <circle cx="60" cy="60" r="58" fill="#064e3b" stroke="#34d399" strokeWidth="2.5" />
        {/* Hair and spectacles */}
        <path d="M42 42 C42 26, 78 26, 78 42 Z" fill="#334155" />
        <ellipse cx="60" cy="52" rx="15" ry="14" fill="#ffedd5" />
        <circle cx="52" cy="50" r="4" stroke="#d97706" strokeWidth="1.2" fill="#ffffff" fillOpacity="0.3" />
        <circle cx="68" cy="50" r="4" stroke="#d97706" strokeWidth="1.2" fill="#ffffff" fillOpacity="0.3" />
        <line x1="56" y1="50" x2="64" y2="50" stroke="#d97706" strokeWidth="1.2" />
        <circle cx="52" cy="50" r="1.5" fill="#0f172a" />
        <circle cx="68" cy="50" r="1.5" fill="#0f172a" />
        <path d="M56 60 Q60 63 64 60" stroke="#78350f" strokeWidth="1.5" />
        {/* Teacher collar */}
        <path d="M42 68 L78 68 L84 105 L36 105 Z" fill="#047857" />
        <polygon points="60,72 63,80 57,80" fill="#f59e0b" />
      </svg>
    );
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${sizeClasses[size]} ${className}`}>
      {renderVisual()}
      {showBadge && (
        <span className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 font-extrabold text-[10px] px-1.5 py-0.5 rounded-full shadow border border-amber-300">
          SD 01
        </span>
      )}
    </div>
  );
};

interface GuideBubbleProps {
  characterId: string;
  message: string;
  tip?: string;
  isCorrect?: boolean | null;
  className?: string;
}

export const CharacterGuideBubble: React.FC<GuideBubbleProps> = ({
  characterId,
  message,
  tip,
  isCorrect,
  className = '',
}) => {
  const character =
    SCHOOL_CHARACTERS.find((c) => c.id === characterId) || SCHOOL_CHARACTERS[0];

  const getBorderColor = () => {
    if (isCorrect === true) return 'border-emerald-300 bg-emerald-50 text-slate-800';
    if (isCorrect === false) return 'border-rose-300 bg-rose-50 text-slate-800';
    return 'border-indigo-200 bg-white text-slate-800';
  };

  return (
    <div
      className={`flex items-start gap-3 p-3.5 rounded-2xl border shadow-md transition-all ${getBorderColor()} ${className}`}
    >
      <div className="shrink-0 flex flex-col items-center">
        <CharacterAvatar characterId={character.id} size="md" />
        <span className="mt-1 text-[11px] font-bold text-indigo-900 tracking-tight text-center max-w-[80px] leading-none line-clamp-1">
          {character.name.split(' ')[0]}
        </span>
      </div>
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center justify-between gap-1 mb-1">
          <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block"></span>
            {character.role}
          </span>
          {character.schoolName && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 border border-indigo-200">
              {character.schoolName}
            </span>
          )}
        </div>
        <p className="text-sm font-semibold text-slate-800 leading-snug">
          {message}
        </p>
        {tip && (
          <div className="mt-2 p-2.5 rounded-xl bg-amber-50/90 border border-amber-200 text-xs text-slate-700">
            <strong className="text-amber-800">💡 Tips Pintar: </strong>
            {tip}
          </div>
        )}
      </div>
    </div>
  );
};
