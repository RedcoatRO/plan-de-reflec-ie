
import React, { useState, useCallback, useEffect } from 'react';
import { Page, Plan, JournalEntry, BadgeName, MoodEntry, DailyThought, StreakData } from './types';
import Header from './components/Header';
import Homepage from './components/Homepage';
import PlanSelection from './components/PlanSelection';
import JournalView from './components/JournalView';
import MyJournal from './components/MyJournal';
import BadgeGallery from './components/BadgeGallery';
import DailyCheckinModal from './components/DailyCheckinModal';
import MoodCalendar from './components/MoodCalendar';
import { DAILY_PROMPTS } from './constants';

// --- LOCAL STORAGE KEYS ---
const JOURNAL_KEY = 'journalEntries';
const BADGES_KEY = 'collectedBadges';
const MOOD_KEY = 'moodEntries';
const THOUGHT_KEY = 'dailyThoughts';
const STREAK_KEY = 'streakData';


const App: React.FC = () => {
  // --- STATE MANAGEMENT ---
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  
  // State with localStorage persistence
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [collectedBadges, setCollectedBadges] = useState<Set<BadgeName>>(new Set());
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [dailyThoughts, setDailyThoughts] = useState<DailyThought[]>([]);
  const [streakData, setStreakData] = useState<StreakData>({ currentStreak: 0, lastCheckinDate: '' });

  // State for daily check-in flow
  const [showDailyCheckin, setShowDailyCheckin] = useState(false);
  
  // --- DATE & PROMPT HELPERS ---
  const getTodayDateString = () => new Date().toISOString().split('T')[0];
  const getDailyPrompt = () => {
      const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
      return DAILY_PROMPTS[dayOfYear % DAILY_PROMPTS.length];
  };

  // --- LOCAL STORAGE & INITIALIZATION ---
  useEffect(() => {
    // Load all data from localStorage on initial mount
    const loadData = <T,>(key: string, defaultValue: T): T => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (error) {
        console.error(`Error loading ${key} from localStorage`, error);
        return defaultValue;
      }
    };
    
    setJournalEntries(loadData(JOURNAL_KEY, []));
    setCollectedBadges(new Set(loadData(BADGES_KEY, [])));
    setMoodEntries(loadData(MOOD_KEY, []));
    setDailyThoughts(loadData(THOUGHT_KEY, []));
    const loadedStreak: StreakData = loadData(STREAK_KEY, { currentStreak: 0, lastCheckinDate: '' });
    setStreakData(loadedStreak);

    // Determine if the daily check-in modal should be shown
    const today = getTodayDateString();
    if (loadedStreak.lastCheckinDate !== today) {
        // We delay showing the modal slightly to allow the homepage animation to feel smoother
        setTimeout(() => setShowDailyCheckin(true), 1000);
    }
  }, []);

  // --- EFFECTS TO SAVE STATE TO LOCAL STORAGE ---
  // These effects trigger whenever their respective state changes, ensuring data is always persisted.
  useEffect(() => { localStorage.setItem(JOURNAL_KEY, JSON.stringify(journalEntries)); }, [journalEntries]);
  useEffect(() => { localStorage.setItem(BADGES_KEY, JSON.stringify(Array.from(collectedBadges))); }, [collectedBadges]);
  useEffect(() => { localStorage.setItem(MOOD_KEY, JSON.stringify(moodEntries)); }, [moodEntries]);
  useEffect(() => { localStorage.setItem(THOUGHT_KEY, JSON.stringify(dailyThoughts)); }, [dailyThoughts]);
  useEffect(() => { localStorage.setItem(STREAK_KEY, JSON.stringify(streakData)); }, [streakData]);

  // --- NAVIGATION & CORE LOGIC HANDLERS ---
  const handleNavigate = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const handleStart = () => {
    if (showDailyCheckin) {
      // If modal is pending, just stay on home, it will show over it
      return;
    }
    setCurrentPage(Page.PlanSelection);
  };

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setCurrentPage(Page.JournalView);
  };

  const handleSaveEntry = (entry: JournalEntry) => {
    setJournalEntries(prevEntries => [...prevEntries, entry]);
    setCollectedBadges(prevBadges => {
      const newBadges = new Set(prevBadges);
      newBadges.add(entry.badgeName);
      return newBadges;
    });
    setCurrentPage(Page.MyJournal);
  };
  
  // --- DAILY CHECK-IN HANDLER ---
  const handleSaveDailyCheckin = (mood: MoodEntry, thought: DailyThought) => {
    setMoodEntries(prev => [...prev, mood]);
    setDailyThoughts(prev => [...prev, thought]);

    // Calculate new streak
    const today = getTodayDateString();
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0];
    
    let newStreakCount = 1;
    if (streakData.lastCheckinDate === yesterday) {
        newStreakCount = streakData.currentStreak + 1;
    }
    
    const newStreakData = { currentStreak: newStreakCount, lastCheckinDate: today };
    setStreakData(newStreakData);

    // Award streak badges
    const newBadges = new Set(collectedBadges);
    if (newStreakCount >= 3) newBadges.add(BadgeName.Streak3);
    if (newStreakCount >= 7) newBadges.add(BadgeName.Streak7);
    if (newStreakCount >= 30) newBadges.add(BadgeName.Streak30);
    setCollectedBadges(newBadges);

    setShowDailyCheckin(false);
  };

  // --- RENDER LOGIC ---
  const renderContent = () => {
    switch (currentPage) {
      case Page.Home:
        return <Homepage onStart={handleStart} />;
      case Page.PlanSelection:
        return <PlanSelection onSelectPlan={handleSelectPlan} />;
      case Page.JournalView:
        if (selectedPlan) {
          return <JournalView plan={selectedPlan} onSaveEntry={handleSaveEntry} onBack={() => setCurrentPage(Page.PlanSelection)} />;
        }
        return <PlanSelection onSelectPlan={handleSelectPlan} />;
      case Page.MyJournal:
        return <MyJournal entries={journalEntries} onNavigateToPlans={() => setCurrentPage(Page.PlanSelection)} />;
      case Page.BadgeGallery:
        return <BadgeGallery collectedBadges={collectedBadges} />;
      case Page.MoodCalendar:
        return <MoodCalendar moodEntries={moodEntries} />;
      default:
        return <Homepage onStart={handleStart} />;
    }
  };

  return (
    <main className="text-slate-700 text-xl bg-slate-50 min-h-screen">
      {/* Show Header on all pages except Home */}
      {currentPage !== Page.Home && <Header onNavigate={handleNavigate} streakData={streakData} />}
      
      {/* Conditionally render the daily check-in modal on top of the current page */}
      {showDailyCheckin && currentPage === Page.Home && (
          <DailyCheckinModal 
            dailyPrompt={getDailyPrompt()}
            onSave={handleSaveDailyCheckin}
            onClose={() => setShowDailyCheckin(false)}
          />
      )}

      {renderContent()}
    </main>
  );
};

export default App;
