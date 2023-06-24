import { useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export const useWindowResize = (callback: () => void) => {
  const debounced = useDebouncedCallback(callback, 100);

  useEffect(() => {
    window.addEventListener('resize', debounced);

    return () => {
      window.removeEventListener('resize', debounced);
    };
  }, [debounced]);
};