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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-7 shadow-2xl text-slate-800 flex flex-col gap-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200">
              <School className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-game text-xl font-bold text-slate-900">
                Pilih Karakter Sekolah Teman Petualang
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Pilih karakter pelajar atau maskot SD Negeri Bakalan 01 sebagai pilot roketmu!
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
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
                    ? 'bg-indigo-50/90 border-2 border-indigo-500 shadow-md scale-[1.02]'
                    : 'bg-white border-slate-200/90 hover:border-indigo-300 hover:bg-slate-50 shadow-xs'
                }`}
              >
                <div className="flex items-start gap-3">
                  <CharacterAvatar characterId={char.id} size="md" showBadge />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="font-game text-base font-bold text-slate-900 leading-tight truncate">
                        {char.name}
                      </h3>
                      {isSelected && (
                        <span className="p-1 rounded-full bg-emerald-500 text-white shadow-xs">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-bold text-amber-700 block mt-0.5">
                      {char.role}
                    </span>
                    {char.schoolName && (
                      <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                        {char.schoolName}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-700 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  &ldquo;{char.quote}&rdquo;
                </p>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                  <span className="text-[11px] text-slate-500 font-medium">Lencana: {char.badge}</span>
                  <span className="text-indigo-600 font-bold text-xs">
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
