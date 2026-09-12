import { Character, RocketSkin, LevelSector, MathQuestion } from '../types';

export const SCHOOL_CHARACTERS: Character[] = [
  {
    id: 'bima_bakalan',
    name: 'Bima Satria Bakalan',
    role: 'Kapten Maskot SD Negeri Bakalan 01',
    badge: 'Penjaga Bintang Ilmu',
    quote: 'Buku di tangan, bintang di dada! Ayo taklukkan perkalian kosmis bersama SD Bakalan 01!',
    avatarBg: 'from-amber-600 to-indigo-900',
    schoolName: 'SD Negeri Bakalan 01 Polokarto',
  },
  {
    id: 'alya_siswi',
    name: 'Alya Siswi Cerdas',
    role: 'Pakar Taktik & Hitung Cepat',
    badge: 'Bintang Prestasi SD',
    quote: 'Perkalian 2 digit itu mudah, kita bisa pecah jadi puluhan dan satuan!',
    avatarBg: 'from-pink-500 to-purple-800',
    schoolName: 'Kelas 5 SD Unggulan',
  },
  {
    id: 'rian_teknisi',
    name: 'Rian Siswa Teknisi',
    role: 'Teknisi Roket Angkasa',
    badge: 'Mekanik Super Jet',
    quote: 'Setiap jawaban benar menghasilkan energi plasma untuk roket kita melesat!',
    avatarBg: 'from-blue-500 to-cyan-800',
    schoolName: 'Kelas 5 SD Sains',
  },
  {
    id: 'pak_surya',
    name: 'Pak Guru Surya',
    role: 'Guru Pembina Matematika',
    badge: 'Master Matematika',
    quote: 'Ingat rumus tanda: (+) × (-) = (-) dan (-) × (-) = (+). Jangan lupa perkalian susun!',
    avatarBg: 'from-emerald-500 to-teal-900',
    schoolName: 'Wali Kelas 5 SD',
  },
];

export const ROCKET_SKINS: RocketSkin[] = [
  {
    id: 'rocket_merah_putih',
    name: 'Perintis Merah Putih',
    description: 'Roket penjelajah pemula dengan semangat pelajar merah-putih Indonesia.',
    price: 0,
    rarity: 'Umum',
    primaryColor: '#ef4444',
    secondaryColor: '#f8fafc',
    accentColor: '#fbbf24',
    engineColor: '#3b82f6',
    flameType: 'fire',
    unlockedByDefault: true,
  },
  {
    id: 'rocket_satria_bakalan',
    name: 'Satria Bakalan 01 Emas',
    description: 'Edisi istimewa maskot SD Negeri Bakalan 01 Polokarto dengan sayap emas dan perisai ilmu.',
    price: 150,
    rarity: 'Epik',
    primaryColor: '#1e3a8a',
    secondaryColor: '#f59e0b',
    accentColor: '#fbbf24',
    engineColor: '#10b981',
    flameType: 'solar',
  },
  {
    id: 'rocket_cyber_nebula',
    name: 'Cyber Nebula X-12',
    description: 'Roket berkecepatan cahaya bertenaga ion plasma berwarna ungu neon.',
    price: 300,
    rarity: 'Langka',
    primaryColor: '#8b5cf6',
    secondaryColor: '#06b6d4',
    accentColor: '#ec4899',
    engineColor: '#a855f7',
    flameType: 'plasma',
  },
  {
    id: 'rocket_komet_bimasakti',
    name: 'Komet Bimasakti Es',
    description: 'Terbuat dari paduan kristal es kosmis Saturnus yang dingin membekukan hambatan.',
    price: 500,
    rarity: 'Langka',
    primaryColor: '#0ea5e9',
    secondaryColor: '#e0f2fe',
    accentColor: '#38bdf8',
    engineColor: '#67e8f9',
    flameType: 'plasma',
  },
  {
    id: 'rocket_supernova',
    name: 'Supernova Quantum Core',
    description: 'Roket bertenaga reaktor surya mini dengan api kosmis yang menyala megah.',
    price: 750,
    rarity: 'Epik',
    primaryColor: '#f97316',
    secondaryColor: '#e11d48',
    accentColor: '#fde047',
    engineColor: '#eab308',
    flameType: 'fire',
  },
  {
    id: 'rocket_ksatria_titanium',
    name: 'Ksatria Mecha Titanium',
    description: 'Pesawat penjelajah galaksi kelas berat berpelindung titanium dengan pendorong kuantum ganda.',
    price: 1000,
    rarity: 'Legendaris',
    primaryColor: '#334155',
    secondaryColor: '#6366f1',
    accentColor: '#38bdf8',
    engineColor: '#818cf8',
    flameType: 'cosmic',
  },
];

