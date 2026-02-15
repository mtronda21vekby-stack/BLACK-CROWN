/* ============================================================
   WS Abstraction
   - mock://...  → BroadcastChannel (cross-tab sync)
   - ws://...    → native WebSocket
   ============================================================ */

export type WSMessage = {
  type: string;
  payload: unknown;
};

export interface WSConnection {
  send(msg: WSMessage): void;
  close(): void;
  onMessage(fn: (msg: WSMessage) => void): () => void;
  onOpen(fn: () => void): () => void;
  onClose(fn: () => void): () => void;
}

/* ---- Mock via BroadcastChannel ---- */
class MockWS implements WSConnection {
  private channel: BroadcastChannel;
  private msgListeners: Set<(msg: WSMessage) => void> = new Set();
  private openListeners: Set<() => void> = new Set();
  private closeListeners: Set<() => void> = new Set();

  constructor(channelName: string) {
    this.channel = new BroadcastChannel(channelName);
    this.channel.onmessage = (ev: MessageEvent) => {
      const msg = ev.data as WSMessage;
      this.msgListeners.forEach(fn => fn(msg));
    };
    // Simulate async open
    setTimeout(() => this.openListeners.forEach(fn => fn()), 0);
  }

  send(msg: WSMessage): void {
    this.channel.postMessage(msg);
    // Echo to self
    this.msgListeners.forEach(fn => fn(msg));
  }

  close(): void {
    this.channel.close();
    this.closeListeners.forEach(fn => fn());
  }

  onMessage(fn: (msg: WSMessage) => void): () => void {
    this.msgListeners.add(fn);
    return () => this.msgListeners.delete(fn);
  }

  onOpen(fn: () => void): () => void {
    this.openListeners.add(fn);
    return () => this.openListeners.delete(fn);
  }

  onClose(fn: () => void): () => void {
    this.closeListeners.add(fn);
    return () => this.closeListeners.delete(fn);
  }
}

/* ---- Real WS ---- */
class RealWS implements WSConnection {
  private ws: WebSocket;
  private msgListeners: Set<(msg: WSMessage) => void> = new Set();
  private openListeners: Set<() => void> = new Set();
  private closeListeners: Set<() => void> = new Set();

  constructor(url: string) {
    this.ws = new WebSocket(url);
    this.ws.onmessage = (ev) => {
      try {
        const msg = JSON.parse(ev.data as string) as WSMessage;
        this.msgListeners.forEach(fn => fn(msg));
      } catch { /* malformed */ }
    };
    this.ws.onopen  = () => this.openListeners.forEach(fn => fn());
    this.ws.onclose = () => this.closeListeners.forEach(fn => fn());
  }

  send(msg: WSMessage): void {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(msg));
    }
  }

  close(): void { this.ws.close(); }

  onMessage(fn: (msg: WSMessage) => void): () => void {
    this.msgListeners.add(fn);
    return () => this.msgListeners.delete(fn);
  }

  onOpen(fn: () => void): () => void {
    this.openListeners.add(fn);
    return () => this.openListeners.delete(fn);
  }

  onClose(fn: () => void): () => void {
    this.closeListeners.add(fn);
    return () => this.closeListeners.delete(fn);
  }
}

/* ---- Factory ---- */
export function createWS(url: string): WSConnection {
  if (url.startsWith('mock://')) {
    const channelName = url.replace('mock://', 'bc-ws-');
    return new MockWS(channelName);
  }
  return new RealWS(url);
}
