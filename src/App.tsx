import React, { useState, useEffect } from 'react';
import { PlayerProgress, LeaderboardEntry, LevelSector } from './types';
import { INITIAL_LEADERBOARD, LEVEL_SECTORS } from './data/gameData';
import { CosmicBackground } from './components/CosmicBackground';
import { Navbar } from './components/Navbar';
import { GalaxyMap } from './components/GalaxyMap';
import { GameStage } from './components/GameStage';
import { RocketHangar } from './components/RocketHangar';
import { LeaderboardModal } from './components/LeaderboardModal';
import { CharacterSelectModal } from './components/CharacterSelectModal';
import { MateriModal } from './components/MateriModal';
import { LevelCompleteModal } from './components/LevelCompleteModal';
import { ChangeNameModal } from './components/ChangeNameModal';
import { sounds } from './utils/audio';

const STORAGE_KEY_PROGRESS = 'astro_math_kelas5_progress_v2';
const STORAGE_KEY_LEADERBOARD = 'astro_math_kelas5_leaderboard_v2';

const DEFAULT_PROGRESS: PlayerProgress = {
  playerName: 'Siswa Juara SD 01',
  coins: 80, // Initial bonus coins for friendly start
  selectedCharacterId: 'bima_bakalan', // From user uploaded image: SD Bakalan 01 mascot
  selectedRocketId: 'rocket_merah_putih',
  unlockedRocketIds: ['rocket_merah_putih'],
  completedLevels: {
    sector_1: {
      stars: 1,
      highScore: 300,
      bestAccuracy: 80,
      bestTime: 50,
    },
  },
  timeAttackHighScore: 0,
  soundEnabled: true,
  musicEnabled: true,
};

