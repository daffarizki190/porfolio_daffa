import { useEffect } from 'react';
import { experienceAnimations } from '../utils/animasi';

/**
 * Custom hook to handle experience item animations
 * @param {React.MutableRefObject<HTMLElement[]>} refs - Ref object containing array of refs for experience items
 */
export const useExperienceAnimations = (refs) => {
  useEffect(() => {
    const cleanupFunctions = [];

    if (!refs.current) return;

    refs.current.forEach((ref, index) => {
      if (ref) {
        const cleanup = experienceAnimations.experienceItem(ref, index);
        if (cleanup) {
          cleanupFunctions.push(cleanup);
        }
      }
    });

    // Cleanup function to remove all event listeners
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, []);
};
