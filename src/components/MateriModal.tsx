import React, { useState } from 'react';
import { BookOpen, X, Sparkles, Check, Calculator, ArrowRight } from 'lucide-react';
import { sounds } from '../utils/audio';

interface MateriModalProps {
  onClose: () => void;
}

export const MateriModal: React.FC<MateriModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'hukumTanda' | 'susun' | 'trikNol' | 'kalkulator'>('hukumTanda');

  // Interactive tester inside study guide
  const [testA, setTestA] = useState<number>(-8);
  const [testB, setTestB] = useState<number>(12);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-7 shadow-2xl text-slate-800 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-game text-xl sm:text-2xl font-black text-slate-900">
                Buku Rumus Matematika Kelas 5
              </h2>
              <p className="text-xs text-emerald-700 font-bold">
                Pedoman Belajar Perkalian Bilangan Bulat SD Negeri Bakalan 01 Polokarto
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

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-2">
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('hukumTanda');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'hukumTanda'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            1. Hukum Tanda (+ & -)
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('susun');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'susun'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            2. Perkalian Bersusun
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('trikNol');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'trikNol'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            3. Trik Kelipatan 10
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('kalkulator');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'kalkulator'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            4. Laboratorium Uji Coba
          </button>
        </div>

        {/* Tab 1: Hukum Tanda (+ & -) */}
        {activeTab === 'hukumTanda' && (
          <div className="space-y-4 text-sm leading-relaxed animate-in fade-in">
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100">
              <h3 className="font-game text-base font-bold text-indigo-950 mb-2">
                Prinsip Utama Tanda Perkalian Bilangan Bulat:
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 mb-3">
                Aturan mudah yang harus selalu diingat: Jika kedua tanda <strong>SAMA</strong>, hasilnya <strong>POSITIF (+)</strong>. Jika kedua tanda <strong>BERBEDA</strong>, hasilnya <strong>NEGATIF (-)</strong>!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-emerald-900">
                  <span className="font-bold text-emerald-800">(+) × (+) = (+)</span>
                  <span className="text-emerald-700">Contoh: 6 × 7 = +42</span>
                </div>
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between text-rose-900">
                  <span className="font-bold text-rose-800">(+) × (-) = (-)</span>
                  <span className="text-rose-700">Contoh: 6 × (-7) = -42</span>
                </div>
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between text-rose-900">
                  <span className="font-bold text-rose-800">(-) × (+) = (-)</span>
                  <span className="text-rose-700">Contoh: (-8) × 5 = -40</span>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-emerald-900">
                  <span className="font-bold text-emerald-800">(-) × (-) = (+)</span>
                  <span className="text-emerald-700">Contoh: (-6) × (-8) = +48</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-game text-sm font-bold text-indigo-900 mb-1">
                Mengapa Negatif dikali Negatif menjadi Positif?
              </h4>
              <p className="text-xs text-slate-600 leading-normal">
                Bayangkan roket bergerak mundur (negatif). Jika sensor roket memutar balik arah mundur tersebut (negatif lagi), maka arah roket akan berbalik maju ke depan (positif)! Oleh karena itu, <code>(-a) × (-b) = +(a × b)</code>.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Perkalian Bersusun */}
        {activeTab === 'susun' && (
          <div className="space-y-4 text-sm animate-in fade-in">
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100">
              <h3 className="font-game text-base font-bold text-indigo-950 mb-2">
                Langkah Perkalian Bersusun 2 Digit (Contoh: 34 × 26)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="font-mono bg-white p-4 rounded-xl border border-slate-200 text-slate-900 flex flex-col items-center justify-center leading-loose shadow-inner">
                  <div className="text-right w-24">
                    <div>  34</div>
                    <div>× 26</div>
                    <div className="border-b border-slate-300 my-1"></div>
                    <div className="text-indigo-700 font-bold"> 204  <span className="text-[10px] text-slate-500 font-normal">(34 × 6)</span></div>
                    <div className="text-emerald-700 font-bold">680  <span className="text-[10px] text-slate-500 font-normal">(34 × 20)</span></div>
                    <div className="border-b border-slate-300 my-1"></div>
                    <div className="text-slate-900 font-black text-base">884</div>
                  </div>
                </div>

                <div className="space-y-2 text-slate-700">
                  <p><strong>Langkah 1:</strong> Kalikan 34 dengan angka satuan (6):</p>
                  <p className="text-xs text-slate-600 pl-3">• 4 × 6 = 24 (tulis 4, simpan 2)</p>
                  <p className="text-xs text-slate-600 pl-3">• 3 × 6 = 18 + simpanan 2 = 20 &rarr; Hasil baris 1: <strong className="text-indigo-800">204</strong></p>
                  
                  <p><strong>Langkah 2:</strong> Kalikan 34 dengan angka puluhan (20):</p>
                  <p className="text-xs text-slate-600 pl-3">• 34 × 20 = <strong className="text-emerald-800">680</strong> (geser satu tempat ke kiri)</p>

                  <p><strong>Langkah 3:</strong> Jumlahkan kedua baris:</p>
                  <p className="text-xs text-slate-900 font-bold pl-3">• 204 + 680 = <strong className="text-amber-700">884</strong></p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Trik Kelipatan 10 */}
        {activeTab === 'trikNol' && (
          <div className="space-y-4 text-sm animate-in fade-in">
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100">
              <h3 className="font-game text-base font-bold text-amber-800 mb-2">
                Trik Kilat: Menghitung Perkalian Puluhan & Ratusan
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 mb-3">
                Jika mengalikan bilangan yang memiliki angka nol di belakangnya, jangan bingung!
              </p>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <span className="font-bold text-indigo-700 block mb-1">Trik 1: Hitung nol yang ada</span>
                  <p className="text-slate-600">
                    Contoh: <strong>40 × 70</strong><br />
                    1. Kalikan angka selain nol: <code>4 × 7 = 28</code><br />
                    2. Ada berapa angka nol? Ada 2 buah nol (satu di 40, satu di 70)<br />
                    3. Tempelkan 2 nol tersebut di belakang 28 &rarr; <strong className="text-indigo-800">2.800</strong>!
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <span className="font-bold text-amber-800 block mb-1">Trik 2: Angka 25 dan 50</span>
                  <p className="text-slate-600">
                    • 25 × 4 = 100<br />
                    • 25 × 8 = 200 (karena 8 adalah 4 × 2)<br />
                    • 50 × 6 = (50 × 2) × 3 = 100 × 3 = 300!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Laboratorium Uji Coba */}
        {activeTab === 'kalkulator' && (
          <div className="space-y-4 text-sm animate-in fade-in">
            <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-center">
              <h3 className="font-game text-base font-bold text-indigo-950 mb-3">
                Simulator Perkalian Bilangan Bulat Interaktif
              </h3>
              <p className="text-xs text-slate-600 mb-4">
                Ubah bilangan di bawah ini untuk melihat hasil serta aturan tanda yang berlaku:
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 font-game text-xl">
                <input
                  type="number"
                  value={testA}
                  onChange={(e) => setTestA(parseInt(e.target.value) || 0)}
                  className="w-24 p-2.5 rounded-xl bg-white border-2 border-indigo-300 text-center text-indigo-950 font-bold shadow-xs focus:outline-none focus:border-indigo-600"
                />
                <span className="text-amber-500 text-2xl font-black">×</span>
                <input
                  type="number"
                  value={testB}
                  onChange={(e) => setTestB(parseInt(e.target.value) || 0)}
                  className="w-24 p-2.5 rounded-xl bg-white border-2 border-indigo-300 text-center text-indigo-950 font-bold shadow-xs focus:outline-none focus:border-indigo-600"
                />
                <span className="text-slate-400 text-2xl font-black">=</span>
                <span className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-black shadow-xs">
                  {testA * testB}
                </span>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 max-w-md mx-auto">
                <strong className="text-emerald-700">Analisis Tanda: </strong>
                {testA >= 0 && testB >= 0 && 'Kedua bilangan Positif &rarr; Hasil Positif (+) !'}
                {((testA < 0 && testB >= 0) || (testA >= 0 && testB < 0)) &&
                  'Satu Positif dan satu Negatif (berlawanan) &rarr; Hasil Negatif (-) !'}
                {testA < 0 && testB < 0 && 'Kedua bilangan Negatif (tanda sama) &rarr; Hasil Positif (+) !'}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
