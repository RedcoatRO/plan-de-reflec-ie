
import { Plan, Badge, BadgeName, MoodOption, AvatarItem, AvatarConfig, JournalTheme } from './types';

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

// --- NEW CONSTANTS FOR CUSTOMIZATION ---

export const SKIN_COLORS = ['#f2d5b1', '#ebbda2', '#e2a389', '#c98a6f', '#a16853', '#835444'];
export const HAIR_COLORS = ['#2c222b', '#583e34', '#a76a44', '#f5cb6c', '#e47f48', '#af3c35'];
export const CLOTHING_COLORS = ['#e9536c', '#f0a843', '#68b8b3', '#7184b2', '#a371b2', '#4c4c4c'];

export const DEFAULT_AVATAR_CONFIG: AvatarConfig = {
    parts: {
        base: 'base-1',
        hair: 'hair-1',
        eyes: 'eyes-1',
        mouth: 'mouth-1',
        top: 'top-1',
        accessory: 'acc-none',
    },
    colors: {
        base: SKIN_COLORS[0],
        hair: HAIR_COLORS[0],
        top: CLOTHING_COLORS[0],
    }
};

const placeholderSvg = (fill: string, d: string) => `data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='${fill}' d='${d}'/%3E%3C/svg%3E`;

export const AVATAR_ITEMS: AvatarItem[] = [
    // --- Base ---
    { id: 'base-1', type: 'base', name: 'Bază', imageUrl: `data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M89.3,64.6c-2.3-11.4-7.5-22.1-15-30.8C64,19.3,51.8,13.8,38.8,15.8C25.4,17.9,14.5,27,8.9,39.3c-4.6,10-6,21.1-4,31.7c1.7,9.3,5.6,18.1,11.5,25.2C22,102.8,29,106.1,36.5,106c14.2-0.2,27.3-8.8,34.8-21.2C78.7,72.4,85.5,62.3,89.3,64.6z' fill='FILL_COLOR'/%3E%3C/svg%3E`, unlockedBy: null, colorizable: 'base' },

    // --- Eyes ---
    { id: 'eyes-1', type: 'eyes', name: 'Ochi Simpli', imageUrl: `data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Cellipse fill='%23fff' cx='35' cy='50' rx='5' ry='7'/%3E%3Cellipse fill='%232e2e2e' cx='35' cy='50' rx='2.5' ry='3.5'/%3E%3Cellipse fill='%23fff' cx='65' cy='50' rx='5' ry='7'/%3E%3Cellipse fill='%232e2e2e' cx='65' cy='50' rx='2.5' ry='3.5'/%3E%3C/g%3E%3C/svg%3E`, unlockedBy: null },
    { id: 'eyes-2', type: 'eyes', name: 'Ochi Închiși', imageUrl: `data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Cpath d='M30,50 Q35,55 40,50' stroke='%232e2e2e' stroke-width='2' fill='none'/%3E%3Cpath d='M60,50 Q65,55 70,50' stroke='%232e2e2e' stroke-width='2' fill='none'/%3E%3C/g%3E%3C/svg%3E`, unlockedBy: BadgeName.Bucurie },
    { id: 'eyes-3', type: 'eyes', name: 'Ochi Sclipitori', imageUrl: `data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Cpath fill='%232e2e2e' d='M30 48 l10 0 l-5 8 z'/%3E%3Cpath fill='%232e2e2e' d='M60 48 l10 0 l-5 8 z'/%3E%3C/g%3E%3C/svg%3E`, unlockedBy: BadgeName.Visare },

    // --- Mouth ---
    { id: 'mouth-1', type: 'mouth', name: 'Zâmbet Mic', imageUrl: `data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40,65 Q50,72 60,65' stroke='%232e2e2e' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E`, unlockedBy: null },
    { id: 'mouth-2', type: 'mouth', name: 'Zâmbet Larg', imageUrl: `data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40,65 Q50,80 60,65' fill='%23fff' stroke='%232e2e2e' stroke-width='2'/%3E%3C/svg%3E`, unlockedBy: BadgeName.Prietenie },
    { id: 'mouth-3', type: 'mouth', name: 'Gură Surprinsă', imageUrl: `data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='50' cy='70' rx='5' ry='7' fill='%232e2e2e'/%3E%3C/svg%3E`, unlockedBy: BadgeName.Identitate },

    // --- Hair ---
    { id: 'hair-1', type: 'hair', name: 'Păr Scurt', imageUrl: `data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='FILL_COLOR' d='M25,45 C15,40 10,20 25,15 C40,5 60,5 75,15 C90,20 85,40 75,45 Q50,40 25,45 z'/%3E%3C/svg%3E`, unlockedBy: null, colorizable: 'hair' },
    { id: 'hair-2', type: 'hair', name: 'Breton', imageUrl: `data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='FILL_COLOR' d='M22,40 C12,35 12,15 22,15 C35,10 65,10 78,15 C88,15 88,35 78,40 L22,40 z'/%3E%3C/svg%3E`, unlockedBy: null, colorizable: 'hair' },
    { id: 'hair-3', type: 'hair', name: 'Păr Mediu Ondulat', imageUrl: `data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='FILL_COLOR' d='M20,50 C5,45 5,15 25,15 C40,0 60,0 75,15 C95,15 95,45 80,50 Q50,60 20,50 z'/%3E%3C/svg%3E`, unlockedBy: BadgeName.Curaj, colorizable: 'hair' },
    { id: 'hair-4', type: 'hair', name: 'Coadă de cal', imageUrl: `data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='FILL_COLOR' d='M25,45 C15,40 10,20 25,15 C40,5 60,5 75,15 C90,20 85,40 75,45 Q50,40 25,45 z'/%3E%3Cpath fill='FILL_COLOR' d='M75,35 Q85,55 70,75 L65,70 Q80,55 75,35 z'/%3E%3C/svg%3E`, unlockedBy: BadgeName.Speranta, colorizable: 'hair' },

    // --- Tops ---
    { id: 'top-1', type: 'top', name: 'Tricou', imageUrl: `data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='FILL_COLOR' d='M25,80 L75,80 L80,95 L20,95 z' transform='translate(0, -10)'/%3E%3C/svg%3E`, unlockedBy: null, colorizable: 'top' },
    { id: 'top-2', type: 'top', name: 'Hanorac', imageUrl: `data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='FILL_COLOR' d='M20,75 L80,75 L85,100 L15,100 z' transform='translate(0, -10)'/%3E%3Crect fill='FILL_COLOR' x='40' y='65' width='20' height='10' rx='5' transform='translate(0, -10)'/%3E%3C/svg%3E`, unlockedBy: BadgeName.RecunostintaTata, colorizable: 'top' },
    
    // --- Accessories ---
    { id: 'acc-none', type: 'accessory', name: 'Nimic', imageUrl: `data:image/svg+xml,%3Csvg/%3E`, unlockedBy: null },
    { id: 'acc-glasses', type: 'accessory', name: 'Ochelari', imageUrl: `data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%232e2e2e' stroke-width='3'%3E%3Ccircle cx='35' cy='50' r='10'/%3E%3Ccircle cx='65' cy='50' r='10'/%3E%3Cpath d='M45 50 H 55'/%3E%3C/g%3E%3C/svg%3E`, unlockedBy: BadgeName.Empatie },
    { id: 'acc-hat', type: 'accessory', name: 'Pălărie', imageUrl: `data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%236a855b' d='M20 30 L80 30 L70 10 L30 10 Z'/%3E%3C/svg%3E`, unlockedBy: BadgeName.Fratie },
];