export const LEVEL_SECTORS: LevelSector[] = [
  {
    id: 'sector_1',
    sectorNumber: 1,
    name: 'Stasiun Pelajar Bumi',
    subtitle: 'Pemanasan Dasar & Kelipatan 10',
    planetName: 'Bumi Biru',
    planetColor: 'from-blue-400 to-indigo-600',
    planetType: 'earth',
    requiredStars: 0,
    description: 'Kuasai perkalian dasar tabel 1-10 dan trik perkalian dengan angka nol/puluhan.',
    topic: 'Tabel Perkalian Dasar & Kelipatan 10',
    multiplierRange: '1 × 1 s.d. 12 × 10 & Puluhan',
    coinsReward: 50,
    totalQuestions: 5,
  },
  {
    id: 'sector_2',
    sectorNumber: 2,
    name: 'Sabuk Asteroid Cepat',
    subtitle: '2 Digit × 1 Digit Bersusun',
    planetName: 'Asteroid Ceres',
    planetColor: 'from-amber-600 to-stone-700',
    planetType: 'moon',
    requiredStars: 2,
    description: 'Hancurkan meteor dengan perkalian bilangan puluhan dengan satuan menggunakan cara susun!',
    topic: 'Perkalian Puluhan × Satuan',
    multiplierRange: '15 × 3 s.d. 95 × 8',
    coinsReward: 80,
    totalQuestions: 6,
  },
  {
    id: 'sector_3',
    sectorNumber: 3,
    name: 'Kawah Planet Mars',
    subtitle: 'Perkalian 2 Digit × 2 Digit',
    planetName: 'Mars Merah',
    planetColor: 'from-red-500 to-amber-700',
    planetType: 'mars',
    requiredStars: 5,
    description: 'Jelajahi permukaan Mars dengan menguasai cara perkalian susun dua digit yang teliti.',
    topic: 'Perkalian 2 Digit × 2 Digit',
    multiplierRange: '12 × 14 s.d. 45 × 32',
    coinsReward: 120,
    totalQuestions: 6,
  },
  {
    id: 'sector_4',
    sectorNumber: 4,
    name: 'Cincin Saturnus Beku',
    subtitle: 'Bilangan Bulat Negatif: (+) × (-)',
    planetName: 'Saturnus Es',
    planetColor: 'from-cyan-400 to-blue-700',
    planetType: 'saturn',
    requiredStars: 8,
    description: 'Suhu ekstrem di bawah nol! Pahami aturan bahwa bilangan positif dikali negatif hasilnya negatif.',
    topic: 'Positif × Negatif = Negatif',
    multiplierRange: '8 × (-7) s.d. (-25) × 6',
    coinsReward: 160,
    totalQuestions: 6,
  },
  {
    id: 'sector_5',
    sectorNumber: 5,
    name: 'Pusaran Lubang Quantum',
    subtitle: 'Negatif × Negatif = Positif!',
    planetName: 'Neptunus Misteri',
    planetColor: 'from-violet-600 to-purple-950',
    planetType: 'neptune',
    requiredStars: 12,
    description: 'Di dunia kuantum, dua arah berlawanan berbalik menjadi maju: (-) × (-) = (+)!',
    topic: 'Negatif × Negatif = Positif',
    multiplierRange: '(-6) × (-9) s.d. (-18) × (-14)',
    coinsReward: 200,
    totalQuestions: 6,
  },
  {
    id: 'sector_6',
    sectorNumber: 6,
    name: 'Pusat Galaksi Bimasakti',
    subtitle: 'Soal Cerita & Master Kosmis',
    planetName: 'Surya Bimasakti',
    planetColor: 'from-yellow-400 via-orange-500 to-red-600',
    planetType: 'sun',
    requiredStars: 16,
    description: 'Uji kemampuan tertinggi dengan soal cerita kontekstual perjalanan antar bintang!',
    topic: 'Soal Cerita Perkalian Bilangan Bulat',
    multiplierRange: 'Tantangan Lengkap Kelas 5',
    coinsReward: 250,
    totalQuestions: 6,
  },
];

