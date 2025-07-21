
import React, { useEffect, useRef } from 'react';
import { JournalEntry, JournalTheme, AvatarConfig } from '../types';
import Avatar from './Avatar';
import { BADGES } from '../constants';

interface PrintableEntryProps {
  entry: JournalEntry;
  theme: JournalTheme;
  avatarConfig: AvatarConfig;
  onLoaded: () => void; // Callback to signal when rendering and image loading is complete
}

// This component is designed to be rendered off-screen to create a layout for the PDF.
// It has a fixed size corresponding to an A4 page aspect ratio.
const PrintableEntry: React.FC<PrintableEntryProps> = ({ entry, theme, avatarConfig, onLoaded }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isLoadedRef = useRef(false); // Use a ref to prevent multiple calls to onLoaded

  // The `onLoad` prop of the Avatar component is the key here.
  // When the Avatar signals it's fully rendered (all its SVGs are loaded and colorized),
  // we call the `onLoaded` callback passed to this component.
  const handleAvatarLoaded = () => {
    if (!isLoadedRef.current) {
      isLoadedRef.current = true;
      // A small timeout helps ensure the browser has fully rendered the final image paints.
      setTimeout(() => {
          onLoaded();
      }, 100);
    }
  };

  const themeStyle = {
    backgroundColor: theme.styles.backgroundColor?.startsWith('bg-') ? undefined : theme.styles.backgroundColor,
    backgroundImage: theme.styles.backgroundImage,
    color: theme.styles.textColor?.startsWith('text-') ? undefined : theme.styles.textColor,
  };
  
  const themeClasses = `${theme.styles.backgroundColor || ''} ${theme.styles.textColor || ''}`;
  const proseClasses = `${theme.styles.proseColor || 'text-slate-600'}`;

  const badge = BADGES[entry.badgeName];

  return (
    // A4 aspect ratio: width=794px, height=1123px. We use this for consistent layout.
    <div
      ref={containerRef}
      className={`p-10 ${themeClasses}`}
      style={{ ...themeStyle, width: '794px', minHeight: '1123px', fontFamily: 'sans-serif' }}
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-4xl font-bold">{entry.planTitle}</h1>
          <p className="text-xl opacity-80">{entry.timestamp}</p>
        </div>
        {/* Pass the onLoaded callback to the Avatar's onLoad prop */}
        <Avatar config={avatarConfig} className="w-32 h-32" onLoad={handleAvatarLoaded} />
      </div>

      <div className="space-y-5 text-lg">
        {entry.thoughtPairs.map((pair, index) => (
          <div key={index} className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
            <p className={proseClasses}>
                <span className="font-bold opacity-70">{entry.prompt1}</span>
                <em className="ml-2">"{pair.part1}"</em>
                {pair.connector && <><strong className="mx-1 text-purple-400">{pair.connector}</strong><em className="ml-1">"{pair.part2}"</em></>}
            </p>
            {!pair.connector && (
                <p className={`mt-1 ${proseClasses}`}>
                    <span className="font-bold opacity-70">{entry.prompt2}</span>
                    <em className="ml-2">"{pair.part2}"</em>
                </p>
            )}
            <div className="mt-4 pt-3 border-t border-white/30 space-y-2 text-base">
              <div className="bg-white/20 p-2 rounded-md">
                <p className={`font-semibold opacity-70 ${proseClasses}`}>Tot timpul ești așa sau doar uneori?</p>
                <p className={`italic ${proseClasses}`}>"{pair.reflection1}"</p>
              </div>
              <div className="bg-white/20 p-2 rounded-md">
                <p className={`font-semibold opacity-70 ${proseClasses}`}>Cum te simți când nu ești așa?</p>
                <p className={`italic ${proseClasses}`}>"{pair.reflection2}"</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-10 left-10 right-10 flex justify-between items-center text-lg">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-bold bg-white/30`}>
            <span>{badge.icon}</span>
            <span>{badge.name}</span>
        </div>
        <div className="font-bold opacity-70" style={{ fontFamily: "'Gaegu', cursive" }}>
          Jurnalul "Eu Sunt"
        </div>
      </div>
    </div>
  );
};

export default PrintableEntry;