import { useState, type FC } from 'react';
import { useRouter, Link } from '../router/index.js';
import { storage, isEnabled } from '@blackcrown/core';
import { AccountModal } from './AccountModal.js';
import { IconCrown, IconSun, IconMoon } from '@blackcrown/assets';
import { Button } from '@blackcrown/ui';

export const Navbar: FC = () => {
  const { path } = useRouter();
  const [accountOpen, setAccountOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(
    () => storage.getOrDefault('theme', 'dark')
  );
  const nickname = storage.get('nickname');

  const toggleTheme = () => {
    const next: 'dark' | 'light' = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    storage.set('theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const links = [
    { to: '/',        label: 'Главная' },
    { to: '/about',   label: 'О нас' },
    { to: '/support', label: 'Поддержка' },
  ];

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0,
        zIndex: 90,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(16px, 4vw, 48px)',
        height: '64px',
        background: 'rgba(5,8,16,0.72)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--bc-border-subtle)',
        paddingTop: 'var(--bc-safe-top)',
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <IconCrown size={24} color="var(--bc-accent)" />
          <span style={{ fontFamily: 'var(--bc-font-display)', fontWeight: '700', fontSize: '18px', letterSpacing: '-0.01em' }}>
            BlackCrown
          </span>
        </Link>

        {/* Links — desktop */}
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}
             className="desktop-nav">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--bc-r-pill)',
                fontSize: '14px',
                fontWeight: path === link.to ? '600' : '400',
                color: path === link.to ? 'var(--bc-text-primary)' : 'var(--bc-text-secondary)',
                background: path === link.to ? 'var(--bc-accent-muted)' : 'transparent',
                transition: 'background var(--bc-t-fast), color var(--bc-t-fast)',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isEnabled('THEME_TOGGLE') && (
            <button
              onClick={toggleTheme}
              aria-label="Переключить тему"
              style={{
                width: '44px', height: '44px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 'var(--bc-r-md)',
                color: 'var(--bc-text-secondary)',
                transition: 'color var(--bc-t-fast)',
              }}
            >
              {theme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
            </button>
          )}

          <button
            onClick={() => setAccountOpen(true)}
            style={{
              height: '36px',
              padding: '0 16px',
              borderRadius: 'var(--bc-r-pill)',
              background: 'var(--bc-accent-muted)',
              border: '1px solid var(--bc-border-subtle)',
              color: 'var(--bc-text-primary)',
              fontSize: '13px',
              fontWeight: '600',
              transition: 'background var(--bc-t-fast)',
            }}
          >
            {nickname ? `@${nickname}` : 'Войти'}
          </button>
        </div>
      </nav>

      <AccountModal open={accountOpen} onClose={() => setAccountOpen(false)} />
    </>
  );
};
