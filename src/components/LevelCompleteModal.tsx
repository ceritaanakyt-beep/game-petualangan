import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Star, Coins, ArrowRight, RotateCcw, Trophy, ShoppingBag } from 'lucide-react';
import { CharacterAvatar } from './CharacterAvatar';
import { RocketVisual } from './RocketVisual';
import { sounds } from '../utils/audio';

interface LevelCompleteModalProps {
  modeTitle: string;
  score: number;
  stars: number;
  coinsEarned: number;
  accuracy: number;
  timeTaken: number;
  characterId: string;
  rocketSkinId: string;
  onNext: () => void;
  onReplay: () => void;
  onOpenLeaderboard: () => void;
  onOpenShop: () => void;
}

export const LevelCompleteModal: React.FC<LevelCompleteModalProps> = ({
  modeTitle,
  score,
  stars,
  coinsEarned,
  accuracy,
  timeTaken,
  characterId,
  rocketSkinId,
  onNext,
  onReplay,
  onOpenLeaderboard,
  onOpenShop,
}) => {
  useEffect(() => {
    // Launch celebratory confetti fireworks
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#f59e0b', '#ec4899', '#10b981', '#ffffff'],
      });
    } catch {
      // Confetti error ignored
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-md rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-2xl text-center text-slate-800 flex flex-col items-center">
        
        {/* Glow backdrop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

        {/* Character & Rocket Thumbnail */}
        <div className="relative flex items-center justify-center gap-3 mb-2">
          <CharacterAvatar characterId={characterId} size="lg" showBadge />
          <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-inner">
            <RocketVisual skinId={rocketSkinId} size="sm" isFlying />
          </div>
        </div>

        <span className="text-xs font-extrabold uppercase px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 tracking-wider">
          Misi Berhasil Diselesaikan!
        </span>

        <h2 className="font-game text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 mb-1">
          Luar Biasa, Penjelajah!
        </h2>
        <p className="text-xs font-semibold text-indigo-600 mb-4">{modeTitle}</p>

        {/* Stars display */}
        <div className="flex items-center justify-center gap-2.5 mb-6">
          {[1, 2, 3].map((starIdx) => (
            <div
              key={starIdx}
              className={`p-2 rounded-2xl border transition-all transform ${
                starIdx <= stars
                  ? 'bg-amber-100 border-amber-400 scale-110 shadow-md shadow-amber-500/20'
                  : 'bg-slate-100 border-slate-200 scale-95 opacity-50'
              }`}
            >
              <Star
                className={`w-7 h-7 ${
                  starIdx <= stars
                    ? 'fill-amber-400 text-amber-500 animate-pulse'
                    : 'text-slate-300'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2.5 w-full mb-5 text-left">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[11px] text-slate-500 font-semibold block">Total Skor</span>
            <span className="font-game text-xl font-black text-indigo-950">{score}</span>
          </div>

          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-amber-700 font-semibold block">Koin Diperoleh</span>
              <span className="font-game text-xl font-black text-amber-900">+{coinsEarned}</span>
            </div>
            <Coins className="w-6 h-6 text-yellow-600 shrink-0" />
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
            <span className="text-[11px] text-emerald-700 font-semibold block">Akurasi Hitung</span>
            <span className="font-game text-xl font-black text-emerald-800">{accuracy}%</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[11px] text-slate-500 font-semibold block">Waktu Selesai</span>
            <span className="font-game text-xl font-black text-indigo-900">{timeTaken} detik</span>
          </div>
        </div>

        {/* Mascot Congratulation Quote */}
        <div className="w-full p-3.5 rounded-2xl bg-indigo-50/90 border border-indigo-100 text-xs text-slate-700 mb-6 italic text-left">
          &ldquo;Hebat! Perhitungan matematikamu semakin tajam. Terus kumpulkan koin kosmik untuk membuka skin roket legendaris di hangar!&rdquo;
          <span className="text-[10px] text-indigo-800 font-bold block mt-1 not-italic">
            — Satria Bakalan 01 Polokarto
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5 w-full">
          <button
            onClick={() => {
              sounds.playClick();
              onNext();
            }}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 font-game text-base font-bold text-white shadow-md shadow-indigo-600/25 active:scale-95 transition-all"
          >
            <span>Lanjut ke Galaksi</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-3 gap-2 w-full">
            <button
              onClick={() => {
                sounds.playClick();
                onReplay();
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-bold transition-colors"
              title="Mainkan Ulang Sektor Ini"
            >
              <RotateCcw className="w-4 h-4 text-slate-600" />
              <span>Ulang</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onOpenShop();
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold transition-colors"
              title="Kunjungi Toko Skin Roket"
            >
              <ShoppingBag className="w-4 h-4 text-amber-600" />
              <span>Hangar</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onOpenLeaderboard();
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-800 text-xs font-bold transition-colors"
              title="Lihat Papan Peringkat"
            >
              <Trophy className="w-4 h-4 text-indigo-600" />
              <span>Peringkat</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
