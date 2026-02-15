/* ============================================================
   Storage — typed localStorage wrapper
   ============================================================ */

export interface StorageSchema {
  nickname: string;
  theme: 'dark' | 'light';
  soundEnabled: boolean;
  fpsCounter: boolean;
  quality: 'low' | 'med' | 'high';
  inputMode: 'auto' | 'touch' | 'mouse';
  reduceEffects: boolean;
}

const PREFIX = 'bc:';

function key(k: keyof StorageSchema): string {
  return PREFIX + k;
}

export const storage = {
  get<K extends keyof StorageSchema>(k: K): StorageSchema[K] | null {
    try {
      const raw = localStorage.getItem(key(k));
      if (raw === null) return null;
      return JSON.parse(raw) as StorageSchema[K];
    } catch {
      return null;
    }
  },

  set<K extends keyof StorageSchema>(k: K, v: StorageSchema[K]): void {
    try {
      localStorage.setItem(key(k), JSON.stringify(v));
    } catch {
      /* storage full or unavailable */
    }
  },

  remove<K extends keyof StorageSchema>(k: K): void {
    try {
      localStorage.removeItem(key(k));
    } catch { /* noop */ }
  },

  getOrDefault<K extends keyof StorageSchema>(k: K, def: StorageSchema[K]): StorageSchema[K] {
    const v = storage.get(k);
    return v !== null ? v : def;
  },
};
