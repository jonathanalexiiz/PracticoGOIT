'use client';

import { useMemo, useSyncExternalStore } from 'react';

type Usuario = {
  id: string;
  name: string;
  email: string;
  role: string;
};

const USER_KEY = 'user';

function subscribe(onStoreChange: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === USER_KEY) {
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

  return localStorage.getItem(USER_KEY);
}

function getServerSnapshot() {
  return null;
}

export default function useStoredUser() {
  const userJson = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const usuario = useMemo(() => {
    if (!userJson) {
      return null;
    }

    try {
      return JSON.parse(userJson) as Usuario;
    } catch {
      return null;
    }
  }, [userJson]);

  return usuario;
}