/* ============================================================
   Analytics — local hooks only, no external SDK
   ============================================================ */

interface AnalyticsEvent {
  name: string;
  props?: Record<string, unknown>;
  ts: number;
}

const LOG_KEY = 'bc:analytics';
const MAX_EVENTS = 200;

function readLog(): AnalyticsEvent[] {
  try {
    return JSON.parse(localStorage.getItem(LOG_KEY) ?? '[]') as AnalyticsEvent[];
  } catch {
    return [];
  }
}

function writeLog(events: AnalyticsEvent[]): void {
  try {
    localStorage.setItem(LOG_KEY, JSON.stringify(events.slice(-MAX_EVENTS)));
  } catch { /* noop */ }
}

export function track(name: string, props?: Record<string, unknown>): void {
  const event: AnalyticsEvent = { name, props, ts: Date.now() };
  const log = readLog();
  log.push(event);
  writeLog(log);

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', name, props);
  }
}

export function getLog(): AnalyticsEvent[] {
  return readLog();
}

export function clearLog(): void {
  try { localStorage.removeItem(LOG_KEY); } catch { /* noop */ }
}
