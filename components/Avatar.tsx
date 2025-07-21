
import React from 'react';
import { AvatarConfig, AvatarItem } from '../types';
import { AVATAR_ITEMS } from '../constants';

interface AvatarProps {
  config: AvatarConfig;
  className?: string;
  onLoad?: () => void;
}

// Helper to find an item by its ID from the master list
const findItem = (id: string): AvatarItem | undefined => AVATAR_ITEMS.find(item => item.id === id);

// Helper function to replace the color placeholder in an SVG data URL
const colorizeSvg = (svgUrl: string, color: string): string => {
  // Use a regex to robustly replace FILL_COLOR, handling URL encoding.
  // We decode, replace, and re-encode the component with the color.
  try {
    const decodedUrl = decodeURIComponent(svgUrl);
    // Colors with '#' need to be encoded for data URLs.
    const encodedColor = encodeURIComponent(color);
    const colorizedUrl = decodedUrl.replace(/FILL_COLOR/g, color);
    return colorizedUrl;
  } catch (e) {
    // Fallback for malformed URLs
    console.error("Failed to colorize SVG", e);
    return svgUrl;
  }
};


const Avatar: React.FC<AvatarProps> = ({ config, className = '', onLoad }) => {
  // Define the rendering order of avatar parts
  const partOrder: (keyof AvatarConfig['parts'])[] = ['base', 'top', 'mouth', 'eyes', 'hair', 'accessory'];

  const partsToRender = partOrder
    .map(partType => {
      const itemId = config.parts[partType];
      const item = findItem(itemId);
      if (!item) return null;

      let finalImageUrl = item.imageUrl;
      // If the part is colorizable, apply the selected color
      if (item.colorizable && config.colors[item.colorizable]) {
        finalImageUrl = colorizeSvg(item.imageUrl, config.colors[item.colorizable]);
      }
      
      return { ...item, finalImageUrl };
    })
    .filter(Boolean) as (AvatarItem & { finalImageUrl: string })[];

  // This effect checks when all images in the avatar have finished loading.
  // It's crucial for the PDF export to know when it can safely capture the component.
  React.useEffect(() => {
    if (!onLoad) return;

    const imageElements = partsToRender.map(part => {
        const img = new Image();
        img.src = part.finalImageUrl;
        return img;
    });

    const promises = imageElements.map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve; // Resolve even on error to not block forever
      });
    });

    Promise.all(promises).then(() => {
      // Use a small timeout to ensure the browser has painted the images
      setTimeout(onLoad, 50);
    });
  }, [config, onLoad]); // Rerun when config changes


  return (
    <div className={`relative w-48 h-48 ${className}`}>
      {partsToRender.map(part => (
        <img
          key={part.id}
          src={part.finalImageUrl}
          alt={part.name}
          className="absolute top-0 left-0 w-full h-full object-contain"
          // We don't use the img onload event directly here because we need to wait for ALL images.
          // The useEffect handles the collective loading state.
        />
      ))}
    </div>
  );
};

export default Avatar;