import React, { useState } from 'react';
import { LEVEL_SECTORS } from '../data/gameData';
import { LevelSector, PlayerProgress } from '../types';
import { RocketVisual } from './RocketVisual';
import { CharacterAvatar } from './CharacterAvatar';
import { Star, Lock, Play, Award, CheckCircle2, ChevronRight, Sparkles, Flame } from 'lucide-react';
import { sounds } from '../utils/audio';

interface GalaxyMapProps {
  progress: PlayerProgress;
  onSelectSector: (sector: LevelSector) => void;
  onStartSprint: () => void;
  onOpenShop: () => void;
}

export const GalaxyMap: React.FC<GalaxyMapProps> = ({
  progress,
  onSelectSector,
  onStartSprint,
  onOpenShop,
}) => {
  const totalStars = Object.keys(progress.completedLevels).reduce((acc, key) => {
    return acc + (progress.completedLevels[key]?.stars || 0);
  }, 0);

  // Default active sector is the highest unlocked or currently selected
  const [activeSectorId, setActiveSectorId] = useState<string>('sector_1');

  const selectedSector =
    LEVEL_SECTORS.find((s) => s.id === activeSectorId) || LEVEL_SECTORS[0];

  const isSectorUnlocked = (sector: LevelSector): boolean => {
    return Number(totalStars) >= sector.requiredStars;
  };

  const getPlanetVisual = (sector: LevelSector) => {
    switch (sector.planetType) {
      case 'earth':
        return 'bg-gradient-to-br from-blue-400 via-sky-500 to-indigo-700 shadow-blue-500/40';
      case 'moon':
        return 'bg-gradient-to-br from-amber-600 via-stone-500 to-stone-700 shadow-amber-500/30';
      case 'mars':
        return 'bg-gradient-to-br from-rose-500 via-red-600 to-amber-800 shadow-red-500/40';
      case 'saturn':
        return 'bg-gradient-to-br from-cyan-300 via-teal-500 to-blue-800 shadow-cyan-500/40';
      case 'neptune':
        return 'bg-gradient-to-br from-purple-500 via-indigo-600 to-slate-900 shadow-purple-500/40';
      case 'sun':
        return 'bg-gradient-to-br from-yellow-300 via-amber-500 to-red-600 shadow-yellow-500/50';
      default:
        return 'bg-gradient-to-br from-blue-500 to-purple-600';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-6 text-slate-100 flex flex-col gap-8">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-700/40 p-5 sm:p-7 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="relative">
              <CharacterAvatar characterId={progress.selectedCharacterId} size="lg" showBadge />
              <div className="absolute -bottom-2 -left-2 bg-amber-500/90 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                Kapten
              </div>
            </div>
            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-indigo-800/80 text-indigo-200 border border-indigo-600/50">
                  Misi Matematika SD Bakalan 01
                </span>
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {totalStars} Bintang Terkumpul
                </span>
              </div>
              <h1 className="font-game text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-1">
                Jelajahi Galaksi Perkalian Bilangan Bulat
              </h1>
              <p className="text-sm text-slate-300 max-w-xl">
                Luncurkan roketmu melewati 6 zona antariksa! Selesaikan tantangan perkalian bersusun, trik puluhan, aturan tanda negatif, dan soal cerita kosmik.
              </p>
            </div>
          </div>

          {/* Quick Action Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={() => {
                sounds.playClick();
                onStartSprint();
              }}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 font-bold text-sm text-white shadow-lg shadow-orange-600/30 active:scale-95 transition-all"
            >
              <Flame className="w-5 h-5" />
              <span>Sprint 60 Detik</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                onOpenShop();
              }}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 font-bold text-sm text-cyan-300 hover:text-white shadow-lg active:scale-95 transition-all"
            >
              <RocketVisual skinId={progress.selectedRocketId} size="sm" isFlying />
              <span>Ganti Skin Roket</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Planetary Sector Map & Selected Sector Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Planetary Trail (8 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="font-game text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Peta Sektor Galaksi
            </h2>
            <span className="text-xs text-indigo-300">Pilih planet untuk memulai misi</span>
          </div>

          <div className="relative flex flex-col gap-3.5">
            {LEVEL_SECTORS.map((sector, index) => {
              const unlocked = isSectorUnlocked(sector);
              const levelData = progress.completedLevels[sector.id];
              const stars = levelData?.stars || 0;
              const isSelected = activeSectorId === sector.id;

              return (
                <div
                  key={sector.id}
                  onClick={() => {
                    sounds.playClick();
                    setActiveSectorId(sector.id);
                  }}
                  className={`relative cursor-pointer rounded-2xl p-4 transition-all duration-200 border ${
                    isSelected
                      ? 'bg-indigo-950/80 border-indigo-400 shadow-xl shadow-indigo-500/20 scale-[1.01]'
                      : unlocked
                      ? 'bg-slate-900/80 border-indigo-900/40 hover:border-indigo-700 hover:bg-slate-900'
                      : 'bg-slate-950/60 border-slate-800/40 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    {/* Planet Sphere & Number */}
                    <div className="flex items-center gap-3.5">
                      <div className="relative">
                        <div
                          className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg ${getPlanetVisual(
                            sector
                          )}`}
                        >
                          {sector.planetType === 'saturn' && (
                            <div className="absolute inset-0 -m-1.5 rounded-full border-2 border-cyan-200/50 rotate-45 pointer-events-none" />
                          )}
                          {!unlocked ? (
                            <Lock className="w-5 h-5 text-slate-300 drop-shadow" />
                          ) : (
                            <span className="font-game text-lg font-black drop-shadow">
                              {sector.sectorNumber}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Sector Info */}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-indigo-300">
                            Sektor {sector.sectorNumber}
                          </span>
                          <span className="text-[11px] text-slate-400">• {sector.planetName}</span>
                        </div>
                        <h3 className="font-game text-base font-bold text-white leading-tight">
                          {sector.name}
                        </h3>
                        <p className="text-xs text-amber-300/90 font-medium">
                          {sector.topic}
                        </p>
                      </div>
                    </div>

                    {/* Right status: Stars or Lock */}
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      {unlocked ? (
                        <div className="flex items-center gap-1">
                          {[1, 2, 3].map((starIdx) => (
                            <Star
                              key={starIdx}
                              className={`w-4 h-4 ${
                                starIdx <= stars
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-slate-700'
                              }`}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-xs text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-800/40">
                          <Lock className="w-3 h-3" />
                          <span>Butuh {sector.requiredStars} ⭐</span>
                        </div>
                      )}

                      {levelData && levelData.highScore > 0 && (
                        <span className="text-[11px] font-semibold text-emerald-400">
                          Skor: {levelData.highScore}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Sector Launchpad Details (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="px-1">
            <h2 className="font-game text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-400" />
              Rencana Misi Roket
            </h2>
          </div>

          <div className="sticky top-20 rounded-3xl bg-gradient-to-b from-indigo-950/90 to-slate-950/95 border border-indigo-600/40 p-6 shadow-2xl flex flex-col gap-5">
            
            {/* Header with Planet Badge & Selected Rocket Preview */}
            <div className="flex items-center justify-between gap-4 border-b border-indigo-900/50 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-800/60 text-indigo-200 border border-indigo-600/40">
                  Target Sektor {selectedSector.sectorNumber}
                </span>
                <h3 className="font-game text-xl font-extrabold text-white mt-1">
                  {selectedSector.name}
                </h3>
                <p className="text-xs text-amber-300 font-semibold">{selectedSector.subtitle}</p>
              </div>

              <div className="text-center shrink-0">
                <RocketVisual skinId={progress.selectedRocketId} size="md" isFlying />
                <span className="text-[10px] text-slate-300 font-semibold block mt-1">
                  Roket Siap Luncur
                </span>
              </div>
            </div>

            {/* Description & Learning Objective */}
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3 rounded-2xl bg-indigo-900/30 border border-indigo-800/40 text-slate-200">
                <p className="leading-relaxed">{selectedSector.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-indigo-900/40">
                  <span className="text-slate-400 block text-[11px]">Cakupan Perkalian:</span>
                  <span className="font-bold text-sky-300">{selectedSector.multiplierRange}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-indigo-900/40">
                  <span className="text-slate-400 block text-[11px]">Hadiah Koin:</span>
                  <span className="font-bold text-amber-300">+{selectedSector.coinsReward} Koin</span>
                </div>
              </div>
            </div>

            {/* Stats if already played */}
            {progress.completedLevels[selectedSector.id] && (
              <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-200 font-bold">Misi Pernah Diselesaikan</span>
                </div>
                <span className="font-extrabold text-amber-300">
                  Skor Terbaik: {progress.completedLevels[selectedSector.id].highScore}
                </span>
              </div>
            )}

            {/* Launch Button */}
            {isSectorUnlocked(selectedSector) ? (
              <button
                onClick={() => {
                  sounds.playRocket();
                  onSelectSector(selectedSector);
                }}
                className="w-full group flex items-center justify-center gap-3 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-game text-lg font-bold shadow-xl shadow-indigo-600/30 active:scale-98 transition-all"
              >
                <Play className="w-5 h-5 fill-white" />
                <span>Luncurkan Misi Sekarang!</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <div className="w-full py-3.5 px-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 text-slate-400 text-center text-sm font-semibold flex items-center justify-center gap-2">
                <Lock className="w-4 h-4 text-amber-400" />
                <span>
                  Kumpulkan {selectedSector.requiredStars} Bintang untuk Membuka Sektor Ini!
                </span>
              </div>
            )}

            {/* Mascot Advice */}
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-indigo-950/50 border border-indigo-800/40 text-xs">
              <CharacterAvatar characterId={progress.selectedCharacterId} size="sm" />
              <div>
                <p className="text-indigo-200 italic leading-snug">
                  &ldquo;Kerjakan dengan teliti! Teliti perkalian tanda positif & negatif, serta langkah susunnya.&rdquo;
                </p>
                <span className="text-[10px] text-amber-300 font-bold mt-1 block">
                  — Pesan Maskot SD Negeri Bakalan 01
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