// Helper to generate options with smart distractors (like sign mistakes or addition mistakes)
function generateDistractors(answer: number): number[] {
  const distractors = new Set<number>();
  distractors.add(answer);

  // Common student pitfalls:
  // 1. Wrong sign (+/- swap)
  if (answer !== 0) {
    distractors.add(-answer);
  }

  // 2. Off by +/- 10
  distractors.add(answer + 10);
  distractors.add(answer - 10);

  // 3. Off by small offset
  distractors.add(answer + 2);
  distractors.add(answer - 2);
  distractors.add(answer + 5);
  distractors.add(answer - 5);

  const list = Array.from(distractors).filter(n => n !== answer);
  // Shuffle distractors and pick 3
  const shuffled = list.sort(() => Math.random() - 0.5).slice(0, 3);
  const allOptions = [answer, ...shuffled].sort(() => Math.random() - 0.5);
  return allOptions;
}

export function getQuestionsForSector(sectorId: string): MathQuestion[] {
  switch (sectorId) {
    case 'sector_1': {
      // Basic 1-10 & multiples of 10
      return [
        {
          id: 's1_1',
          num1: 7,
          num2: 8,
          answer: 56,
          options: generateDistractors(56),
          tipExplanation: 'Perkalian dasar: 7 × 8 = 56. Trik: 7 dikali 8 adalah 56 (5, 6, 7, 8 berturutan!)',
          levelCategory: 'basic',
        },
        {
          id: 's1_2',
          num1: 9,
          num2: 6,
          answer: 54,
          options: generateDistractors(54),
          tipExplanation: 'Trik jari angka 9: lipat jari ke-6, di kiri ada 5 puluhan, di kanan ada 4 satuan = 54!',
          levelCategory: 'basic',
        },
        {
          id: 's1_3',
          num1: 30,
          num2: 4,
          answer: 120,
          options: generateDistractors(120),
          tipExplanation: 'Trik Kelipatan 10: Kalikan angka depannya (3 × 4 = 12), lalu tambahkan satu angka nol di belakangnya menjadi 120!',
          levelCategory: 'tens',
        },
        {
          id: 's1_4',
          num1: 60,
          num2: 70,
          answer: 4200,
          options: [4200, 420, 42000, 42],
          tipExplanation: 'Kalikan 6 × 7 = 42. Hitung jumlah nolnya ada 2 buah, sehingga menjadi 4.200!',
          levelCategory: 'tens',
        },
        {
          id: 's1_5',
          num1: 12,
          num2: 5,
          answer: 60,
          options: generateDistractors(60),
          tipExplanation: 'Pecah menjadi (10 × 5) + (2 × 5) = 50 + 10 = 60!',
          levelCategory: 'basic',
        },
      ];
    }

    case 'sector_2': {
      // 2 digit x 1 digit
      return [
        {
          id: 's2_1',
          num1: 24,
          num2: 4,
          answer: 96,
          options: generateDistractors(96),
          tipExplanation: 'Cara susun: 4 × 4 satuan = 16 (tulis 6, simpan 1). 4 × 2 puluhan = 8 + simpanan 1 = 9. Hasilnya 96.',
          levelCategory: 'two_digit',
        },
        {
          id: 's2_2',
          num1: 36,
          num2: 5,
          answer: 180,
          options: generateDistractors(180),
          tipExplanation: 'Trik cepat: (30 × 5) + (6 × 5) = 150 + 30 = 180!',
          levelCategory: 'two_digit',
        },
        {
          id: 's2_3',
          num1: 48,
          num2: 7,
          answer: 336,
          options: generateDistractors(336),
          tipExplanation: 'Hitung: (40 × 7) = 280, lalu (8 × 7) = 56. Jumlahkan: 280 + 56 = 336!',
          levelCategory: 'two_digit',
        },
        {
          id: 's2_4',
          num1: 75,
          num2: 6,
          answer: 450,
          options: generateDistractors(450),
          tipExplanation: '70 × 6 = 420. 5 × 6 = 30. Total: 420 + 30 = 450!',
          levelCategory: 'two_digit',
        },
        {
          id: 's2_5',
          num1: 84,
          num2: 8,
          answer: 672,
          options: generateDistractors(672),
          tipExplanation: '80 × 8 = 640. 4 × 8 = 32. 640 + 32 = 672!',
          levelCategory: 'two_digit',
        },
        {
          id: 's2_6',
          num1: 95,
          num2: 9,
          answer: 855,
          options: generateDistractors(855),
          tipExplanation: 'Trik cerdas: 95 × (10 - 1) = 950 - 95 = 855!',
          levelCategory: 'two_digit',
        },
      ];
    }

    case 'sector_3': {
      // 2 digit x 2 digit
      return [
        {
          id: 's3_1',
          num1: 14,
          num2: 12,
          answer: 168,
          options: generateDistractors(168),
          tipExplanation: 'Langkah susun: 14 × 2 = 28, dan 14 × 10 = 140. Jumlahkan 28 + 140 = 168!',
          levelCategory: 'two_digit',
        },
        {
          id: 's3_2',
          num1: 25,
          num2: 16,
          answer: 400,
          options: generateDistractors(400),
          tipExplanation: 'Trik angka 25: 25 × 4 = 100. Karena 16 = 4 × 4, maka hasilnya 100 × 4 = 400!',
          levelCategory: 'two_digit',
        },
        {
          id: 's3_3',
          num1: 32,
          num2: 21,
          answer: 672,
          options: generateDistractors(672),
          tipExplanation: '32 × 1 = 32. 32 × 20 = 640. 640 + 32 = 672.',
          levelCategory: 'two_digit',
        },
        {
          id: 's3_4',
          num1: 42,
          num2: 15,
          answer: 630,
          options: generateDistractors(630),
          tipExplanation: '42 × 10 = 420. 42 × 5 = 210. 420 + 210 = 630.',
          levelCategory: 'two_digit',
        },
        {
          id: 's3_5',
          num1: 53,
          num2: 24,
          answer: 1272,
          options: generateDistractors(1272),
          tipExplanation: '53 × 4 = 212. 53 × 20 = 1060. Jumlahkan 212 + 1060 = 1272!',
          levelCategory: 'two_digit',
        },
        {
          id: 's3_6',
          num1: 65,
          num2: 30,
          answer: 1950,
          options: generateDistractors(1950),
          tipExplanation: 'Karena ada 0 di 30, cukup hitung 65 × 3 = 195, lalu tambahkan 0 di belakangnya = 1950!',
          levelCategory: 'two_digit',
        },
      ];
    }

    case 'sector_4': {
      // Positif x Negatif = Negatif
      return [
        {
          id: 's4_1',
          num1: 6,
          num2: -7,
          answer: -42,
          options: [-42, 42, -36, -48],
          tipExplanation: 'Aturan tanda bilangan bulat: (+) × (-) = (-). Kalikan nilainya 6 × 7 = 42, beri tanda negatif (-) sehingga hasilnya -42.',
          levelCategory: 'negative',
        },
        {
          id: 's4_2',
          num1: -8,
          num2: 9,
          answer: -72,
          options: [-72, 72, -63, -81],
          tipExplanation: 'Sifat komutatif: (-) × (+) = (-). 8 × 9 = 72, jadi hasilnya adalah -72!',
          levelCategory: 'negative',
        },
        {
          id: 's4_3',
          num1: 15,
          num2: -4,
          answer: -60,
          options: [-60, 60, -50, -65],
          tipExplanation: '15 × 4 = 60. Karena ada satu tanda minus, hasilnya adalah -60.',
          levelCategory: 'negative',
        },
        {
          id: 's4_4',
          num1: -25,
          num2: 6,
          answer: -150,
          options: [-150, 150, -125, -175],
          tipExplanation: '25 × 6 = 150. Negatif dikali positif bernilai negatif = -150.',
          levelCategory: 'negative',
        },
        {
          id: 's4_5',
          num1: 12,
          num2: -11,
          answer: -132,
          options: [-132, 132, -121, -144],
          tipExplanation: '12 × 11 = 132. Karena tanda berlawanan, hasilnya negatif: -132.',
          levelCategory: 'negative',
        },
        {
          id: 's4_6',
          num1: -40,
          num2: 8,
          answer: -320,
          options: [-320, 320, -360, -280],
          tipExplanation: '40 × 8 = 320. Tanda (-) menghasilkan -320.',
          levelCategory: 'negative',
        },
      ];
    }

    case 'sector_5': {
      // Negatif x Negatif = Positif
      return [
        {
          id: 's5_1',
          num1: -6,
          num2: -8,
          answer: 48,
          options: [48, -48, 42, -42],
          tipExplanation: 'Hukum tanda emas: (-) × (-) = (+). Tanda negatif yang berpasangan saling meniadakan menjadi positif! 6 × 8 = 48.',
          levelCategory: 'negative',
        },
        {
          id: 's5_2',
          num1: -9,
          num2: -7,
          answer: 63,
          options: [63, -63, 56, -56],
          tipExplanation: 'Negatif dikali negatif hasilnya positif: (-9) × (-7) = +63!',
          levelCategory: 'negative',
        },
        {
          id: 's5_3',
          num1: -12,
          num2: -5,
          answer: 60,
          options: [60, -60, 50, -50],
          tipExplanation: '12 × 5 = 60. Karena kedua bilangan bertanda minus (-), hasilnya menjadi positif 60!',
          levelCategory: 'negative',
        },
        {
          id: 's5_4',
          num1: -15,
          num2: -4,
          answer: 60,
          options: [60, -60, 55, -45],
          tipExplanation: '(-15) × (-4) = +60. Ingat: tanda yang SAMA selalu menghasilkan POSITIF!',
          levelCategory: 'negative',
        },
        {
          id: 's5_5',
          num1: -20,
          num2: -15,
          answer: 300,
          options: [300, -300, 350, -250],
          tipExplanation: '20 × 15 = 300. (-) × (-) = (+) jadi hasilnya +300!',
          levelCategory: 'negative',
        },
        {
          id: 's5_6',
          num1: -18,
          num2: -10,
          answer: 180,
          options: [180, -180, 1800, -18],
          tipExplanation: '18 × 10 = 180. Negatif dikalikan negatif menjadi positif 180.',
          levelCategory: 'negative',
        },
      ];
    }

    case 'sector_6': {
      // Soal Cerita Kontekstual Luar Angkasa Kelas 5
      return [
        {
          id: 's6_1',
          num1: 35,
          num2: 12,
          answer: 420,
          options: [420, 400, 450, 380],
          storyPrompt: 'Pesawat roket SD Bakalan 01 membakar 35 liter bahan bakar cair per detik. Berapa total liter bahan bakar yang terpakai selama 12 detik peluncuran?',
          tipExplanation: 'Perhitungan: 35 liter × 12 detik = (35 × 10) + (35 × 2) = 350 + 70 = 420 liter!',
          levelCategory: 'story',
        },
        {
          id: 's6_2',
          num1: 24,
          num2: 15,
          answer: 360,
          options: [360, 340, 380, 400],
          storyPrompt: 'Stasiun Luar Angkasa memiliki 24 modul panel surya. Jika setiap modul dapat menghasilkan 15 kilowatt listrik per jam, berapa total daya listrik yang dihasilkan?',
          tipExplanation: 'Hitung: 24 × 15 = 24 × (10 + 5) = 240 + 120 = 360 kilowatt!',
          levelCategory: 'story',
        },
        {
          id: 's6_3',
          num1: -5,
          num2: 8,
          answer: -40,
          options: [-40, 40, -35, -45],
          storyPrompt: 'Di malam hari planet Mars, suhu udara turun sebesar 5°C setiap jam (-5). Berapa perubahan total suhu udara setelah 8 jam malam berlangsung?',
          tipExplanation: 'Suhu turun artinya negatif (-5). Perubahan total = (-5) × 8 = -40°C (suhu turun 40 derajat Celsius).',
          levelCategory: 'story',
        },
        {
          id: 's6_4',
          num1: 45,
          num2: 20,
          answer: 900,
          options: [900, 850, 950, 800],
          storyPrompt: 'Regu astronot menyiapkan 20 kardus ransum makanan angkasa. Setiap kardus berisi 45 paket biskuit energi. Berapa seluruh paket biskuit energi yang tersedia?',
          tipExplanation: '45 × 20 = 45 × 2 × 10 = 90 × 10 = 900 paket biskuit energi!',
          levelCategory: 'story',
        },
        {
          id: 's6_5',
          num1: -12,
          num2: 6,
          answer: -72,
          options: [-72, 72, -60, -84],
          storyPrompt: 'Robot penjelajah Curiosity menyelam ke dalam kawah sedalam 12 meter per menit (-12). Berapa posisi kedalaman robot setelah bergerak selama 6 menit?',
          tipExplanation: 'Kedalaman bergerak ke bawah: (-12) × 6 = -72 meter di bawah permukaan kawah.',
          levelCategory: 'story',
        },
        {
          id: 's6_6',
          num1: -8,
          num2: -15,
          answer: 120,
          options: [120, -120, 110, 130],
          storyPrompt: 'Sensor pesawat membalik arah anomali energi negatif -8 sebesar -15 kali putaran. Berdasarkan rumus (-) × (-), berapa nilai pancaran energi positif yang dilepaskan?',
          tipExplanation: 'Aturan tanda kuantum: (-8) × (-15) = +120 satuan energi positif!',
          levelCategory: 'story',
        },
      ];
    }

    default:
      return [];
  }
}

