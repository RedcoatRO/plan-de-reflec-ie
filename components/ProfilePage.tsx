
import React, { useState } from 'react';
import { AvatarConfig, BadgeName, JournalTheme, AvatarPartType } from '../types';
import { AVATAR_ITEMS, JOURNAL_THEMES, BADGES, SKIN_COLORS, HAIR_COLORS, CLOTHING_COLORS } from '../constants';
import Avatar from './Avatar';

interface ProfilePageProps {
  avatarConfig: AvatarConfig;
  setAvatarConfig: (config: AvatarConfig) => void;
  collectedBadges: Set<BadgeName>;
  activeThemeId: string;
  setActiveThemeId: (id: string) => void;
}

// Sub-component for picking a color from a palette
const ColorPicker: React.FC<{
    colors: string[];
    selectedColor: string;
    onSelect: (color: string) => void;
}> = ({ colors, selectedColor, onSelect }) => (
    <div className="flex flex-wrap gap-3 mt-2">
        {colors.map(color => (
            <button
                key={color}
                onClick={() => onSelect(color)}
                className={`w-10 h-10 rounded-full border-4 transition-transform hover:scale-110 ${selectedColor === color ? 'border-rose-500' : 'border-white'}`}
                style={{ backgroundColor: color }}
                title={color}
            />
        ))}
    </div>
);

// Sub-component for picking an item (hair, eyes, etc.)
const ItemPicker: React.FC<{
    items: typeof AVATAR_ITEMS;
    currentId: string;
    onSelect: (id: string) => void;
    collectedBadges: Set<BadgeName>;
}> = ({ items, currentId, onSelect, collectedBadges }) => (
    <div className="grid grid-cols-4 gap-4">
        {items.map(item => {
            const isUnlocked = !item.unlockedBy || collectedBadges.has(item.unlockedBy);
            const isSelected = item.id === currentId;
            const badgeToUnlock = item.unlockedBy ? BADGES[item.unlockedBy] : null;

            return (
                <button
                    key={item.id}
                    onClick={() => isUnlocked && onSelect(item.id)}
                    disabled={!isUnlocked}
                    className={`aspect-square p-2 rounded-lg border-4 transition-all relative flex items-center justify-center ${
                        isSelected ? 'border-rose-500 scale-105' : 'border-slate-200'
                    } ${!isUnlocked ? 'bg-slate-100' : 'bg-white hover:border-rose-400'}`}
                    title={isUnlocked ? item.name : `Deblocat cu insigna: ${badgeToUnlock?.name}`}
                >
                    <img src={item.imageUrl.replace('FILL_COLOR', '#cccccc')} alt={item.name} className="w-full h-full object-contain"/>
                    {!isUnlocked && (
                        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-center p-1 rounded-sm">
                            <span className="text-3xl" title={`Insigna: ${badgeToUnlock?.name}`}>{badgeToUnlock?.icon}</span>
                        </div>
                    )}
                </button>
            );
        })}
    </div>
);


