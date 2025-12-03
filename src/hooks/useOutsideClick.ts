import { useEffect, useRef } from 'react';

type OutsideClickHandler = (event: MouseEvent) => void;

export function useOutsideClick<T extends HTMLElement>(
  onOutsideClick: OutsideClickHandler,
) {
  const ref = useRef<T>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick(event);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onOutsideClick]);

  return ref;
}
