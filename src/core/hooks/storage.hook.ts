import { useState, useEffect, type Dispatch, type SetStateAction } from 'react';

function getStorageValue<T> (key: string, defaultValue: T): T {
  // getting stored value
  const saved = localStorage.getItem(key);

  if (saved === null) return defaultValue;

  const initial = JSON.parse(saved);
  return initial;
}

export const useLocalStorage = <T>(key: string, defaultValue: T): Array<(T | Dispatch<SetStateAction<T>>)> => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