const ProfilePage: React.FC<ProfilePageProps> = ({ avatarConfig, setAvatarConfig, collectedBadges, activeThemeId, setActiveThemeId }) => {
    const [activeCategory, setActiveCategory] = useState<AvatarPartType>('hair');

    const handlePartChange = (type: AvatarPartType, id: string) => {
        setAvatarConfig({ ...avatarConfig, parts: { ...avatarConfig.parts, [type]: id } });
    };

    const handleColorChange = (type: 'base' | 'hair' | 'top', color: string) => {
        setAvatarConfig({ ...avatarConfig, colors: { ...avatarConfig.colors, [type]: color } });
    };
    
    const categories: { type: AvatarPartType; icon: string; name: string }[] = [
        { type: 'base', icon: '👤', name: 'Piele' },
        { type: 'hair', icon: '✂️', name: 'Păr' },
        { type: 'eyes', icon: '👁️', name: 'Ochi' },
        { type: 'mouth', icon: '👄', name: 'Gură' },
        { type: 'top', icon: '👕', name: 'Haine' },
        { type: 'accessory', icon: '🧢', name: 'Accesorii' },
    ];
    
    const activeCategoryInfo = categories.find(c => c.type === activeCategory)!;
    const itemsForCategory = AVATAR_ITEMS.filter(item => item.type === activeCategory);
    const isColorizable = itemsForCategory[0]?.colorizable;

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-6xl font-bold text-center text-slate-700 mb-12">Profilul Meu</h1>
            
            {/* --- Avatar Editor --- */}
            <div className="bg-white p-8 rounded-2xl shadow-lg mb-12">
                <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b pb-3">Personalizează Avatarul</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Categories */}
                    <div className="flex md:flex-col gap-3 flex-wrap justify-center">
                        {categories.map(cat => (
                             <button
                                key={cat.type}
                                onClick={() => setActiveCategory(cat.type)}
                                className={`flex items-center md:flex-row flex-col gap-3 p-3 rounded-lg transition-all w-full text-left text-xl font-bold ${activeCategory === cat.type ? 'bg-rose-100 text-rose-600' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                            >
                                <span className="text-3xl">{cat.icon}</span>
                                <span>{cat.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Item and Color Pickers */}
                    <div className="bg-slate-50 p-6 rounded-lg">
                        <ItemPicker 
                            items={itemsForCategory}
                            currentId={avatarConfig.parts[activeCategory]}
                            onSelect={(id) => handlePartChange(activeCategory, id)}
                            collectedBadges={collectedBadges}
                        />
                        {isColorizable === 'base' && <ColorPicker colors={SKIN_COLORS} selectedColor={avatarConfig.colors.base} onSelect={color => handleColorChange('base', color)} />}
                        {isColorizable === 'hair' && <ColorPicker colors={HAIR_COLORS} selectedColor={avatarConfig.colors.hair} onSelect={color => handleColorChange('hair', color)} />}
                        {isColorizable === 'top' && <ColorPicker colors={CLOTHING_COLORS} selectedColor={avatarConfig.colors.top} onSelect={color => handleColorChange('top', color)} />}
                    </div>

                    {/* Avatar Preview */}
                    <div className="flex justify-center items-center">
                         <Avatar config={avatarConfig} className="w-64 h-64" />
                    </div>
                </div>
            </div>


            {/* --- Theme Editor --- */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
                 <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b pb-3">Teme pentru Jurnal</h2>
                 <div className="flex flex-wrap gap-4">
                    {JOURNAL_THEMES.map(theme => {
                        const isUnlocked = !theme.unlockedBy || collectedBadges.has(theme.unlockedBy);
                        const isSelected = theme.id === activeThemeId;
                        const badgeToUnlock = theme.unlockedBy ? BADGES[theme.unlockedBy] : null;

                        return (
                            <button
                                key={theme.id}
                                onClick={() => isUnlocked && setActiveThemeId(theme.id)}
                                disabled={!isUnlocked}
                                className={`p-4 rounded-lg border-4 transition-all relative flex flex-col items-center gap-2 ${
                                    isSelected ? 'border-rose-500 scale-105' : 'border-slate-200'
                                } ${!isUnlocked ? 'bg-slate-100' : 'bg-white hover:border-rose-400'}`}
                                title={isUnlocked ? theme.name : `Deblocat cu insigna: ${badgeToUnlock?.name}`}
                            >
                                <div className={`w-16 h-16 rounded-md ${theme.previewColor}`}></div>
                                <span className={`font-bold ${isUnlocked ? 'text-slate-700' : 'text-slate-400'}`}>{theme.name}</span>
                                {!isUnlocked && (
                                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-center p-1 rounded-sm">
                                        <span className="text-3xl" title={`Insigna: ${badgeToUnlock?.name}`}>{badgeToUnlock?.icon}</span>
                                    </div>
                                )}
                            </button>
                        )
                    })}
                 </div>
            </div>
        </div>
    );
};

export default ProfilePage;