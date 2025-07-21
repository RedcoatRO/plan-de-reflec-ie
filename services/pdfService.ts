
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import React from 'react';
import { createRoot } from 'react-dom/client';
import PrintableEntry from '../components/PrintableEntry';
import { JournalEntry, JournalTheme, AvatarConfig } from '../types';

/**
 * Helper function to render an entry to a canvas.
 * It creates a temporary DOM element, renders the PrintableEntry component into it,
 * waits for it to be fully loaded, then uses html2canvas to capture it.
 * @returns A promise that resolves with the canvas element.
 */
async function renderEntryToCanvas(entry: JournalEntry, theme: JournalTheme, avatarConfig: AvatarConfig): Promise<HTMLCanvasElement> {
    return new Promise(async (resolve, reject) => {
        // Create a temporary container for rendering the printable component off-screen.
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        container.style.top = '0px';
        document.body.appendChild(container);

        const root = createRoot(container);
        
        // This function will be called by PrintableEntry when it has finished loading all its images.
        const onLoaded = async () => {
            try {
                const canvas = await html2canvas(container, {
                    useCORS: true, // Important for external images if any
                    allowTaint: true,
                    scale: 2, // Increase scale for better resolution
                });
                // Cleanup the temporary DOM elements
                root.unmount();
                document.body.removeChild(container);
                resolve(canvas);
            } catch (error) {
                // Cleanup even on error
                root.unmount();
                if(document.body.contains(container)) {
                    document.body.removeChild(container);
                }
                reject(error);
            }
        };

        // Render the component. The `onLoaded` callback is the key to the process.
        root.render(
            React.createElement(PrintableEntry, {
                entry,
                theme,
                avatarConfig,
                onLoaded,
            })
        );
    });
}

/**
 * Exports a single journal entry to a PDF file.
 */
export const exportEntryToPdf = async (entry: JournalEntry, theme: JournalTheme, avatarConfig: AvatarConfig) => {
    const canvas = await renderEntryToCanvas(entry, theme, avatarConfig);
    const imgData = canvas.toDataURL('image/jpeg', 0.9); // Use JPEG for smaller file size

    const pdf = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: [canvas.width, canvas.height] // Use canvas dimensions for a perfect fit
    });

    pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
    pdf.save(`Jurnal-EuSunt-${entry.timestamp}.pdf`);
};

/**
 * Exports all journal entries to a single, multi-page PDF file.
 */
export const exportAllEntriesToPdf = async (entries: JournalEntry[], theme: JournalTheme, avatarConfig: AvatarConfig) => {
    const pdf = new jsPDF('p', 'mm', 'a4'); // Standard A4 size for multi-page document
    let isFirstPage = true;

    for (const entry of entries) {
        if (!isFirstPage) {
            pdf.addPage();
        }

        const canvas = await renderEntryToCanvas(entry, theme, avatarConfig);
        const imgData = canvas.toDataURL('image/jpeg', 0.9);
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        // Add image, maintaining aspect ratio to fit the page
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

        isFirstPage = false;
    }
    
    pdf.save('Jurnal-EuSunt-Complet.pdf');
};
