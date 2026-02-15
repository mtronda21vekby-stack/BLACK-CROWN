/* ============================================================
   Lobby — model types and anti-spam
   ============================================================ */

export interface Player {
  id:       string;
  nickname: string;
  ready:    boolean;
  isHost:   boolean;
}

export interface ChatMessage {
  id:         string;
  playerId:   string;
  playerName: string;
  text:       string;
  ts:         number;
}

export const MAX_PLAYERS  = 8;
export const MAX_MSG_LEN  = 200;
export const RATE_LIMIT_MS = 1500;   // min ms between messages
export const MAX_MSGS_WINDOW = 5;    // max N messages per window
export const RATE_WINDOW_MS  = 8000; // rolling window

/* ─── Anti-spam ─── */
export class AntiSpam {
  private timestamps: number[] = [];
  private lastText   = '';

  check(text: string): { ok: boolean; reason?: string } {
    const now = Date.now();

    // Length
    if (text.trim().length === 0)        return { ok: false, reason: 'Пустое сообщение' };
    if (text.length > MAX_MSG_LEN)       return { ok: false, reason: `Максимум ${MAX_MSG_LEN} символов` };

    // Duplicate
    if (text.trim() === this.lastText.trim()) return { ok: false, reason: 'Дублирующееся сообщение' };

    // Rate limit (min interval)
    const last = this.timestamps[this.timestamps.length - 1];
    if (last && now - last < RATE_LIMIT_MS) {
      return { ok: false, reason: 'Слишком часто. Подождите немного.' };
    }

    // Rolling window flood
    this.timestamps = this.timestamps.filter(t => now - t < RATE_WINDOW_MS);
    if (this.timestamps.length >= MAX_MSGS_WINDOW) {
      return { ok: false, reason: 'Превышен лимит сообщений. Притормозите.' };
    }

    return { ok: true };
  }

  record(text: string): void {
    this.timestamps.push(Date.now());
    this.lastText = text;
  }
}

/* ─── Generate demo players ─── */
export function makeDemoPlayers(myNickname: string): Player[] {
  const bots = ['AquaBot', 'DeepFisher', 'SeaKing', 'OceanLord', 'TidalWave', 'CoralBoss', 'SharkBait'];
  const players: Player[] = [
    { id: 'me', nickname: myNickname, ready: false, isHost: true },
  ];
  for (let i = 0; i < 3; i++) {
    players.push({
      id:       `bot-${i}`,
      nickname: bots[i],
      ready:    Math.random() > 0.4,
      isHost:   false,
    });
  }
  return players;
}
