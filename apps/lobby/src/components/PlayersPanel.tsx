import type { FC } from 'react';
import type { Player } from '../lobbyModel.js';
import { Glass, Button } from '@blackcrown/ui';
import { IconCheck, IconCrown, IconUsers } from '@blackcrown/assets';

interface Props {
  players:   Player[];
  myId:      string;
  onToggleReady: () => void;
  onStartGame:   () => void;
}

const COLORS = ['#6c8fff','#3ddba0','#f5c542','#ff5c72','#c084fc','#fb923c','#22d3ee','#a3e635'];

export const PlayersPanel: FC<Props> = ({ players, myId, onToggleReady, onStartGame }) => {
  const me       = players.find(p => p.id === myId);
  const allReady = players.filter(p => !p.isHost).every(p => p.ready);

  return (
    <Glass style={{ display: 'flex', flexDirection: 'column', gap: '0', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid var(--bc-border-subtle)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <IconUsers size={16} color="var(--bc-accent)" />
          <span style={{ fontWeight: '700', fontSize: '14px' }}>Игроки</span>
        </div>
        <span style={{ fontSize: '12px', color: 'var(--bc-text-muted)' }}>
          {players.length}/{8}
        </span>
      </div>

      {/* Player list */}
      <div style={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {players.map((player, idx) => (
          <div
            key={player.id}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '10px 12px',
              borderRadius: 'var(--bc-r-md)',
              background: player.id === myId ? 'var(--bc-accent-muted)' : 'transparent',
              transition: 'background var(--bc-t-fast)',
            }}
          >
            {/* Avatar */}
            <div style={{
              width: '32px', height: '32px',
              borderRadius: '50%',
              background: `${COLORS[idx % COLORS.length]}22`,
              border: `1px solid ${COLORS[idx % COLORS.length]}44`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: '700', fontSize: '13px',
              color: COLORS[idx % COLORS.length],
              flexShrink: 0,
            }}>
              {player.nickname.charAt(0).toUpperCase()}
            </div>

            {/* Name */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{
                  fontSize: '13px', fontWeight: player.id === myId ? '700' : '500',
                  color: 'var(--bc-text-primary)',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {player.nickname}
                </span>
                {player.isHost && (
                  <IconCrown size={12} color="var(--bc-warning)" />
                )}
                {player.id === myId && (
                  <span style={{ fontSize: '10px', color: 'var(--bc-accent)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Вы</span>
                )}
              </div>
            </div>

            {/* Ready status */}
            <div style={{
              width: '20px', height: '20px',
              borderRadius: '50%',
              background: player.ready ? 'rgba(61,219,160,0.2)' : 'rgba(160,175,210,0.1)',
              border: `1px solid ${player.ready ? 'var(--bc-success)' : 'var(--bc-border-subtle)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              {player.ready && <IconCheck size={10} color="var(--bc-success)" />}
            </div>
          </div>
        ))}

        {/* Empty slots */}
        {Array.from({ length: Math.max(0, 4 - players.length) }).map((_, i) => (
          <div key={`empty-${i}`} style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '10px 12px',
            opacity: 0.3,
          }}>
            <div style={{
              width: '32px', height: '32px',
              borderRadius: '50%',
              border: '1px dashed var(--bc-border-subtle)',
              flexShrink: 0,
            }} />
            <span style={{ fontSize: '12px', color: 'var(--bc-text-muted)' }}>Ожидание игрока...</span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{
        padding: '12px 16px 16px',
        borderTop: '1px solid var(--bc-border-subtle)',
        display: 'flex', flexDirection: 'column', gap: '8px',
      }}>
        {me && !me.isHost && (
          <Button
            variant={me.ready ? 'secondary' : 'primary'}
            fullWidth
            onClick={onToggleReady}
          >
            {me.ready ? 'Отменить готовность' : 'Готов!'}
          </Button>
        )}
        {me?.isHost && (
          <Button
            variant="primary"
            fullWidth
            disabled={!allReady && players.filter(p => !p.isHost).length > 0}
            onClick={onStartGame}
          >
            <IconPlay size={14} />
            Начать игру
          </Button>
        )}
      </div>
    </Glass>
  );
};

const IconPlay: FC<{ size?: number }> = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M5 3l14 9-14 9V3z" />
  </svg>
);
