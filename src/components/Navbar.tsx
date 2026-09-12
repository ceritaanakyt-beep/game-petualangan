import React from 'react';
import { Sparkles, Trophy, ShoppingBag, BookOpen, Volume2, VolumeX, Flame, Star, Coins } from 'lucide-react';
import { CharacterAvatar } from './CharacterAvatar';
import { sounds } from '../utils/audio';

interface NavbarProps {
  playerName: string;
  coins: number;
  totalStars: number;
  characterId: string;
  soundEnabled: boolean;
  activeView: 'map' | 'shop' | 'leaderboard' | 'timeAttack' | 'game' | 'materi';
  onNavigate: (view: 'map' | 'shop' | 'leaderboard' | 'timeAttack' | 'materi') => void;
  onToggleSound: () => void;
  onOpenCharacterSelect: () => void;
  onChangeName: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  playerName,
  coins,
  totalStars,
  characterId,
  soundEnabled,
  activeView,
  onNavigate,
  onToggleSound,
  onOpenCharacterSelect,
  onChangeName,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-slate-950/80 border-b border-indigo-900/40 px-3 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
        
        {/* Left: Brand & School Mascot */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sounds.playClick();
              onNavigate('map');
            }}
            className="flex items-center gap-2.5 text-left group hover:opacity-90 transition-opacity"
            title="Kembali ke Peta Galaksi"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-indigo-600 to-purple-600 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <CharacterAvatar characterId={characterId} size="sm" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-game text-base sm:text-lg font-bold bg-gradient-to-r from-amber-300 via-yellow-200 to-sky-300 bg-clip-text text-transparent">
                  Astro Perkalian
                </span>
                <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Kelas 5 SD
                </span>
              </div>
              <p className="text-[11px] text-indigo-300/80 font-semibold hidden sm:block">
                SD Negeri Bakalan 01 Polokarto
              </p>
            </div>
          </button>

          {/* Quick Player Name Badge */}
          <button
            onClick={() => {
              sounds.playClick();
              onChangeName();
            }}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/70 border border-indigo-800/40 hover:border-indigo-600 transition-colors text-xs text-slate-300"
            title="Klik untuk ganti nama pemain"
          >
            <span className="text-slate-400">Pemain:</span>
            <span className="font-bold text-sky-300 max-w-[120px] truncate">{playerName}</span>
            <span className="text-[10px] text-amber-400">✏️</span>
          </button>
        </div>

        {/* Center: Currencies & Badges */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Stars Pill */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-950/60 border border-amber-600/40 text-amber-300 font-bold text-xs sm:text-sm shadow-inner"
            title="Total Bintang Bimasakti"
          >
            <Star className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" />
            <span>{totalStars}</span>
            <span className="text-amber-400/60 text-xs hidden xs:inline">/ 18</span>
          </div>

          {/* Coins Pill */}
          <button
            onClick={() => {
              sounds.playClick();
              onNavigate('shop');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-950/60 border border-yellow-500/40 hover:border-yellow-400 text-yellow-300 font-bold text-xs sm:text-sm transition-transform active:scale-95 shadow-inner group"
            title="Koin Kosmik - Buka Skin Roket di Hangar!"
          >
            <Coins className="w-4 h-4 text-yellow-400 group-hover:rotate-12 transition-transform" />
            <span className="tracking-wide">{coins}</span>
            <span className="text-[10px] text-yellow-400/70 font-semibold uppercase">Koin</span>
          </button>

          {/* Character Quick Changer */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenCharacterSelect();
            }}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-950/70 border border-indigo-700/50 hover:border-indigo-400 text-indigo-200 text-xs font-bold transition-colors"
            title="Pilih Karakter Sekolah Teman Petualang"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Pilih Karakter</span>
          </button>
        </div>

        {/* Right: Navigation Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Time Attack Button */}
          <button
            onClick={() => {
              sounds.playClick();
              onNavigate('timeAttack');
            }}
            className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeView === 'timeAttack'
                ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/30'
                : 'bg-slate-900/80 text-orange-300 border border-orange-500/30 hover:bg-orange-950/40'
            }`}
            title="Mode Lintasan Waktu (Sprint 60 Detik)"
          >
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="hidden sm:inline">Sprint 60s</span>
          </button>

          {/* Rocket Shop Button */}
          <button
            onClick={() => {
              sounds.playClick();
              onNavigate('shop');
            }}
            className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeView === 'shop'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                : 'bg-slate-900/80 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-950/40'
            }`}
            title="Hangar Skin Roket Unik"
          >
            <ShoppingBag className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Hangar Roket</span>
          </button>

          {/* Leaderboard Button */}
          <button
            onClick={() => {
              sounds.playClick();
              onNavigate('leaderboard');
            }}
            className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeView === 'leaderboard'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                : 'bg-slate-900/80 text-purple-300 border border-purple-500/30 hover:bg-purple-950/40'
            }`}
            title="Papan Peringkat Juara"
          >
            <Trophy className="w-4 h-4 text-purple-400" />
            <span className="hidden md:inline">Peringkat</span>
          </button>

          {/* Study Guide (Materi Perkalian Kelas 5) */}
          <button
            onClick={() => {
              sounds.playClick();
              onNavigate('materi');
            }}
            className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeView === 'materi'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                : 'bg-slate-900/80 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-950/40'
            }`}
            title="Buku Rumus & Cara Hitung Kelas 5"
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span className="hidden lg:inline">Buku Rumus</span>
          </button>

          {/* Audio toggle */}
          <button
            onClick={() => {
              sounds.playClick();
              onToggleSound();
            }}
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-700/60 hover:border-slate-500 text-slate-300 hover:text-white transition-colors"
            title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-indigo-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
