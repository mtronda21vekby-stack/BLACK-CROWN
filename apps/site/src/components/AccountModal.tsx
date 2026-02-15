import { useState, type FC } from 'react';
import { Modal, Button, useToast } from '@blackcrown/ui';
import { storage, bus } from '@blackcrown/core';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AccountModal: FC<Props> = ({ open, onClose }) => {
  const [nickname, setNickname] = useState(() => storage.get('nickname') ?? '');
  const [error, setError] = useState('');
  const { show } = useToast();

  const validate = (v: string) => {
    if (v.length < 2) return 'Минимум 2 символа';
    if (v.length > 16) return 'Максимум 16 символов';
    if (!/^[a-zA-ZА-Яа-яёЁ0-9_-]+$/.test(v)) return 'Допустимы буквы, цифры, _ и -';
    return '';
  };

  const handleChange = (v: string) => {
    setNickname(v);
    setError(validate(v));
  };

  const handleSave = () => {
    const err = validate(nickname);
    if (err) { setError(err); return; }
    storage.set('nickname', nickname);
    bus.emit('nickname:changed', { nickname });
    show('Никнейм сохранён', 'success');
    onClose();
    // Force navbar re-render by refreshing the page state
    window.dispatchEvent(new Event('bc:nickname-updated'));
  };

  return (
    <Modal open={open} onClose={onClose} title="Аккаунт">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <p style={{ color: 'var(--bc-text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
          Введите никнейм — он будет виден другим игрокам в лобби и во время матча.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label
            htmlFor="nickname-input"
            style={{ fontSize: '13px', fontWeight: '600', color: 'var(--bc-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}
          >
            Никнейм
          </label>
          <input
            id="nickname-input"
            type="text"
            value={nickname}
            onChange={e => handleChange(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSave(); }}
            placeholder="от 2 до 16 символов"
            maxLength={16}
            autoComplete="off"
            style={{
              width: '100%',
              height: '48px',
              padding: '0 16px',
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${error ? 'var(--bc-danger)' : 'var(--bc-border-subtle)'}`,
              borderRadius: 'var(--bc-r-md)',
              color: 'var(--bc-text-primary)',
              fontSize: '15px',
              fontFamily: 'var(--bc-font-body)',
              outline: 'none',
              transition: 'border-color var(--bc-t-fast)',
            }}
          />
          {error && (
            <span style={{ fontSize: '12px', color: 'var(--bc-danger)' }}>{error}</span>
          )}
          <span style={{ fontSize: '12px', color: 'var(--bc-text-muted)', textAlign: 'right' }}>
            {nickname.length}/16
          </span>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <Button variant="ghost" size="md" onClick={onClose}>Отмена</Button>
          <Button variant="primary" size="md" onClick={handleSave} disabled={!!error || nickname.length < 2}>
            Сохранить
          </Button>
        </div>
      </div>
    </Modal>
  );
};
