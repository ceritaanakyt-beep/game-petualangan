import React, { useState } from 'react';
import { ROCKET_SKINS } from '../data/gameData';
import { RocketSkin, PlayerProgress } from '../types';
import { RocketVisual } from './RocketVisual';
import { sounds } from '../utils/audio';
import { Coins, Check, Lock, Sparkles, ArrowLeft, ShieldCheck, Flame, Zap } from 'lucide-react';

interface RocketHangarProps {
  progress: PlayerProgress;
  onEquipSkin: (skinId: string) => void;
  onBuySkin: (skinId: string, price: number) => void;
  onBack: () => void;
}

export const RocketHangar: React.FC<RocketHangarProps> = ({
  progress,
  onEquipSkin,
  onBuySkin,
  onBack,
}) => {
  const [selectedSkinId, setSelectedSkinId] = useState<string>(progress.selectedRocketId);

  const selectedSkin: RocketSkin =
    ROCKET_SKINS.find((s) => s.id === selectedSkinId) || ROCKET_SKINS[0];

  const isUnlocked = progress.unlockedRocketIds.includes(selectedSkin.id);
  const isEquipped = progress.selectedRocketId === selectedSkin.id;
  const canAfford = progress.coins >= selectedSkin.price;

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'Legendaris':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Epik':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Langka':
        return 'bg-sky-100 text-sky-800 border-sky-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-6 text-slate-800 flex flex-col gap-6">
      
      {/* Header with Coins Balance */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-3xl bg-white/95 border border-slate-200/90 backdrop-blur-md shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sounds.playClick();
              onBack();
            }}
            className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-game text-xl sm:text-2xl font-black text-slate-900">
                Hangar Roket Antariksa
              </h1>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200">
                Skin Kustom
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Gunakan koin kosmik hasil perkalian untuk membuka skin roket unik!
            </p>
          </div>
        </div>

        {/* Current Coins Wallet */}
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-amber-50 border border-amber-300 shadow-xs">
          <Coins className="w-6 h-6 text-yellow-600 animate-spin" style={{ animationDuration: '6s' }} />
          <div className="text-right">
            <span className="text-[10px] text-amber-700 font-bold uppercase block leading-none">
              Saldo Koin Kamu
            </span>
            <span className="font-game text-xl font-black text-amber-900 leading-tight">
              {progress.coins} Koin
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Skin Showcase (Left) & Skin Catalog Grid (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Big Preview & Action (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xl flex flex-col items-center text-center">
            
            {/* Rarity & Special Crest */}
            <div className="flex items-center justify-between w-full mb-3">
              <span
                className={`text-[11px] font-extrabold uppercase px-3 py-1 rounded-full border ${getRarityBadge(
                  selectedSkin.rarity
                )}`}
              >
                {selectedSkin.rarity}
              </span>
              {selectedSkin.id === 'rocket_satria_bakalan' && (
                <span className="flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                  Edisi SD Bakalan 01
                </span>
              )}
            </div>

            {/* Big 3D-feel Animated Rocket Display Stage */}
            <div className="relative w-full h-64 rounded-2xl bg-gradient-to-b from-slate-50 via-sky-50 to-indigo-50/40 border border-slate-200 flex flex-col items-center justify-center overflow-hidden my-2">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
              <div className="relative z-10 scale-125">
                <RocketVisual skinId={selectedSkin.id} size="lg" isFlying />
              </div>
              {/* Launch Pad Base */}
              <div className="absolute bottom-2 w-36 h-2 rounded-full bg-indigo-300/40 blur-sm" />
            </div>

            {/* Name & Description */}
            <h2 className="font-game text-2xl font-black text-slate-900 mt-3">
              {selectedSkin.name}
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-sm leading-relaxed font-medium">
              {selectedSkin.description}
            </p>

            {/* Thruster Specs */}
            <div className="grid grid-cols-2 gap-2 w-full mt-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2 text-left">
                <Flame className="w-4 h-4 text-orange-500 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-500 font-semibold block">Tipe Pendorong:</span>
                  <span className="font-bold text-indigo-700 capitalize">{selectedSkin.flameType}</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2 text-left">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-500 font-semibold block">Efek Visual:</span>
                  <span className="font-bold text-amber-700">Partikel Bercahaya</span>
                </div>
              </div>
            </div>

            {/* Action: Equip or Buy Button */}
            <div className="w-full mt-6">
              {isEquipped ? (
                <div className="w-full py-3.5 px-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 font-game text-base font-bold flex items-center justify-center gap-2 shadow-xs">
                  <Check className="w-5 h-5 text-emerald-600" />
                  <span>Sedang Dipakai Saat Misi</span>
                </div>
              ) : isUnlocked ? (
                <button
                  onClick={() => {
                    sounds.playRocket();
                    onEquipSkin(selectedSkin.id);
                  }}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-game text-base font-bold shadow-md shadow-indigo-600/25 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Pasang Roket Ini</span>
                </button>
              ) : canAfford ? (
                <button
                  onClick={() => {
                    sounds.playCoin();
                    onBuySkin(selectedSkin.id, selectedSkin.price);
                  }}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-900 font-game text-base font-black shadow-md shadow-yellow-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Coins className="w-5 h-5 fill-current text-slate-900" />
                  <span>Buka Skin ({selectedSkin.price} Koin)</span>
                </button>
              ) : (
                <div className="w-full py-3.5 px-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4 text-amber-600" />
                  <span>
                    Butuh {selectedSkin.price - progress.coins} Koin Lagi ({selectedSkin.price} Koin)
                  </span>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Right: Skin Selection Catalog (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-game text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              Koleksi Skin Roket
            </h3>
            <span className="text-xs text-indigo-600 font-semibold">
              Terbuka: {progress.unlockedRocketIds.length} / {ROCKET_SKINS.length}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {ROCKET_SKINS.map((skin) => {
              const unlocked = progress.unlockedRocketIds.includes(skin.id);
              const equipped = progress.selectedRocketId === skin.id;
              const isSelected = selectedSkinId === skin.id;

              return (
                <div
                  key={skin.id}
                  onClick={() => {
                    sounds.playClick();
                    setSelectedSkinId(skin.id);
                  }}
                  className={`cursor-pointer rounded-2xl p-4 border transition-all duration-200 flex flex-col justify-between gap-3 ${
                    isSelected
                      ? 'bg-indigo-50/90 border-2 border-indigo-500 shadow-md scale-[1.02]'
                      : unlocked
                      ? 'bg-white border-slate-200/90 hover:border-indigo-300 hover:bg-slate-50 shadow-xs'
                      : 'bg-slate-100/70 border-slate-200 opacity-75'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${getRarityBadge(
                          skin.rarity
                        )}`}
                      >
                        {skin.rarity}
                      </span>
                      <h4 className="font-game text-base font-bold text-slate-900 mt-1 leading-tight">
                        {skin.name}
                      </h4>
                    </div>

                    {equipped && (
                      <span className="p-1 rounded-full bg-emerald-500 text-white font-bold shadow-xs">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                    {!unlocked && (
                      <span className="p-1 rounded-full bg-slate-200 text-amber-700">
                        <Lock className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>

                  {/* Thumbnail */}
                  <div className="h-28 flex items-center justify-center bg-slate-50 rounded-xl p-2 border border-slate-200/80">
                    <RocketVisual skinId={skin.id} size="sm" isFlying={isSelected} />
                  </div>

                  {/* Footer status or price */}
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                    {unlocked ? (
                      <span className="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Dimiliki
                      </span>
                    ) : (
                      <span className="text-amber-700 font-bold text-xs flex items-center gap-1">
                        <Coins className="w-3.5 h-3.5 text-yellow-600" />
                        {skin.price} Koin
                      </span>
                    )}
                    <span className="text-[11px] text-indigo-600 font-bold">
                      {isSelected ? 'Terpilih' : 'Klik Detail'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