export default function App() {
  // Load progress from localStorage
  const [progress, setProgress] = useState<PlayerProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROGRESS);
      if (saved) {
        return { ...DEFAULT_PROGRESS, ...JSON.parse(saved) };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_PROGRESS;
  });

  // Load leaderboard from localStorage
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LEADERBOARD);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return INITIAL_LEADERBOARD;
  });

  // Navigation views
  const [activeView, setActiveView] = useState<
    'map' | 'shop' | 'leaderboard' | 'timeAttack' | 'game' | 'materi'
  >('map');

  // Currently playing sector (if in level mode)
  const [currentSector, setCurrentSector] = useState<LevelSector | null>(null);

  // Modals state
  const [showCharacterSelect, setShowCharacterSelect] = useState(false);
  const [showChangeName, setShowChangeName] = useState(false);
  const [completionResult, setCompletionResult] = useState<{
    modeTitle: string;
    score: number;
    stars: number;
    coinsEarned: number;
    accuracy: number;
    timeTaken: number;
    sectorId?: string;
  } | null>(null);

  // Sync progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
    } catch {
      // Storage error
    }
  }, [progress]);

  // Sync leaderboard to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LEADERBOARD, JSON.stringify(leaderboard));
    } catch {
      // Storage error
    }
  }, [leaderboard]);

  // Total stars calculated across sectors
  const totalStars = Object.keys(progress.completedLevels).reduce((acc, key) => {
    return acc + (progress.completedLevels[key]?.stars || 0);
  }, 0);

  // Handle Level or Sprint Launch
  const handleStartSector = (sector: LevelSector) => {
    setCurrentSector(sector);
    setActiveView('game');
  };

  const handleStartSprint = () => {
    setCurrentSector(null);
    setActiveView('timeAttack');
  };

  // Handle Game Completion
  const handleGameComplete = (results: {
    modeTitle: string;
    score: number;
    stars: number;
    coinsEarned: number;
    accuracy: number;
    timeTaken: number;
    sectorId?: string;
  }) => {
    // 1. Update progress
    setProgress((prev) => {
      const newCoins = prev.coins + results.coinsEarned;
      const newCompleted = { ...prev.completedLevels };

      if (results.sectorId) {
        const existing = newCompleted[results.sectorId];
        const prevStars = existing?.stars || 0;
        const prevScore = existing?.highScore || 0;

        newCompleted[results.sectorId] = {
          stars: Math.max(prevStars, results.stars),
          highScore: Math.max(prevScore, results.score),
          bestAccuracy: Math.max(existing?.bestAccuracy || 0, results.accuracy),
          bestTime:
            existing?.bestTime > 0
              ? Math.min(existing.bestTime, results.timeTaken)
              : results.timeTaken,
        };
      }

      return {
        ...prev,
        coins: newCoins,
        completedLevels: newCompleted,
        timeAttackHighScore:
          results.modeTitle.includes('Sprint')
            ? Math.max(prev.timeAttackHighScore, results.score)
            : prev.timeAttackHighScore,
      };
    });

    // 2. Add to Leaderboard
    const newEntry: LeaderboardEntry = {
      id: 'lead_' + Date.now(),
      playerName: progress.playerName,
      characterId: progress.selectedCharacterId,
      rocketSkinId: progress.selectedRocketId,
      score: results.score,
      stars: results.stars,
      accuracy: results.accuracy,
      timeSeconds: results.timeTaken,
      mode: results.modeTitle,
      timestamp: Date.now(),
    };

    setLeaderboard((prev) => [newEntry, ...prev]);

    // 3. Show Completion Modal
    setCompletionResult(results);
  };

  // Rocket Skin Purchases and Equips
  const handleBuySkin = (skinId: string, price: number) => {
    if (progress.coins >= price && !progress.unlockedRocketIds.includes(skinId)) {
      setProgress((prev) => ({
        ...prev,
        coins: prev.coins - price,
        unlockedRocketIds: [...prev.unlockedRocketIds, skinId],
        selectedRocketId: skinId, // Auto equip
      }));
    }
  };

  const handleEquipSkin = (skinId: string) => {
    if (progress.unlockedRocketIds.includes(skinId)) {
      setProgress((prev) => ({
        ...prev,
        selectedRocketId: skinId,
      }));
    }
  };

  const handleToggleSound = () => {
    const next = !progress.soundEnabled;
    sounds.enabled = next;
    setProgress((prev) => ({ ...prev, soundEnabled: next }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative selection:bg-indigo-500 selection:text-white">
      {/* Background with glowing space stars and nebulae */}
      <CosmicBackground />

      {/* Top Application Navbar */}
      <Navbar
        playerName={progress.playerName}
        coins={progress.coins}
        totalStars={totalStars}
        characterId={progress.selectedCharacterId}
        soundEnabled={progress.soundEnabled}
        activeView={activeView}
        onNavigate={(view) => {
          if (view === 'materi') {
            setActiveView('materi');
          } else {
            setActiveView(view);
          }
        }}
        onToggleSound={handleToggleSound}
        onOpenCharacterSelect={() => setShowCharacterSelect(true)}
        onChangeName={() => setShowChangeName(true)}
      />

      {/* Main Content Body */}
      <main className="flex-1 relative z-10 py-4">
        {activeView === 'map' && (
          <GalaxyMap
            progress={progress}
            onSelectSector={handleStartSector}
            onStartSprint={handleStartSprint}
            onOpenShop={() => setActiveView('shop')}
          />
        )}

        {activeView === 'game' && currentSector && (
          <GameStage
            mode="sector"
            sector={currentSector}
            progress={progress}
            onExit={() => setActiveView('map')}
            onComplete={handleGameComplete}
          />
        )}

        {activeView === 'timeAttack' && (
          <GameStage
            mode="timeAttack"
            progress={progress}
            onExit={() => setActiveView('map')}
            onComplete={handleGameComplete}
          />
        )}

        {activeView === 'shop' && (
          <RocketHangar
            progress={progress}
            onEquipSkin={handleEquipSkin}
            onBuySkin={handleBuySkin}
            onBack={() => setActiveView('map')}
          />
        )}

        {activeView === 'leaderboard' && (
          <LeaderboardModal
            entries={leaderboard}
            currentPlayerName={progress.playerName}
            onBack={() => setActiveView('map')}
          />
        )}

        {activeView === 'materi' && (
          <MateriModal onClose={() => setActiveView('map')} />
        )}
      </main>

      {/* Global Modals */}
      {showCharacterSelect && (
        <CharacterSelectModal
          selectedCharacterId={progress.selectedCharacterId}
          onSelectCharacter={(id) => {
            setProgress((prev) => ({ ...prev, selectedCharacterId: id }));
          }}
          onClose={() => setShowCharacterSelect(false)}
        />
      )}

      {showChangeName && (
        <ChangeNameModal
          currentName={progress.playerName}
          onSave={(newName) => {
            setProgress((prev) => ({ ...prev, playerName: newName }));
          }}
          onClose={() => setShowChangeName(false)}
        />
      )}

      {completionResult && (
        <LevelCompleteModal
          modeTitle={completionResult.modeTitle}
          score={completionResult.score}
          stars={completionResult.stars}
          coinsEarned={completionResult.coinsEarned}
          accuracy={completionResult.accuracy}
          timeTaken={completionResult.timeTaken}
          characterId={progress.selectedCharacterId}
          rocketSkinId={progress.selectedRocketId}
          onNext={() => {
            setCompletionResult(null);
            setActiveView('map');
          }}
          onReplay={() => {
            setCompletionResult(null);
            // Re-trigger active game
            if (completionResult.sectorId) {
              const sec = LEVEL_SECTORS.find((s) => s.id === completionResult.sectorId);
              if (sec) {
                setCurrentSector(sec);
                setActiveView('game');
              }
            } else {
              setActiveView('timeAttack');
            }
          }}
          onOpenLeaderboard={() => {
            setCompletionResult(null);
            setActiveView('leaderboard');
          }}
          onOpenShop={() => {
            setCompletionResult(null);
            setActiveView('shop');
          }}
        />
      )}

      {/* School Footer Note */}
      <footer className="relative z-10 w-full text-center py-4 border-t border-indigo-950 text-slate-400 text-xs flex flex-col sm:flex-row items-center justify-center gap-2">
        <span>🚀 Game Edukasi Matematika Kelas 5 SD • Materi Perkalian Bilangan Bulat</span>
        <span className="hidden sm:inline">•</span>
        <span className="text-indigo-300 font-semibold">
          Maskot Bima Satria SD Negeri Bakalan 01 Polokarto
        </span>
      </footer>
    </div>
  );
}
