
import React from 'react';
import { JournalEntry, ThoughtPair } from '../types';
import { BADGES } from '../constants';

interface MyJournalProps {
  entries: JournalEntry[];
  onNavigateToPlans: () => void;
}

const MyJournal: React.FC<MyJournalProps> = ({ entries, onNavigateToPlans }) => {

  // Formats a single thought pair with its reflections for sharing.
  const formatThoughtPairForSharing = (pair: ThoughtPair, entry: JournalEntry): string => {
    let thoughtText = '';
    if (pair.connector) {
      thoughtText = `${entry.prompt1} "${pair.part1}" ${pair.connector} ${pair.part2}.`;
    } else {
      thoughtText = `${entry.prompt1} "${pair.part1}".\n${entry.prompt2} "${pair.part2}".`;
    }
    
    const reflectionText = `\n  Reflecții la acest gând:\n  - Tot timpul ești așa? R: ${pair.reflection1}\n  - Cum te simți când nu ești așa? R: ${pair.reflection2}`;
    
    return `${thoughtText}${reflectionText}`;
  };

  // Formats the entire entry, including all thought pairs and their individual reflections.
  const formatEntryForSharing = (entry: JournalEntry): string => {
    const title = `Jurnal: ${entry.planTitle} (${entry.timestamp})\n`;
    const body = entry.thoughtPairs
      .map(pair => formatThoughtPairForSharing(pair, entry))
      .join('\n\n');
    
    return `${title}\n${body}`;
  };

  const handleShareEntry = async (entry: JournalEntry) => {
    const shareText = formatEntryForSharing(entry);
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Gânduri din Jurnalul Meu: ${entry.planTitle}`,
          text: shareText,
        });
      } catch (error) {
        console.error('Eroare la distribuire:', error);
      }
    } else {
      alert('Funcția de distribuire nu este suportată de acest browser.');
    }
  };
  
  const handleShareAll = async () => {
    if (entries.length === 0) return;
    
    const allEntriesText = entries
      .map(entry => formatEntryForSharing(entry))
      .join('\n\n---\n\n');
      
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Jurnalul Meu de Gânduri',
          text: allEntriesText,
        });
      } catch (error) {
        console.error('Eroare la distribuirea întregului jurnal:', error);
      }
    } else {
      alert('Funcția de distribuire nu este suportată de acest browser.');
    }
  };


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
    <div className="container mx-auto p-8">
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-center mb-12">
        <h1 className="text-6xl font-bold text-slate-700">Jurnalul Meu</h1>
        <button
            onClick={handleShareAll}
            className="bg-sky-500 text-white text-xl font-bold py-3 px-6 rounded-full shadow-lg hover:bg-sky-600 transition-transform hover:scale-105 flex items-center gap-2"
        >
          <span>📤</span>
          Distribuie Tot Jurnalul
        </button>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {entries.slice().reverse().map((entry) => {
          const badge = BADGES[entry.badgeName];
          return (
            <div key={entry.id} className="break-inside-avoid bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300">
              <div className="p-6">
                <p className="text-lg text-slate-400">{entry.timestamp}</p>
                <h2 className="text-3xl font-bold text-slate-800 mb-3">{entry.planTitle}</h2>
                <div className="space-y-6 text-xl text-slate-600 mb-4">
                  {entry.thoughtPairs.map((pair, index) => (
                    <div key={index} className="bg-slate-50 p-4 rounded-lg border-l-4 border-slate-200">
                      {/* Thought part */}
                      {pair.connector ? (
                         <p>
                            <span className="font-semibold text-slate-500">{entry.prompt1}</span>
                            <em className="ml-2">"{pair.part1}"</em>
                            <strong className="mx-1">{pair.connector}</strong>
                            <em className="ml-1">"{pair.part2}"</em>
                         </p>
                      ) : (
                        <>
                          <p>
                            <span className="font-semibold text-slate-500">{entry.prompt1}</span>
                            <em className="ml-2">"{pair.part1}"</em>
                          </p>
                          <p className="mt-1">
                            <span className="font-semibold text-slate-500">{entry.prompt2}</span>
                            <em className="ml-2">"{pair.part2}"</em>
                          </p>
                        </>
                      )}
                      
                      {/* Individual reflections for each thought */}
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
                    <button
                        onClick={() => handleShareEntry(entry)}
                        className="bg-slate-200 text-slate-700 hover:bg-slate-300 font-bold text-lg py-2 px-4 rounded-full transition flex items-center gap-2"
                    >
                       <span>📤</span>
                       Distribuie
                    </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyJournal;
