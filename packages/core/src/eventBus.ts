/* ============================================================
   EventBus — typed pub/sub
   ============================================================ */

export interface EventMap {
  'nickname:changed':   { nickname: string };
  'theme:changed':      { theme: 'dark' | 'light' };
  'settings:changed':   Record<string, unknown>;
  'game:play':          void;
  'game:pause':         void;
  'lobby:ready':        { playerId: string; ready: boolean };
  'lobby:message':      { playerId: string; text: string; ts: number };
  'toast:show':         { message: string; type?: 'info' | 'success' | 'error' | 'warning'; duration?: number };
}

type Listener<T> = (payload: T) => void;

class EventBus {
  private listeners: Map<string, Set<Listener<unknown>>> = new Map();

  on<K extends keyof EventMap>(event: K, fn: Listener<EventMap[K]>): () => void {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event)!.add(fn as Listener<unknown>);
    return () => this.off(event, fn);
  }

  off<K extends keyof EventMap>(event: K, fn: Listener<EventMap[K]>): void {
    this.listeners.get(event)?.delete(fn as Listener<unknown>);
  }

  emit<K extends keyof EventMap>(event: K, payload: EventMap[K]): void {
    this.listeners.get(event)?.forEach(fn => fn(payload));
  }
}

export const bus = new EventBus();