export const JOURNAL_THEMES: JournalTheme[] = [
    {
        id: 'default',
        name: 'Clasic',
        previewColor: 'bg-slate-50',
        styles: { backgroundColor: 'bg-slate-50', textColor: 'text-slate-700', proseColor: 'text-slate-600' },
        unlockedBy: null
    },
    {
        id: 'space',
        name: 'Spațiu',
        previewColor: 'bg-gray-800',
        styles: {
            backgroundColor: 'bg-gray-800',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3E.star%7Bfill:white;animation:twinkle 2s ease-in-out infinite%7D@keyframes twinkle%7B0%25,100%25%7Bopacity:0.5%7D50%25%7Bopacity:1%7D%7D%3C/style%3E%3Ccircle class='star' cx='20' cy='20' r='1'/%3E%3Ccircle class='star' cx='80' cy='30' r='1.2' style='animation-delay:0.5s'/%3E%3Ccircle class='star' cx='50' cy='70' r='0.8' style='animation-delay:1s'/%3E%3Ccircle class='star' cx='90' cy='80' r='1' style='animation-delay:1.5s'/%3E%3C/svg%3E")`,
            textColor: 'text-white',
            proseColor: 'text-gray-300'
        },
        unlockedBy: BadgeName.Visare
    },
    {
        id: 'forest',
        name: 'Pădure',
        previewColor: 'bg-green-700',
        styles: {
            backgroundColor: 'bg-green-700',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='200' height='200' fill='%23228B22'/%3E%3Cg fill-opacity='0.4'%3E%3Cpolygon fill='%233CB371' points='100 0 200 100 100 200 0 100'/%3E%3C/g%3E%3C/svg%3E")`,
            textColor: 'text-white',
            proseColor: 'text-green-200'
        },
        unlockedBy: BadgeName.RecunostintaMama
    }
];


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