// Generates dynamic questions for Time Attack mode
export function generateRandomQuestion(difficulty: number = 1): MathQuestion {
  const type = Math.random();
  if (type < 0.3) {
    // Basic to tens
    const a = Math.floor(Math.random() * 8) + 2;
    const b = (Math.floor(Math.random() * 9) + 1) * (Math.random() > 0.5 ? 10 : 1);
    const ans = a * b;
    return {
      id: 'ta_' + Date.now() + Math.random(),
      num1: a,
      num2: b,
      answer: ans,
      options: generateDistractors(ans),
      tipExplanation: `${a} × ${b} = ${ans}`,
      levelCategory: b >= 10 ? 'tens' : 'basic',
    };
  } else if (type < 0.65) {
    // 2-digit x 1-digit or simple 2-digit
    const a = Math.floor(Math.random() * 40) + 12;
    const b = Math.floor(Math.random() * 8) + 2;
    const ans = a * b;
    return {
      id: 'ta_' + Date.now() + Math.random(),
      num1: a,
      num2: b,
      answer: ans,
      options: generateDistractors(ans),
      tipExplanation: `Cara susun: (${Math.floor(a / 10) * 10} × ${b}) + (${a % 10} × ${b}) = ${ans}`,
      levelCategory: 'two_digit',
    };
  } else {
    // Negatives
    const isBothNegative = Math.random() > 0.5;
    const a = (Math.floor(Math.random() * 12) + 3) * -1;
    const b = (Math.floor(Math.random() * 9) + 2) * (isBothNegative ? -1 : 1);
    const ans = a * b;
    return {
      id: 'ta_' + Date.now() + Math.random(),
      num1: a,
      num2: b,
      answer: ans,
      options: generateDistractors(ans),
      tipExplanation: `Aturan tanda: ${a < 0 && b < 0 ? '(-) × (-) = (+)' : '(+) × (-) = (-)'} -> ${a} × ${b} = ${ans}`,
      levelCategory: 'negative',
    };
  }
}

