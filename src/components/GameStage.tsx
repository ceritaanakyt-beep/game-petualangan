import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MathQuestion, LevelSector, PlayerProgress } from '../types';
import { getQuestionsForSector, generateRandomQuestion } from '../data/gameData';
import { RocketVisual } from './RocketVisual';
import { CharacterAvatar, CharacterGuideBubble } from './CharacterAvatar';
import { sounds } from '../utils/audio';
import {
  Sparkles,
  Zap,
  Clock,
  ArrowLeft,
  CheckCircle,
  XCircle,
  HelpCircle,
  Calculator,
  ChevronRight,
} from 'lucide-react';

interface GameStageProps {
  mode: 'sector' | 'timeAttack';
  sector?: LevelSector;
  progress: PlayerProgress;
  onExit: () => void;
  onComplete: (results: {
    modeTitle: string;
    score: number;
    stars: number;
    coinsEarned: number;
    accuracy: number;
    timeTaken: number;
    sectorId?: string;
  }) => void;
}

export const GameStage: React.FC<GameStageProps> = ({
  mode,
  sector,
  progress,
  onExit,
  onComplete,
}) => {
  // Questions array
  const [questions, setQuestions] = useState<MathQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Stats
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [coinsEarned, setCoinsEarned] = useState(0);

  // Time tracking
  const [timeRemaining, setTimeRemaining] = useState(mode === 'timeAttack' ? 60 : 0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Feedback state
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [rocketBoosting, setRocketBoosting] = useState(false);
  const [shakeCard, setShakeCard] = useState(false);

  // Input Mode: Choices vs Custom Numeric Keypad
  const [inputMode, setInputMode] = useState<'choices' | 'keypad'>('choices');
  const [keypadInput, setKeypadInput] = useState<string>('');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize questions
  useEffect(() => {
    if (mode === 'sector' && sector) {
      const qList = getQuestionsForSector(sector.id);
      setQuestions(qList);
    } else {
      // Time attack initial batch
      const initial = Array.from({ length: 25 }, () => generateRandomQuestion(2));
      setQuestions(initial);
    }
  }, [mode, sector]);

  // Handle timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);

      if (mode === 'timeAttack') {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [mode]);

  // Time Attack Game Over Trigger
  const handleTimeAttackEnd = useCallback(() => {
    sounds.playFanfare();
    const totalAttempted = currentIndex + 1;
    const accuracy = totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 0;
    const finalCoins = coinsEarned + Math.floor(score / 30);

    onComplete({
      modeTitle: 'Lintasan Waktu Sprint (60 Detik)',
      score,
      stars: accuracy >= 90 ? 3 : accuracy >= 70 ? 2 : 1,
      coinsEarned: finalCoins,
      accuracy,
      timeTaken: 60,
    });
  }, [currentIndex, correctCount, coinsEarned, score, onComplete]);

  useEffect(() => {
    if (mode === 'timeAttack' && timeRemaining === 0 && questions.length > 0) {
      handleTimeAttackEnd();
    }
  }, [timeRemaining, mode, questions.length, handleTimeAttackEnd]);

  const currentQ = questions[currentIndex];

  const handleSelectAnswer = (choice: number) => {
    if (selectedAnswer !== null) return; // Prevent double taps

    setSelectedAnswer(choice);
    const correct = choice === currentQ.answer;
    setIsAnswerCorrect(correct);

    if (correct) {
      sounds.playCorrect();
      setRocketBoosting(true);
      setTimeout(() => setRocketBoosting(false), 1200);

      const newCombo = combo + 1;
      setCombo(newCombo);
      setCorrectCount((prev) => prev + 1);

      // Points: 100 base + combo bonus
      const points = 100 + (newCombo > 1 ? newCombo * 25 : 0);
      setScore((prev) => prev + points);

      // Coins: 5 coins base + extra on combo
      const addedCoins = 5 + Math.min(newCombo * 2, 10);
      setCoinsEarned((prev) => prev + addedCoins);
      sounds.playCoin();

      // Auto advance or wait slightly
      setTimeout(() => {
        advanceQuestion(true);
      }, 1100);
    } else {
      sounds.playWrong();
      setCombo(0);
      setShakeCard(true);
      setShowExplanation(true);
      setTimeout(() => setShakeCard(false), 500);
    }
  };

  const advanceQuestion = (wasCorrect: boolean) => {
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setShowExplanation(false);
    setKeypadInput('');

    if (mode === 'sector') {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        // Sector completed!
        finishSector();
      }
    } else {
      // Time Attack: continue infinitely until timer expires
      if (currentIndex + 1 >= questions.length) {
        setQuestions((prev) => [...prev, ...Array.from({ length: 10 }, () => generateRandomQuestion(2))]);
      }
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const finishSector = () => {
    sounds.playFanfare();
    const totalQ = questions.length;
    const finalAccuracy = Math.round((correctCount / totalQ) * 100);
    
    // Star rating
    let stars = 1;
    if (finalAccuracy >= 85 && timeElapsed < 120) stars = 3;
    else if (finalAccuracy >= 65) stars = 2;

    const baseCoins = sector?.coinsReward || 50;
    const totalCoins = coinsEarned + baseCoins + (stars === 3 ? 30 : 0);

    onComplete({
      modeTitle: sector ? `Sektor ${sector.sectorNumber}: ${sector.name}` : 'Misi Galaksi',
      score,
      stars,
      coinsEarned: totalCoins,
      accuracy: finalAccuracy,
      timeTaken: timeElapsed,
      sectorId: sector?.id,
    });
  };

  const handleKeypadSubmit = () => {
    if (!keypadInput) return;
    const num = parseInt(keypadInput, 10);
    if (!isNaN(num)) {
      handleSelectAnswer(num);
    }
  };

  if (!currentQ) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-white">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full mb-3" />
        <p className="font-game text-lg">Mempersiapkan Koordinat Galaksi...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 py-4 flex flex-col gap-5 text-slate-100">
      
      {/* Top HUD Bar */}
      <div className="flex items-center justify-between gap-3 bg-slate-900/90 backdrop-blur-md border border-indigo-800/50 rounded-2xl p-3 shadow-xl">
        {/* Back button */}
        <button
          onClick={() => {
            sounds.playClick();
            onExit();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        {/* Progress & Title */}
        <div className="text-center">
          <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-700/50">
            {mode === 'sector' && sector
              ? `Sektor ${sector.sectorNumber} • Soal ${currentIndex + 1}/${questions.length}`
              : 'Lintasan Waktu Sprint'}
          </span>
        </div>

        {/* Timer & Score */}
        <div className="flex items-center gap-3">
          {mode === 'timeAttack' ? (
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-game font-bold text-sm ${
                timeRemaining <= 10
                  ? 'bg-rose-950 text-rose-300 border border-rose-600 animate-pulse'
                  : 'bg-indigo-950 text-sky-300 border border-indigo-700'
              }`}
            >
              <Clock className="w-4 h-4 text-orange-400" />
              <span>{timeRemaining}s</span>
            </div>
          ) : (
            <div className="text-xs text-slate-400 font-semibold hidden xs:flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{timeElapsed}s</span>
            </div>
          )}

          <div className="px-3 py-1 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-300 font-game font-extrabold text-sm sm:text-base">
            {score} Poin
          </div>
        </div>
      </div>

      {/* Flight Stage & Rocket Visual Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-indigo-950/60 via-slate-950 to-slate-900 border border-indigo-700/40 p-5 shadow-2xl flex flex-col items-center justify-center min-h-[140px]">
        {/* Speed lines */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent pointer-events-none" />

        {/* Rocket flying in space */}
        <div
          className={`transition-transform duration-500 flex flex-col items-center ${
            rocketBoosting
              ? 'scale-125 -translate-y-4 filter drop-shadow-[0_0_25px_rgba(59,130,246,0.8)]'
              : 'scale-100'
          }`}
        >
          <RocketVisual
            skinId={progress.selectedRocketId}
            size="md"
            isFlying
          />
        </div>

        {/* Combo Multiplier Badge */}
        {combo >= 2 && (
          <div className="absolute top-3 right-4 animate-bounce flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-game text-xs font-extrabold shadow-lg">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>KOMBO ×{combo}!</span>
          </div>
        )}

        {/* Coins Earned Floating Info */}
        {coinsEarned > 0 && (
          <div className="absolute top-3 left-4 flex items-center gap-1 text-xs text-yellow-300 font-bold bg-yellow-950/60 px-2 py-0.5 rounded-full border border-yellow-700/40">
            <Sparkles className="w-3 h-3 text-yellow-400" />
            <span>+{coinsEarned} Koin</span>
          </div>
        )}
      </div>

      {/* Story Context (if provided in question) */}
      {currentQ.storyPrompt && (
        <div className="p-3.5 rounded-2xl bg-indigo-950/70 border border-indigo-700/50 text-slate-200 text-sm leading-relaxed flex items-start gap-2.5">
          <span className="text-lg">🚀</span>
          <div>
            <span className="text-xs font-bold text-amber-300 block mb-0.5">
              Tantangan Soal Cerita Kosmis:
            </span>
            <p>{currentQ.storyPrompt}</p>
          </div>
        </div>
      )}

      {/* Main Math Problem Card */}
      <div
        className={`relative rounded-3xl bg-slate-900/90 border border-indigo-500/40 p-6 sm:p-8 shadow-2xl text-center transition-all ${
          shakeCard ? 'animate-bounce border-rose-500' : ''
        }`}
      >
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
          Hitung Hasil Perkalian Berikut
        </span>

        {/* Big Equation */}
        <div className="flex items-center justify-center gap-3 sm:gap-5 my-2">
          <span className="font-game text-3xl sm:text-5xl font-black text-sky-300 tracking-wider">
            {currentQ.num1 < 0 ? `(${currentQ.num1})` : currentQ.num1}
          </span>
          <span className="font-game text-3xl sm:text-5xl font-black text-amber-400">
            ×
          </span>
          <span className="font-game text-3xl sm:text-5xl font-black text-sky-300 tracking-wider">
            {currentQ.num2 < 0 ? `(${currentQ.num2})` : currentQ.num2}
          </span>
          <span className="font-game text-3xl sm:text-5xl font-black text-slate-400">
            =
          </span>
          <div className="inline-flex items-center justify-center min-w-[70px] sm:min-w-[100px] h-12 sm:h-16 px-3 rounded-2xl bg-slate-950 border-2 border-dashed border-indigo-500 text-amber-300 font-game text-2xl sm:text-4xl font-extrabold shadow-inner">
            {selectedAnswer !== null ? (
              <span className={isAnswerCorrect ? 'text-emerald-400' : 'text-rose-400'}>
                {selectedAnswer}
              </span>
            ) : inputMode === 'keypad' && keypadInput ? (
              <span>{keypadInput}</span>
            ) : (
              <span className="text-slate-600 animate-pulse">?</span>
            )}
          </div>
        </div>

        {/* Toggle Mode Button (Choices vs Keypad) */}
        <div className="flex items-center justify-center gap-2 mt-4 pt-3 border-t border-indigo-900/40">
          <button
            onClick={() => {
              sounds.playClick();
              setInputMode(inputMode === 'choices' ? 'keypad' : 'choices');
            }}
            className="flex items-center gap-1.5 text-xs text-indigo-300 hover:text-white px-2.5 py-1 rounded-lg bg-indigo-950/60 border border-indigo-800/50 hover:bg-indigo-900/60 transition-colors"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>
              Mode: {inputMode === 'choices' ? 'Pilihan Ganda (Klik)' : 'Ketik Angka'}
            </span>
          </button>
        </div>
      </div>

      {/* Answer Area: Either 4 Multiple-Choice Buttons or On-Screen Numeric Keypad */}
      {inputMode === 'choices' ? (
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedAnswer === opt;
            const isTarget = opt === currentQ.answer;

            let btnStyle =
              'bg-slate-900/90 hover:bg-indigo-900/70 border-indigo-800/60 text-white hover:border-indigo-500 shadow-md';

            if (selectedAnswer !== null) {
              if (isTarget) {
                btnStyle =
                  'bg-emerald-600 text-white border-emerald-400 shadow-lg shadow-emerald-600/40 scale-105';
              } else if (isSelected && !isAnswerCorrect) {
                btnStyle = 'bg-rose-600 text-white border-rose-400 opacity-80';
              } else {
                btnStyle = 'bg-slate-950/60 text-slate-500 border-slate-800 opacity-50';
              }
            }

            return (
              <button
                key={idx}
                disabled={selectedAnswer !== null}
                onClick={() => handleSelectAnswer(opt)}
                className={`relative flex items-center justify-between p-4 sm:p-5 rounded-2xl border font-game text-xl sm:text-2xl font-bold transition-all duration-200 active:scale-95 ${btnStyle}`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-indigo-950 border border-indigo-700/50 text-indigo-300 text-xs flex items-center justify-center font-sans font-bold">
                    {['A', 'B', 'C', 'D'][idx]}
                  </span>
                  <span>{opt}</span>
                </div>

                {selectedAnswer !== null && isTarget && (
                  <CheckCircle className="w-6 h-6 text-white" />
                )}
                {selectedAnswer !== null && isSelected && !isAnswerCorrect && (
                  <XCircle className="w-6 h-6 text-white" />
                )}
              </button>
            );
          })}
        </div>
      ) : (
        /* Galactic Keypad for typing exact integer answers */
        <div className="p-4 rounded-3xl bg-slate-900/90 border border-indigo-800/50 max-w-sm mx-auto w-full">
          <div className="grid grid-cols-3 gap-2">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '0', '⌫'].map((key) => (
              <button
                key={key}
                disabled={selectedAnswer !== null}
                onClick={() => {
                  sounds.playClick();
                  if (key === '⌫') {
                    setKeypadInput((prev) => prev.slice(0, -1));
                  } else if (key === '-') {
                    setKeypadInput((prev) => (prev.startsWith('-') ? prev.slice(1) : '-' + prev));
                  } else {
                    if (keypadInput.length < 7) {
                      setKeypadInput((prev) => prev + key);
                    }
                  }
                }}
                className="h-12 rounded-xl bg-slate-800 hover:bg-indigo-900 border border-indigo-700/40 font-game text-xl font-bold text-white transition-colors active:scale-95"
              >
                {key}
              </button>
            ))}
          </div>

          <button
            disabled={!keypadInput || selectedAnswer !== null}
            onClick={handleKeypadSubmit}
            className="w-full mt-3 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 font-game text-base font-bold text-white shadow-lg active:scale-95 transition-all disabled:opacity-50"
          >
            Kirim Jawaban
          </button>
        </div>
      )}

      {/* Explanation & School Character Feedback */}
      {showExplanation && (
        <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <CharacterGuideBubble
            characterId={progress.selectedCharacterId}
            isCorrect={false}
            message={`Jawaban yang benar adalah ${currentQ.answer}. Jangan menyerah! Mari pahami langkah cara hitungnya:`}
            tip={currentQ.tipExplanation}
          />

          <button
            onClick={() => advanceQuestion(false)}
            className="self-center flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-game text-sm font-bold shadow-lg shadow-indigo-600/30 active:scale-95 transition-all"
          >
            <span>Lanjut ke Soal Berikutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Helpful Quick Tip on Request */}
      {!showExplanation && selectedAnswer === null && (
        <div className="flex items-center justify-between px-2 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
            Ingat: perkalian bersusun memisahkan puluhan dan satuan.
          </span>
          <span className="text-amber-300 font-bold">
            {progress.completedLevels[sector?.id || '']?.highScore
              ? `Rekor Sektor: ${progress.completedLevels[sector?.id || '']?.highScore} Poin`
              : 'Dapatkan 3 Bintang!'}
          </span>
        </div>
      )}

    </div>
  );
};
