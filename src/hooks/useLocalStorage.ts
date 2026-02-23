'use client';

import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
 const [storedValue, setStoredValue] = useState<T>(initialValue);
 const [isMounted, setIsMounted] = useState(false);

 // Load from localStorage ONLY after mounting on client
 useEffect(() => {
  setIsMounted(true);
  try {
   const item = window.localStorage.getItem(key);
   if (item) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setStoredValue(JSON.parse(item));
   }
  } catch (error) {
   console.log('Error reading localStorage key “' + key + '”:', error);
  }
 }, [key]);

 // Set to localStorage whenever state changes, but ONLY after initial load
 useEffect(() => {
  if (isMounted) {
   try {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
   } catch (error) {
    console.log('Error setting localStorage key “' + key + '”:', error);
   }
  }
 }, [key, storedValue, isMounted]);

 return [storedValue, setStoredValue] as const;
}
