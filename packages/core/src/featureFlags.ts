/* ============================================================
   Feature Flags — runtime toggles
   ============================================================ */

export type FlagKey =
  | 'THEME_TOGGLE'
  | 'REDUCE_EFFECTS'
  | 'KEYBOARD_SHORTCUTS'
  | 'STATUS_BADGE'
  | 'SEO_META';

const defaults: Record<FlagKey, boolean> = {
  THEME_TOGGLE:       true,
  REDUCE_EFFECTS:     true,
  KEYBOARD_SHORTCUTS: true,
  STATUS_BADGE:       true,
  SEO_META:           true,
};

/* Allow override via window.__BC_FLAGS__ for testing */
function resolveFlags(): Record<FlagKey, boolean> {
  const overrides =
    typeof window !== 'undefined'
      ? (window as Record<string, unknown>).__BC_FLAGS__ as Partial<Record<FlagKey, boolean>> | undefined
      : undefined;
  return { ...defaults, ...overrides };
}

const flags = resolveFlags();

export function isEnabled(flag: FlagKey): boolean {
  return flags[flag] ?? false;
}

export function setFlag(flag: FlagKey, value: boolean): void {
  flags[flag] = value;
}
