
import React, { useState } from 'react';
import { JournalEntry, ThoughtPair, AvatarConfig, JournalTheme, BadgeName } from '../types';
import { BADGES, JOURNAL_THEMES } from '../constants';
import { exportEntryToPdf, exportAllEntriesToPdf } from '../services/pdfService';
import Spinner from './Spinner';

interface MyJournalProps {
  entries: JournalEntry[];
  onNavigateToPlans: () => void;
  avatarConfig: AvatarConfig;
  activeThemeId: string;
  collectedBadges: Set<BadgeName>;
}

const MyJournal: React.FC<MyJournalProps> = ({ entries, onNavigateToPlans, avatarConfig, activeThemeId, collectedBadges }) => {
  const [isPdfLoading, setIsPdfLoading] = useState<string | null>(null); // 'all' or entry.id

  const activeTheme = JOURNAL_THEMES.find(t => t.id === activeThemeId) || JOURNAL_THEMES[0];

  const handleShareEntry = async (entry: JournalEntry) => {
    // ... existing share logic ...
  };

  const handleShareAll = async () => {
    // ... existing share logic ...
  };
  
  const handleExportPdf = async (entry: JournalEntry) => {
    setIsPdfLoading(entry.id);
    try {
      await exportEntryToPdf(entry, activeTheme, avatarConfig);
    } catch(err) {
      console.error("PDF export failed:", err);
      alert("A apărut o eroare la exportul PDF. Te rog încearcă din nou.");
    } finally {
      setIsPdfLoading(null);
    }
  };

  const handleExportAllPdf = async () => {
    if (entries.length === 0) return;
    setIsPdfLoading('all');
     try {
      await exportAllEntriesToPdf(entries.slice().reverse(), activeTheme, avatarConfig);
    } catch(err) {
      console.error("PDF export failed:", err);
      alert("A apărut o eroare la exportul PDF. Te rog încearcă din nou.");
    } finally {
      setIsPdfLoading(null);
    }
  };

  const mainContainerStyle = {
    backgroundColor: activeTheme.styles.backgroundColor.startsWith('bg-') ? undefined : activeTheme.styles.backgroundColor,
    backgroundImage: activeTheme.styles.backgroundImage,
    color: activeTheme.styles.textColor.startsWith('text-') ? undefined : activeTheme.styles.textColor,
    minHeight: 'calc(100vh - 70px)',
  };

  const mainContainerClasses = `${activeTheme.styles.backgroundColor} ${activeTheme.styles.textColor}`;

  if (entries.length === 0) {
    return (
      <div className="text-center p-12 flex flex-col items-center justify-center" style={{minHeight: 'calc(100vh - 70px)'}}>
        <h1 className="text-5xl font-bold text-slate-700 mb-4">Jurnalul tău este gol</h1>
        <p className="text-2xl text-slate-500 mb-8">Este timpul să începi o nouă aventură a descoperirii!</p>
        <button
          onClick={onNavigateToPlans}
          className="bg-rose-500 text-white text-2xl font-bold py-3 px-8 rounded-full shadow-lg hover:bg-rose-600 transition-transform hover:scale-105"
        >
          Alege un Plan
        </button>
      </div>
    );
  }

  return (
    <div className={`transition-colors duration-500 ${mainContainerClasses}`} style={mainContainerStyle}>
      <div className="container mx-auto p-8">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-center mb-12">
          <h1 className="text-6xl font-bold">Jurnalul Meu</h1>
          <div className="flex gap-2">
            <button
                onClick={handleShareAll}
                className="bg-sky-500 text-white text-xl font-bold py-3 px-6 rounded-full shadow-lg hover:bg-sky-600 transition-transform hover:scale-105 flex items-center gap-2"
            >
              <span>📤</span> Distribuie Text
            </button>
             <button
                onClick={handleExportAllPdf}
                disabled={!!isPdfLoading}
                className="bg-rose-500 text-white text-xl font-bold py-3 px-6 rounded-full shadow-lg hover:bg-rose-600 transition-transform hover:scale-105 flex items-center gap-2 disabled:bg-rose-300"
            >
              {isPdfLoading === 'all' ? <Spinner /> : <span>📄</span>}
              Exportă Tot (PDF)
            </button>
          </div>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {entries.slice().reverse().map((entry) => {
            const badge = BADGES[entry.badgeName];
            return (
              <div key={entry.id} className="break-inside-avoid bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300">
                <div className="p-6">
                  <p className="text-lg text-slate-400">{entry.timestamp}</p>
                  <h2 className="text-3xl font-bold text-slate-800 mb-3">{entry.planTitle}</h2>
                  <div className={`space-y-6 text-xl mb-4 ${activeTheme.styles.proseColor}`}>
                    {entry.thoughtPairs.map((pair, index) => (
                      <div key={index} className="bg-slate-50 p-4 rounded-lg border-l-4 border-slate-200">
                         <p className="text-slate-600">
                            <span className="font-semibold text-slate-500">{entry.prompt1}</span>
                            <em className="ml-2">"{pair.part1}"</em>
                            {pair.connector && <><strong className="mx-1 text-purple-600">{pair.connector}</strong><em className="ml-1">"{pair.part2}"</em></>}
                         </p>
                         {!pair.connector && (
                            <p className="mt-1 text-slate-600">
                               <span className="font-semibold text-slate-500">{entry.prompt2}</span>
                               <em className="ml-2">"{pair.part2}"</em>
                            </p>
                         )}
                        <div className="mt-4 pt-3 border-t border-slate-200 space-y-2">
                            <div className="bg-purple-50 p-2 rounded-md">
                                <p className="font-semibold text-purple-800 text-base">Tot timpul ești așa sau doar uneori?</p>
                                <p className="text-lg text-purple-700"><em>"{pair.reflection1}"</em></p>
                            </div>
                            <div className="bg-purple-50 p-2 rounded-md">
                                <p className="font-semibold text-purple-800 text-base">Cum te simți când nu ești așa?</p>
                                <p className="text-lg text-purple-700"><em>"{pair.reflection2}"</em></p>
                            </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t mt-6">
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-lg font-bold ${badge.bgColor} ${badge.textColor}`}>
                        <span>{badge.icon}</span>
                        <span>{badge.name}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                            onClick={() => handleExportPdf(entry)}
                            disabled={!!isPdfLoading}
                            className="bg-rose-200 text-rose-700 hover:bg-rose-300 font-bold text-lg py-2 px-4 rounded-full transition flex items-center gap-2 disabled:bg-rose-100"
                        >
                           {isPdfLoading === entry.id ? <Spinner /> : <span>📄</span>}
                           PDF
                        </button>
                      </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyJournal;