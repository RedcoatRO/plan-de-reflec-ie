
import { Plan, Badge, BadgeName, MoodOption } from './types';

export const MIN_AFFIRMATIONS = 7;
export const MAX_AFFIRMATIONS = 15;

export const PLANS: Plan[] = [
  { id: 1, title: 'Eu sunt...', prompt1: 'Eu sunt...', prompt2: '...', connectors: ['datorită', 'din cauza'], bgColor: 'bg-sky-200', textColor: 'text-sky-800', badge: BadgeName.Identitate },
  { id: 2, title: 'Aș vrea să fiu...', prompt1: 'Aș vrea să fiu...', prompt2: '...', connectors: ['cu ajutorul', 'prin'], bgColor: 'bg-purple-200', textColor: 'text-purple-800', badge: BadgeName.Visare },
  { id: 3, title: 'Mama', prompt1: 'Mama mă ajută să...', prompt2: 'Fără mama aș fi...', bgColor: 'bg-pink-200', textColor: 'text-pink-800', badge: BadgeName.RecunostintaMama },
  { id: 4, title: 'Tata', prompt1: 'Tata mă ajută să...', prompt2: 'Fără tata aș fi...', bgColor: 'bg-blue-200', textColor: 'text-blue-800', badge: BadgeName.RecunostintaTata },
  { id: 5, title: 'Frate/Soră', prompt1: 'Sora/fratele mă ajută să...', prompt2: 'Fără sora/fratele aș fi...', bgColor: 'bg-green-200', textColor: 'text-green-800', badge: BadgeName.Fratie },
  { id: 6, title: 'Prietenii', prompt1: 'Prietenii mă ajută să...', prompt2: 'Fără prietenii mei aș fi...', bgColor: 'bg-yellow-200', textColor: 'text-yellow-800', badge: BadgeName.Prietenie },
  { id: 7, title: 'Bucuria de a fi', prompt1: 'Eu sunt...', prompt2: '...și mă bucur că...', bgColor: 'bg-orange-200', textColor: 'text-orange-800', badge: BadgeName.Bucurie },
];

export const BADGES: Record<BadgeName, Badge> = {
  [BadgeName.Identitate]: { name: BadgeName.Identitate, icon: '🌟', description: 'Pentru că ai explorat cine ești tu.', bgColor: 'bg-sky-100', textColor: 'text-sky-700' },
  [BadgeName.Visare]: { name: BadgeName.Visare, icon: '☁️', description: 'Pentru că ai îndrăznit să visezi la viitor.', bgColor: 'bg-purple-100', textColor: 'text-purple-700' },
  [BadgeName.RecunostintaMama]: { name: BadgeName.RecunostintaMama, icon: '💖', description: 'Pentru că apreciezi ajutorul mamei.', bgColor: 'bg-pink-100', textColor: 'text-pink-700' },
  [BadgeName.RecunostintaTata]: { name: BadgeName.RecunostintaTata, icon: '💪', description: 'Pentru că apreciezi ajutorul tatălui.', bgColor: 'bg-blue-100', textColor: 'text-blue-700' },
  [BadgeName.Fratie]: { name: BadgeName.Fratie, icon: '🧑‍🤝‍🧑', description: 'Pentru că prețuiești legătura cu fratele/sora.', bgColor: 'bg-green-100', textColor: 'text-green-700' },
  [BadgeName.Prietenie]: { name: BadgeName.Prietenie, icon: '🤗', description: 'Pentru că știi cât de importanți sunt prietenii.', bgColor: 'bg-yellow-100', textColor: 'text-yellow-700' },
  [BadgeName.Bucurie]: { name: BadgeName.Bucurie, icon: '😊', description: 'Pentru că te bucuri de cine ești.', bgColor: 'bg-orange-100', textColor: 'text-orange-700' },
  [BadgeName.Curaj]: { name: BadgeName.Curaj, icon: '🦁', description: 'Pentru că ai avut curajul să te exprimi.', bgColor: 'bg-red-100', textColor: 'text-red-700' },
  [BadgeName.Empatie]: { name: BadgeName.Empatie, icon: '❤️', description: 'Pentru că te-ai gândit la ceilalți.', bgColor: 'bg-rose-100', textColor: 'text-rose-700' },
  [BadgeName.Speranta]: { name: BadgeName.Speranta, icon: '✨', description: 'Pentru că privești cu speranță înainte.', bgColor: 'bg-teal-100', textColor: 'text-teal-700' },
  [BadgeName.Streak3]: { name: BadgeName.Streak3, icon: '🥉', description: 'Serie de 3 zile! Ești pe drumul cel bun!', bgColor: 'bg-amber-100', textColor: 'text-amber-700' },
  [BadgeName.Streak7]: { name: BadgeName.Streak7, icon: '🥈', description: 'Serie de 7 zile! Un obicei se formează!', bgColor: 'bg-slate-100', textColor: 'text-slate-700' },
  [BadgeName.Streak30]: { name: BadgeName.Streak30, icon: '🥇', description: 'Serie de 30 zile! Ești un campion al reflecției!', bgColor: 'bg-yellow-100', textColor: 'text-yellow-700' },
};

export const ALL_BADGE_NAMES = Object.values(BadgeName);

// --- NEW CONSTANTS FOR DAILY FEATURES ---

export const MOOD_OPTIONS: MoodOption[] = [
    { mood: 'fericit', emoji: '😊', color: 'bg-yellow-300' },
    { mood: 'liniștit', emoji: '😌', color: 'bg-green-300' },
    { mood: 'îngrijorat', emoji: '😟', color: 'bg-blue-300' },
    { mood: 'trist', emoji: '😢', color: 'bg-gray-400' },
    { mood: 'entuziasmat', emoji: '🤩', color: 'bg-orange-400' },
];

export const DAILY_PROMPTS: string[] = [
    "Ce lucru mărunt te-a făcut să zâmbești azi?",
    "Descrie un sunet pe care l-ai auzit azi și ți-a plăcut.",
    "Dacă ai avea o superputere pentru o zi, care ar fi și de ce?",
    "Ce culoare crezi că a avut ziua de azi? De ce?",
    "Scrie despre un lucru pe care l-ai învățat azi.",
    "Pentru ce ești recunoscător astăzi?",
    "Ce te-a făcut să te simți mândru de tine azi?",
    "Dacă ai putea oferi un cadou oricui din lume, ce ai oferi și cui?",
    "Care este cel mai frumos vis pe care ți-l amintești?",
    "Ce melodie ți-a rămas în minte astăzi?",
];
