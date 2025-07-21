
import React, { useState } from 'react';
import { Mood, DailyThought, MoodEntry } from '../types';
import { MOOD_OPTIONS } from '../constants';

interface DailyCheckinModalProps {
  dailyPrompt: string;
  onSave: (mood: MoodEntry, thought: DailyThought) => void;
  onClose: () => void;
}

const DailyCheckinModal: React.FC<DailyCheckinModalProps> = ({ dailyPrompt, onSave, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [thoughtAnswer, setThoughtAnswer] = useState('');
  const [isClosing, setIsClosing] = useState(false);

  const handleSelectMood = (mood: Mood) => {
    setSelectedMood(mood);
    setStep(2); // Automatically move to the next step
  };
  
  const handleSave = () => {
    if (!selectedMood || !thoughtAnswer.trim()) {
      return; // Should not happen with current flow, but good practice
    }
    const today = new Date().toISOString().split('T')[0];
    const moodEntry: MoodEntry = { date: today, mood: selectedMood };
    const thoughtEntry: DailyThought = { date: today, prompt: dailyPrompt, answer: thoughtAnswer.trim() };
    onSave(moodEntry, thoughtEntry);
    closeModal();
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
        onClose();
    }, 300); // Wait for animation to finish
  };

  return (
    <div 
        className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
        onClick={closeModal}
    >
      <div 
        className={`bg-white rounded-3xl shadow-2xl p-8 m-4 w-full max-w-lg transform transition-all duration-300 ${isClosing ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Step 1: Mood Tracker */}
        {step === 1 && (
          <div className="text-center">
            <h2 className="text-4xl font-bold text-slate-700 mb-2">Bună!</h2>
            <p className="text-2xl text-slate-500 mb-8">Cum te simți azi?</p>
            <div className="flex justify-center gap-4">
              {MOOD_OPTIONS.map(option => (
                <button
                  key={option.mood}
                  onClick={() => handleSelectMood(option.mood)}
                  className={`w-20 h-20 rounded-full text-5xl flex items-center justify-center transform hover:scale-110 transition ${option.color}`}
                >
                  {option.emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Daily Thought */}
        {step === 2 && (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-700 mb-4">Gândul Zilei</h2>
            <p className="text-2xl text-slate-500 mb-6">{dailyPrompt}</p>
            <textarea
              rows={3}
              value={thoughtAnswer}
              onChange={(e) => setThoughtAnswer(e.target.value)}
              className="w-full p-4 text-xl border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-400 transition"
              placeholder="Scrie aici gândul tău..."
            />
            <button
              onClick={handleSave}
              disabled={!thoughtAnswer.trim()}
              className="mt-6 w-full bg-rose-500 text-white text-2xl font-bold py-3 px-8 rounded-full shadow-lg hover:bg-rose-600 transition disabled:bg-rose-300"
            >
              Salvează și Continuă
            </button>
          </div>
        )}
        
        <button onClick={closeModal} className="absolute top-4 right-4 text-3xl text-slate-400 hover:text-slate-600">&times;</button>
      </div>
    </div>
  );
};

export default DailyCheckinModal;
