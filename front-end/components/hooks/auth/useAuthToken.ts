'use client';

import { useSyncExternalStore } from 'react';

const ACCESS_TOKEN_KEY = 'access_token';

function subscribe(onStoreChange: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === ACCESS_TOKEN_KEY) {
      onStoreChange();
    }
  };

  window.addEventListener('storage', handleStorageChange);

  return () => {
    window.removeEventListener('storage', handleStorageChange);
  };
}

function getSnapshot() {
  if (typeof window === 'undefined') {
    return null;
  }

  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function getServerSnapshot() {
  return null;
}

export default function useAuthToken() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}