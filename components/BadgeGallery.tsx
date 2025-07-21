
import React from 'react';
import { BadgeName } from '../types';
import { BADGES, ALL_BADGE_NAMES } from '../constants';

interface BadgeGalleryProps {
  collectedBadges: Set<BadgeName>;
}

const BadgeGallery: React.FC<BadgeGalleryProps> = ({ collectedBadges }) => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-6xl font-bold text-center text-slate-700 mb-4">Galeria Mea de Insigne</h1>
      <p className="text-2xl text-center text-slate-500 mb-12">Fiecare insignă reprezintă un pas în călătoria ta.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {ALL_BADGE_NAMES.map((badgeName) => {
          const badge = BADGES[badgeName];
          const isCollected = collectedBadges.has(badgeName);
          return (
            <div
              key={badge.name}
              className={`p-6 rounded-2xl shadow-lg text-center transition-all duration-300 flex flex-col items-center justify-center h-full ${
                isCollected ? `${badge.bgColor} transform scale-105` : 'bg-slate-100 filter grayscale opacity-60'
              }`}
            >
              <div className={`text-7xl mb-4 ${isCollected ? '' : 'transform scale-90'}`}>{badge.icon}</div>
              <h2 className={`text-3xl font-bold ${isCollected ? badge.textColor : 'text-slate-600'}`}>{badge.name}</h2>
              <p className={`mt-2 text-lg ${isCollected ? badge.textColor : 'text-slate-500'} opacity-80`}>
                {badge.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BadgeGallery;
