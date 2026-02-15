import { useState, useEffect, useCallback, type FC } from 'react';
import { ToastProvider, useToast, injectKeyframes } from '@blackcrown/ui';
import { storage, createWS, type WSMessage } from '@blackcrown/core';
import { cssVariables, globalStyles, IconCrown } from '@blackcrown/assets';
import { PlayersPanel } from './components/PlayersPanel.js';
import { ChatPanel }    from './components/ChatPanel.js';
import {
  type Player, type ChatMessage,
  makeDemoPlayers,
  MAX_PLAYERS,
} from './lobbyModel.js';

const WS_URL = import.meta.env.VITE_WS_URL ?? 'mock://lobby';

/* ─── Inject styles ─── */
const styleEl = document.createElement('style');
styleEl.textContent = cssVariables + globalStyles + `
  body { overflow: hidden; }
`;
if (!document.getElementById('bc-lobby-styles')) {
  styleEl.id = 'bc-lobby-styles';
  document.head.appendChild(styleEl);
}

/* ─── LobbyContent ─── */
const LobbyContent: FC = () => {
  const nickname = storage.get('nickname') ?? 'Гость';
  const { show } = useToast();

  const [players,  setPlayers]  = useState<Player[]>(() => makeDemoPlayers(nickname));
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [ws] = useState(() => createWS(WS_URL));

  /* Subscribe to WS messages */
  useEffect(() => {
    const unsub = ws.onMessage((msg: WSMessage) => {
      if (msg.type === 'chat') {
        const data = msg.payload as { playerId: string; playerName: string; text: string; ts: number };
        setMessages(prev => [...prev.slice(-199), {
          id:         `${data.ts}-${data.playerId}`,
          playerId:   data.playerId,
          playerName: data.playerName,
          text:       data.text,
          ts:         data.ts,
        }]);
      }
      if (msg.type === 'ready') {
        const data = msg.payload as { playerId: string; ready: boolean };
        setPlayers(prev => prev.map(p => p.id === data.playerId ? { ...p, ready: data.ready } : p));
      }
      if (msg.type === 'player:join') {
        const data = msg.payload as Player;
        setPlayers(prev => {
          if (prev.length >= MAX_PLAYERS) { show('Лобби заполнено', 'warning'); return prev; }
          if (prev.find(p => p.id === data.id)) return prev;
          return [...prev, data];
        });
      }
      if (msg.type === 'player:leave') {
        const data = msg.payload as { playerId: string };
        setPlayers(prev => prev.filter(p => p.id !== data.playerId));
      }
    });
    return unsub;
  }, [ws, show]);

  /* Send chat message */
  const handleSend = useCallback((text: string) => {
    ws.send({
      type: 'chat',
      payload: { playerId: 'me', playerName: nickname, text, ts: Date.now() },
    });
  }, [ws, nickname]);

  /* Toggle ready */
  const handleToggleReady = useCallback(() => {
    setPlayers(prev => {
      const me = prev.find(p => p.id === 'me');
      if (!me) return prev;
      const next = { ...me, ready: !me.ready };
      ws.send({ type: 'ready', payload: { playerId: 'me', ready: next.ready } });
      return prev.map(p => p.id === 'me' ? next : p);
    });
  }, [ws]);

  /* Start game */
  const handleStartGame = useCallback(() => {
    ws.send({ type: 'game:start', payload: {} });
    show('Игра начинается!', 'success');
    setTimeout(() => {
      window.location.href = import.meta.env.VITE_GAME_URL ?? 'https://game.blackcrown.gg';
    }, 1500);
  }, [ws, show]);

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'var(--bc-bg-deep)',
      display: 'flex', flexDirection: 'column',
      paddingTop: 'var(--bc-safe-top)',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 30% 20%, rgba(108,143,255,0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 70% 80%, rgba(61,219,160,0.08) 0%, transparent 60%)',
      }} />

      {/* Header */}
      <header style={{
        position: 'relative', zIndex: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(12px, 3vw, 32px)',
        height: '56px',
        borderBottom: '1px solid var(--bc-border-subtle)',
        background: 'rgba(5,8,16,0.6)',
        backdropFilter: 'blur(12px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <IconCrown size={20} color="var(--bc-accent)" />
          <span style={{ fontFamily: 'var(--bc-font-display)', fontWeight: '700', fontSize: '16px' }}>
            BlackCrown
          </span>
          <span style={{ color: 'var(--bc-text-muted)', fontSize: '12px' }}>/ Лобби</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '13px', color: 'var(--bc-text-secondary)' }}>@{nickname}</span>
          <a
            href={import.meta.env.VITE_SITE_URL ?? '/'}
            style={{
              fontSize: '12px', color: 'var(--bc-text-muted)',
              padding: '6px 14px',
              borderRadius: 'var(--bc-r-pill)',
              border: '1px solid var(--bc-border-subtle)',
              transition: 'color var(--bc-t-fast)',
            }}
          >
            ← Главная
          </a>
        </div>
      </header>

      {/* Main layout */}
      <div style={{
        position: 'relative', zIndex: 1,
        flex: 1,
        display: 'grid',
        gridTemplateColumns: 'clamp(260px, 28%, 320px) 1fr',
        gap: '12px',
        padding: '12px clamp(12px, 3vw, 24px)',
        overflow: 'hidden',
        minHeight: 0,
      }}>
        {/* Players panel */}
        <PlayersPanel
          players={players}
          myId="me"
          onToggleReady={handleToggleReady}
          onStartGame={handleStartGame}
        />

        {/* Chat panel */}
        <ChatPanel
          messages={messages}
          myId="me"
          onSend={handleSend}
        />
      </div>

      {/* Mobile: stack vertically */}
      <style>{`
        @media (max-width: 640px) {
          .lobby-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export const LobbyApp: FC = () => (
  <ToastProvider>
    <LobbyContent />
  </ToastProvider>
);
