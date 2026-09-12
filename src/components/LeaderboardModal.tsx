import React, { useState } from 'react';
import { LeaderboardEntry } from '../types';
import { CharacterAvatar } from './CharacterAvatar';
import { RocketVisual } from './RocketVisual';
import { sounds } from '../utils/audio';
import { Trophy, Medal, Star, Clock, ArrowLeft, Target, Sparkles, UserCheck } from 'lucide-react';

interface LeaderboardModalProps {
  entries: LeaderboardEntry[];
  currentPlayerName: string;
  onBack: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  entries,
  currentPlayerName,
  onBack,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'adventure' | 'sprint'>('all');

  const filteredEntries = entries.filter((e) => {
    if (filterMode === 'sprint') return e.mode.includes('Sprint');
    if (filterMode === 'adventure') return !e.mode.includes('Sprint');
    return true;
  });

  const sortedEntries = [...filteredEntries].sort((a, b) => b.score - a.score);

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/40 text-sm">
            🥇
          </div>
        );
      case 2:
        return (
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-300 to-slate-500 flex items-center justify-center text-slate-950 font-black shadow-md text-sm">
            🥈
          </div>
        );
      case 3:
        return (
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-700 to-amber-900 flex items-center justify-center text-amber-200 font-black shadow-md text-sm">
            🥉
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 font-bold text-xs">
            #{rank}
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 py-6 text-slate-100 flex flex-col gap-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900/90 border border-indigo-800/50 backdrop-blur-md shadow-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sounds.playClick();
              onBack();
            }}
            className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-game text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <Trophy className="w-6 h-6 text-amber-400" />
                Papan Peringkat Kosmis
              </h1>
            </div>
            <p className="text-xs text-slate-300">
              Peringkat penjelajah matematika terbaik SD Negeri Bakalan 01 Polokarto!
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950 border border-indigo-900/60">
          <button
            onClick={() => {
              sounds.playClick();
              setFilterMode('all');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterMode === 'all'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Semua
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              setFilterMode('adventure');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterMode === 'adventure'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sektor Galaksi
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              setFilterMode('sprint');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterMode === 'sprint'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sprint 60s
          </button>
        </div>
      </div>

      {/* Top 3 Podium Cards (if enough entries) */}
      {sortedEntries.length >= 3 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* 2nd Place */}
          <div className="order-2 sm:order-1 rounded-2xl bg-slate-900/80 border border-slate-700/60 p-4 text-center flex flex-col items-center justify-between">
            <span className="text-2xl mb-1">🥈</span>
            <div className="relative mb-2">
              <CharacterAvatar characterId={sortedEntries[1].characterId} size="md" />
            </div>
            <h4 className="font-game text-base font-bold text-white max-w-[140px] truncate">
              {sortedEntries[1].playerName}
            </h4>
            <span className="text-xs text-indigo-300 font-semibold">{sortedEntries[1].mode}</span>
            <div className="mt-2 text-amber-300 font-game font-black text-lg">
              {sortedEntries[1].score} Poin
            </div>
          </div>

          {/* 1st Place Champion */}
          <div className="order-1 sm:order-2 rounded-3xl bg-gradient-to-b from-amber-950/60 via-slate-900 to-slate-950 border border-amber-500/60 p-5 text-center flex flex-col items-center justify-between shadow-xl shadow-amber-500/10 scale-105">
            <span className="text-3xl mb-1">🥇</span>
            <div className="relative mb-2">
              <CharacterAvatar characterId={sortedEntries[0].characterId} size="lg" showBadge />
              <div className="absolute -bottom-2 bg-amber-400 text-slate-950 text-[10px] font-black px-2 rounded-full uppercase">
                Juara 1
              </div>
            </div>
            <h3 className="font-game text-lg font-black text-white max-w-[160px] truncate">
              {sortedEntries[0].playerName}
            </h3>
            <span className="text-xs text-amber-300 font-bold">{sortedEntries[0].mode}</span>
            <div className="mt-2 text-yellow-300 font-game font-black text-2xl">
              {sortedEntries[0].score} Poin
            </div>
          </div>

          {/* 3rd Place */}
          <div className="order-3 sm:order-3 rounded-2xl bg-slate-900/80 border border-amber-900/50 p-4 text-center flex flex-col items-center justify-between">
            <span className="text-2xl mb-1">🥉</span>
            <div className="relative mb-2">
              <CharacterAvatar characterId={sortedEntries[2].characterId} size="md" />
            </div>
            <h4 className="font-game text-base font-bold text-white max-w-[140px] truncate">
              {sortedEntries[2].playerName}
            </h4>
            <span className="text-xs text-indigo-300 font-semibold">{sortedEntries[2].mode}</span>
            <div className="mt-2 text-amber-300 font-game font-black text-lg">
              {sortedEntries[2].score} Poin
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Table List */}
      <div className="rounded-3xl bg-slate-900/90 border border-indigo-800/40 p-4 sm:p-6 shadow-2xl flex flex-col gap-3">
        <div className="flex items-center justify-between px-2 text-xs font-semibold text-slate-400 border-b border-indigo-900/40 pb-2">
          <span>Peringkat & Pemain</span>
          <div className="flex items-center gap-8 pr-2">
            <span className="hidden sm:inline">Akurasi & Waktu</span>
            <span>Total Skor</span>
          </div>
        </div>

        {sortedEntries.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-sm">
            Belum ada catatan skor untuk kategori ini. Ayo mainkan tantangan sekarang!
          </div>
        ) : (
          sortedEntries.map((entry, idx) => {
            const rank = idx + 1;
            const isMe = entry.playerName.toLowerCase() === currentPlayerName.toLowerCase();

            return (
              <div
                key={entry.id || idx}
                className={`flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border transition-all ${
                  isMe
                    ? 'bg-indigo-950/90 border-indigo-400 shadow-md scale-[1.01]'
                    : 'bg-slate-950/60 border-indigo-950/60 hover:border-indigo-800/50'
                }`}
              >
                {/* Left: Rank badge, Avatar, Name & Mode */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="shrink-0">{getRankBadge(rank)}</div>

                  <div className="shrink-0">
                    <CharacterAvatar characterId={entry.characterId} size="sm" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-game text-sm sm:text-base font-bold text-white truncate max-w-[150px] sm:max-w-[200px]">
                        {entry.playerName}
                      </span>
                      {isMe && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-800 text-sky-200">
                          Kamu
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 truncate block">
                      {entry.mode}
                    </span>
                  </div>
                </div>

                {/* Right: Accuracy, Time, and Score */}
                <div className="flex items-center gap-4 sm:gap-8 shrink-0">
                  <div className="hidden sm:flex flex-col items-end text-xs text-slate-400">
                    <span className="text-emerald-400 font-bold">{entry.accuracy}% Akurasi</span>
                    <span>{entry.timeSeconds}s</span>
                  </div>

                  <div className="text-right">
                    <span className="font-game text-base sm:text-lg font-black text-amber-300">
                      {entry.score}
                    </span>
                    <span className="text-[10px] text-amber-400/80 block leading-none">Poin</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