export const INITIAL_LEADERBOARD = [
  {
    id: 'lead_1',
    playerName: 'Bima (SD Bakalan 01)',
    characterId: 'bima_bakalan',
    rocketSkinId: 'rocket_satria_bakalan',
    score: 1850,
    stars: 18,
    accuracy: 100,
    timeSeconds: 110,
    mode: 'Petualangan Galaksi',
    timestamp: Date.now() - 3600000 * 2,
  },
  {
    id: 'lead_2',
    playerName: 'Alya Siswi Cerdas',
    characterId: 'alya_siswi',
    rocketSkinId: 'rocket_cyber_nebula',
    score: 1620,
    stars: 17,
    accuracy: 96,
    timeSeconds: 135,
    mode: 'Petualangan Galaksi',
    timestamp: Date.now() - 3600000 * 5,
  },
  {
    id: 'lead_3',
    playerName: 'Rian Teknisi',
    characterId: 'rian_teknisi',
    rocketSkinId: 'rocket_merah_putih',
    score: 1420,
    stars: 15,
    accuracy: 92,
    timeSeconds: 148,
    mode: 'Petualangan Galaksi',
    timestamp: Date.now() - 3600000 * 12,
  },
  {
    id: 'lead_4',
    playerName: 'Bima Satria (Sprint)',
    characterId: 'bima_bakalan',
    rocketSkinId: 'rocket_satria_bakalan',
    score: 950,
    stars: 3,
    accuracy: 98,
    timeSeconds: 60,
    mode: 'Lintasan Waktu (60s)',
    timestamp: Date.now() - 3600000 * 8,
  },
];
