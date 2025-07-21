
import React from 'react';
import { Page, StreakData } from '../types';
import StreakIndicator from './StreakIndicator';

interface HeaderProps {
  onNavigate: (page: Page) => void;
  streakData: StreakData | null;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, streakData }) => {
  const navItems = [
    { page: Page.PlanSelection, label: '📝 Planuri' },
    { page: Page.MyJournal, label: '📖 Jurnalul Meu' },
    { page: Page.MoodCalendar, label: '🗓️ Calendarul Meu'},
    { page: Page.BadgeGallery, label: '🏆 Insigne' },
  ];

  return (
    <header className="bg-white/70 backdrop-blur-lg shadow-md sticky top-0 z-10">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div 
            className="text-3xl font-bold text-rose-500 cursor-pointer"
            onClick={() => onNavigate(Page.Home)}
            style={{ fontFamily: "'Gaegu', cursive" }}
        >
          Eu Sunt
        </div>
        <div className="flex items-center space-x-6">
          <ul className="flex items-center space-x-6">
            {navItems.map(item => (
              <li key={item.page}>
                <button
                  onClick={() => onNavigate(item.page)}
                  className="text-xl text-slate-600 hover:text-rose-500 transition-colors duration-300"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          {streakData && <StreakIndicator streak={streakData.currentStreak} />}
        </div>
      </nav>
    </header>
  );
};

export default Header;
