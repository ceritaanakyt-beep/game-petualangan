import React, { useState } from 'react';
import { User, X, Check } from 'lucide-react';
import { sounds } from '../utils/audio';

interface ChangeNameModalProps {
  currentName: string;
  onSave: (newName: string) => void;
  onClose: () => void;
}

export const ChangeNameModal: React.FC<ChangeNameModalProps> = ({
  currentName,
  onSave,
  onClose,
}) => {
  const [name, setName] = useState(currentName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      sounds.playClick();
      onSave(name.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-3xl bg-slate-900 border border-indigo-500/40 p-6 shadow-2xl text-slate-100 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-indigo-900/50 pb-3">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-sky-400" />
            <h3 className="font-game text-lg font-bold text-white">Ganti Nama Penjelajah</h3>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Nama Siswa / Panggilan:
            </label>
            <input
              type="text"
              maxLength={24}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Budi - Kelas 5 SD"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-indigo-700 text-white placeholder-slate-500 font-semibold focus:outline-none focus:border-indigo-400"
              autoFocus
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-game font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
            >
              Simpan Nama
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
