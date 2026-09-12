import React from 'react';
import { SCHOOL_CHARACTERS } from '../data/gameData';
import { CharacterAvatar } from './CharacterAvatar';
import { sounds } from '../utils/audio';
import { Check, X, Sparkles, School } from 'lucide-react';

interface CharacterSelectModalProps {
  selectedCharacterId: string;
  onSelectCharacter: (id: string) => void;
  onClose: () => void;
}

export const CharacterSelectModal: React.FC<CharacterSelectModalProps> = ({
  selectedCharacterId,
  onSelectCharacter,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-indigo-500/40 p-5 sm:p-7 shadow-2xl text-slate-100 flex flex-col gap-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-indigo-900/50 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-800">
              <School className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-game text-xl font-bold text-white">
                Pilih Karakter Sekolah Teman Petualang
              </h2>
              <p className="text-xs text-slate-300">
                Pilih karakter pelajar atau maskot SD Negeri Bakalan 01 sebagai pilot roketmu!
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Character Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[60vh] overflow-y-auto pr-1">
          {SCHOOL_CHARACTERS.map((char) => {
            const isSelected = selectedCharacterId === char.id;

            return (
              <div
                key={char.id}
                onClick={() => {
                  sounds.playClick();
                  onSelectCharacter(char.id);
                  onClose();
                }}
                className={`cursor-pointer rounded-2xl p-4 border transition-all duration-200 flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'bg-indigo-950/90 border-indigo-400 shadow-xl shadow-indigo-500/20 scale-[1.02]'
                    : 'bg-slate-950/70 border-indigo-950 hover:border-indigo-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-start gap-3">
                  <CharacterAvatar characterId={char.id} size="md" showBadge />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="font-game text-base font-bold text-white leading-tight truncate">
                        {char.name}
                      </h3>
                      {isSelected && (
                        <span className="p-1 rounded-full bg-emerald-500 text-slate-950">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-semibold text-amber-300 block mt-0.5">
                      {char.role}
                    </span>
                    {char.schoolName && (
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {char.schoolName}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-indigo-200/90 italic bg-indigo-950/40 p-2.5 rounded-xl border border-indigo-900/30">
                  &ldquo;{char.quote}&rdquo;
                </p>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-indigo-900/40">
                  <span className="text-[11px] text-slate-400 font-medium">Lencana: {char.badge}</span>
                  <span className="text-indigo-400 font-bold text-xs">
                    {isSelected ? 'Sedang Digunakan' : 'Pilih Karakter'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
