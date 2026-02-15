import { useState, useRef, useEffect, useCallback, type FC, type KeyboardEvent } from 'react';
import type { ChatMessage } from '../lobbyModel.js';
import { AntiSpam, MAX_MSG_LEN } from '../lobbyModel.js';
import { Glass } from '@blackcrown/ui';
import { IconSend } from '@blackcrown/assets';

interface Props {
  messages: ChatMessage[];
  myId:     string;
  onSend:   (text: string) => void;
}

const antiSpam = new AntiSpam();

const COLORS: Record<string, string> = {};
const PALETTE = ['#6c8fff','#3ddba0','#f5c542','#ff5c72','#c084fc','#fb923c','#22d3ee','#a3e635'];
let colorIdx = 0;
function colorFor(id: string): string {
  if (!COLORS[id]) {
    COLORS[id] = PALETTE[colorIdx++ % PALETTE.length];
  }
  return COLORS[id];
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' });
}

export const ChatPanel: FC<Props> = ({ messages, myId, onSend }) => {
  const [input, setInput]   = useState('');
  const [error, setError]   = useState('');
  const scrollRef           = useRef<HTMLDivElement>(null);
  const inputRef            = useRef<HTMLInputElement>(null);

  /* Auto-scroll */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    if (isNearBottom) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const handleSend = useCallback(() => {
    const text = input.trim();
    const result = antiSpam.check(text);
    if (!result.ok) {
      setError(result.reason ?? 'Ошибка');
      setTimeout(() => setError(''), 3000);
      return;
    }
    antiSpam.record(text);
    onSend(text);
    setInput('');
    setError('');
  }, [input, onSend]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Glass style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', minHeight: 0 }}>
      {/* Header */}
      <div style={{
        padding: '14px 18px',
        borderBottom: '1px solid var(--bc-border-subtle)',
        fontSize: '14px', fontWeight: '700',
        display: 'flex', alignItems: 'center', gap: '8px',
      }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--bc-success)', display: 'inline-block' }} />
        Чат лобби
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '12px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          scrollBehavior: 'smooth',
        }}
      >
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--bc-text-muted)', fontSize: '13px', marginTop: '32px' }}>
            Начните общение...
          </div>
        )}
        {messages.map(msg => {
          const isMe = msg.playerId === myId;
          const color = colorFor(msg.playerId);
          return (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                flexDirection: isMe ? 'row-reverse' : 'row',
                gap: '8px',
                alignItems: 'flex-end',
                padding: '3px 0',
                animation: 'bcSlideUp 120ms both',
              }}
            >
              {/* Avatar dot */}
              {!isMe && (
                <div style={{
                  width: '22px', height: '22px',
                  borderRadius: '50%',
                  background: `${color}22`,
                  border: `1px solid ${color}44`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '10px', fontWeight: '700', color,
                  flexShrink: 0,
                }}>
                  {msg.playerName.charAt(0).toUpperCase()}
                </div>
              )}

              {/* Bubble */}
              <div style={{ maxWidth: '75%', display: 'flex', flexDirection: 'column', gap: '2px', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
                {!isMe && (
                  <span style={{ fontSize: '11px', fontWeight: '600', color, paddingLeft: '4px' }}>
                    {msg.playerName}
                  </span>
                )}
                <div style={{
                  padding: '8px 12px',
                  borderRadius: isMe ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  background: isMe
                    ? 'linear-gradient(135deg, rgba(108,143,255,0.25), rgba(108,143,255,0.15))'
                    : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${isMe ? 'rgba(108,143,255,0.2)' : 'var(--bc-border-subtle)'}`,
                  fontSize: '13px',
                  color: 'var(--bc-text-primary)',
                  lineHeight: '1.5',
                  wordBreak: 'break-word',
                }}>
                  {msg.text}
                </div>
                <span style={{ fontSize: '10px', color: 'var(--bc-text-muted)', padding: '0 4px' }}>
                  {formatTime(msg.ts)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div style={{
        padding: '12px 14px',
        borderTop: '1px solid var(--bc-border-subtle)',
        display: 'flex', flexDirection: 'column', gap: '6px',
        paddingBottom: 'max(12px, var(--bc-safe-bottom))',
      }}>
        {error && (
          <div style={{
            fontSize: '12px', color: 'var(--bc-danger)',
            padding: '6px 12px',
            borderRadius: 'var(--bc-r-md)',
            background: 'rgba(255,92,114,0.08)',
            border: '1px solid rgba(255,92,114,0.2)',
          }}>
            {error}
          </div>
        )}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value.slice(0, MAX_MSG_LEN))}
            onKeyDown={handleKeyDown}
            placeholder="Написать сообщение..."
            maxLength={MAX_MSG_LEN}
            style={{
              flex: 1,
              height: '44px',
              padding: '0 14px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid var(--bc-border-subtle)',
              borderRadius: 'var(--bc-r-pill)',
              color: 'var(--bc-text-primary)',
              fontSize: '13px',
              fontFamily: 'var(--bc-font-body)',
              outline: 'none',
              transition: 'border-color var(--bc-t-fast)',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--bc-border-glow)'}
            onBlur={e  => e.target.style.borderColor = 'var(--bc-border-subtle)'}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            aria-label="Отправить"
            style={{
              width: '44px', height: '44px',
              borderRadius: 'var(--bc-r-pill)',
              background: input.trim() ? 'linear-gradient(135deg,#6c8fff,#4a6fe8)' : 'var(--bc-accent-muted)',
              border: 'none',
              color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: input.trim() ? 'pointer' : 'not-allowed',
              opacity: input.trim() ? 1 : 0.5,
              transition: 'all var(--bc-t-fast)',
              flexShrink: 0,
            }}
          >
            <IconSend size={16} />
          </button>
        </div>
        <div style={{ textAlign: 'right', fontSize: '10px', color: 'var(--bc-text-muted)' }}>
          {input.length}/{MAX_MSG_LEN}
        </div>
      </div>
    </Glass>
  );
};
