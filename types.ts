
export enum Page {
  Home = 'HOME',
  PlanSelection = 'PLAN_SELECTION',
  JournalView = 'JOURNAL_VIEW',
  MyJournal = 'MY_JOURNAL',
  BadgeGallery = 'BADGE_GALLERY',
  MoodCalendar = 'MOOD_CALENDAR',
  Profile = 'PROFILE', // Noua pagină pentru personalizare
}

export interface Plan {
  id: number;
  title: string;
  prompt1: string;
  prompt2:string;
  bgColor: string;
  textColor: string;
  badge: BadgeName;
  connectors?: string[]; // Optional array for dropdown options like ['datorită', 'din cauza']
}

export interface ThoughtPair {
  part1: string;
  connector: string | null; // The word connecting the two parts, if any
  part2: string;
  reflection1: string; // Answer to "Tot timpul ești așa sau doar uneori?"
  reflection2: string; // Answer to "Cum te simți când nu ești așa?"
}

export interface JournalEntry {
  id: string;
  planTitle: string;
  prompt1: string; // Storing the prompt for display in the journal
  prompt2: string; // Storing the prompt for display in the journal
  thoughtPairs: ThoughtPair[]; // An array of thought pairs for the entry, now including reflections
  badgeName: BadgeName;
  timestamp: string;
}

export enum BadgeName {
  Identitate = 'Identitate',
  Visare = 'Visare',
  RecunostintaMama = 'Recunoștință (Mama)',
  RecunostintaTata = 'Recunoștință (Tata)',
  Fratie = 'Frăție',
  Prietenie = 'Prietenie',
  Bucurie = 'Bucurie',
  Curaj = 'Curaj',
  Empatie = 'Empatie',
  Speranta = 'Speranță',
  Streak3 = 'Serie de 3 Zile',
  Streak7 = 'Serie de 7 Zile',
  Streak30 = 'Serie de 30 Zile',
}

export interface Badge {
  name: BadgeName;
  icon: string;
  description: string;
  bgColor: string;
  textColor: string;
}

// --- NEW TYPES FOR CUSTOMIZATION ---

export type AvatarPartType = 'base' | 'hair' | 'eyes' | 'mouth' | 'top' | 'accessory';

export interface AvatarItem {
  id: string;
  type: AvatarPartType;
  name: string;
  // Using a data URL or external URL for the image
  imageUrl: string;
  unlockedBy: BadgeName | null; // null means unlocked by default
  colorizable?: 'base' | 'hair' | 'top'; // Specifies if and which color from AvatarConfig.colors it uses
}

export interface AvatarConfig {
    parts: Record<AvatarPartType, string>; // Maps part type to item id
    colors: {
        base: string; // Hex color for skin
        hair: string; // Hex color for hair
        top: string;  // Hex color for clothes
    }
}

export interface JournalTheme {
  id: string;
  name: string;
  previewColor: string; // A simple color for the preview swatch
  styles: {
    backgroundColor: string;
    backgroundImage?: string;
    textColor: string;
    proseColor: string; // for text inside cards
  };
  unlockedBy: BadgeName | null;
}


// --- NEW TYPES FOR DAILY FEATURES ---

export type Mood = 'fericit' | 'liniștit' | 'îngrijorat' | 'trist' | 'entuziasmat';

export interface MoodOption {
  mood: Mood;
  emoji: string;
  color: string;
}

export interface MoodEntry {
  date: string; // YYYY-MM-DD
  mood: Mood;
}

export interface DailyThought {
    date: string; // YYYY-MM-DD
    prompt: string;
    answer: string;
}

export interface StreakData {
    currentStreak: number;
    lastCheckinDate: string; // YYYY-MM-DD
}