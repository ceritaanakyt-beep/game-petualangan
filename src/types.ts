export interface Character {
  id: string;
  name: string;
  role: string;
  badge: string;
  quote: string;
  avatarBg: string;
  schoolName?: string;
}

export interface RocketSkin {
  id: string;
  name: string;
  description: string;
  price: number;
  rarity: 'Umum' | 'Langka' | 'Epik' | 'Legendaris';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  engineColor: string;
  flameType: 'fire' | 'plasma' | 'solar' | 'cosmic';
  unlockedByDefault?: boolean;
}

export interface MathQuestion {
  id: string;
  num1: number;
  num2: number;
  answer: number;
  options: number[];
  storyPrompt?: string;
  tipExplanation: string;
  levelCategory: 'basic' | 'tens' | 'two_digit' | 'negative' | 'mixed_challenge' | 'story';
}

export interface LevelSector {
  id: string;
  sectorNumber: number;
  name: string;
  subtitle: string;
  planetName: string;
  planetColor: string;
  planetType: 'earth' | 'moon' | 'mars' | 'jupiter' | 'saturn' | 'neptune' | 'sun';
  requiredStars: number;
  description: string;
  topic: string;
  multiplierRange: string;
  coinsReward: number;
  totalQuestions: number;
}

export interface LeaderboardEntry {
  id: string;
  playerName: string;
  characterId: string;
  rocketSkinId: string;
  score: number;
  stars: number;
  accuracy: number;
  timeSeconds: number;
  mode: string;
  timestamp: number;
}

export interface PlayerProgress {
  playerName: string;
  coins: number;
  selectedCharacterId: string;
  selectedRocketId: string;
  unlockedRocketIds: string[];
  completedLevels: Record<string, {
    stars: number;
    highScore: number;
    bestAccuracy: number;
    bestTime: number;
  }>;
  timeAttackHighScore: number;
  soundEnabled: boolean;
  musicEnabled: boolean;
}
