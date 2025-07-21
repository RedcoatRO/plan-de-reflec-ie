
import React, { useState } from 'react';
import { MoodEntry, MoodOption } from '../types';
import { MOOD_OPTIONS } from '../constants';

interface MoodCalendarProps {
  moodEntries: MoodEntry[];
}

const MoodCalendar: React.FC<MoodCalendarProps> = ({ moodEntries }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Create a map for quick mood lookup by date (YYYY-MM-DD)
  const moodsByDate = new Map(moodEntries.map(entry => [entry.date, entry]));
  const moodColors = new Map(MOOD_OPTIONS.map(opt => [opt.mood, opt.color]));

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  const handleGoToToday = () => {
    setCurrentDate(new Date());
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString('ro-RO', { month: 'long' });
  
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  // Adjust for Sunday being 0 in JS, we want Monday as 0
  const startingDay = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1; 
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: startingDay }, (_, i) => i);
  const weekDays = ['L', 'Ma', 'Mi', 'J', 'V', 'S', 'D'];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-6xl font-bold text-center text-slate-700 mb-4">Calendarul Meu de Dispoziție</h1>
      <p className="text-2xl text-center text-slate-500 mb-8">Vezi cum te-ai simțit în fiecare zi.</p>
      
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <button onClick={handlePrevMonth} className="text-3xl p-2 rounded-full hover:bg-slate-100">‹</button>
          <div className="text-center">
            <h2 className="text-4xl font-bold text-slate-700 capitalize">{monthName} {year}</h2>
            <button onClick={handleGoToToday} className="text-lg text-rose-500 hover:underline">Mergi la azi</button>
          </div>
          <button onClick={handleNextMonth} className="text-3xl p-2 rounded-full hover:bg-slate-100">›</button>
        </div>
        
        <div className="grid grid-cols-7 gap-2 text-center text-xl font-bold text-slate-500 mb-2">
          {weekDays.map(day => <div key={day}>{day}</div>)}
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {blanks.map(blank => <div key={`blank-${blank}`}></div>)}
          {days.map(day => {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const moodEntry = moodsByDate.get(dateStr);
            const moodOpt = moodEntry ? MOOD_OPTIONS.find(m => m.mood === moodEntry.mood) : null;
            const bgColor = moodOpt ? moodOpt.color : 'bg-slate-100';
            const emoji = moodOpt ? moodOpt.emoji : '';
            
            return (
              <div 
                key={day} 
                className={`h-24 rounded-lg flex flex-col items-center justify-center transition ${bgColor}`}
              >
                <span className="text-2xl font-bold text-slate-700">{day}</span>
                {emoji && <span className="text-3xl mt-1">{emoji}</span>}
              </div>
            );
          })}
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mt-8">
            {MOOD_OPTIONS.map(opt => (
                <div key={opt.mood} className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-full ${opt.color}`}></div>
                    <span className="capitalize text-lg text-slate-600">{opt.mood}</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MoodCalendar;
