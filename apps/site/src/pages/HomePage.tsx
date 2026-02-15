import type { FC } from 'react';
import { Button, Glass, useToast } from '@blackcrown/ui';
import { isEnabled } from '@blackcrown/core';
import { IconPlay, IconUsers, IconZap, IconShield, IconFish } from '@blackcrown/assets';

const GAME_URL  = import.meta.env.VITE_GAME_URL  ?? 'https://game.blackcrown.gg';
const LOBBY_URL = import.meta.env.VITE_LOBBY_URL ?? 'https://lobby.blackcrown.gg';

/* ─── Hero ─────────────────────────────────────────────── */
const Hero: FC = () => (
  <section style={{
    position: 'relative',
    minHeight: '100svh',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    textAlign: 'center',
    padding: 'clamp(80px,10vw,120px) clamp(16px,5vw,64px)',
    overflow: 'hidden',
  }}>
    {/* Background radial glow */}
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      background: 'radial-gradient(ellipse 70% 55% at 50% -5%, rgba(108,143,255,0.22) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(61,219,160,0.10) 0%, transparent 60%)',
    }} />

    <div style={{ position: 'relative', maxWidth: '760px', animation: 'bcSlideUp 0.6s both' }}>
      {/* Badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        padding: '6px 16px',
        borderRadius: 'var(--bc-r-pill)',
        background: 'var(--bc-accent-muted)',
        border: '1px solid rgba(108,143,255,0.25)',
        fontSize: '12px', fontWeight: '600',
        color: 'var(--bc-accent)',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        marginBottom: '28px',
      }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--bc-success)', animation: 'bcGlow 2s infinite' }} />
        Ранний доступ • Alpha
      </div>

      <h1 style={{
        fontFamily: 'var(--bc-font-display)',
        fontSize: 'clamp(48px, 8vw, 96px)',
        fontWeight: '700',
        lineHeight: '1.0',
        letterSpacing: '-0.03em',
        marginBottom: '24px',
        background: 'linear-gradient(135deg, #eef0fc 0%, rgba(108,143,255,0.9) 60%, rgba(61,219,160,0.8) 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        BlackCrown
      </h1>

      <p style={{
        fontSize: 'clamp(16px, 2vw, 22px)',
        color: 'var(--bc-text-secondary)',
        lineHeight: '1.65',
        marginBottom: '48px',
        maxWidth: '520px',
        margin: '0 auto 48px',
      }}>
        Эксклюзивная игровая платформа нового поколения. Стань частью элиты — сразись в EvoFish с игроками со всего мира.
      </p>

      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button
          variant="primary"
          size="lg"
          onClick={() => window.location.href = GAME_URL}
        >
          <IconPlay size={18} />
          Играть
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => window.location.href = LOBBY_URL}
        >
          <IconUsers size={18} />
          Открыть Лобби
        </Button>
      </div>

      {/* Hotkey hint */}
      {isEnabled('KEYBOARD_SHORTCUTS') && (
        <p style={{ marginTop: '20px', fontSize: '12px', color: 'var(--bc-text-muted)' }}>
          <kbd style={{ padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--bc-border-subtle)', fontFamily: 'var(--bc-font-mono)', fontSize: '11px' }}>P</kbd>
          {' '}— играть,{' '}
          <kbd style={{ padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--bc-border-subtle)', fontFamily: 'var(--bc-font-mono)', fontSize: '11px' }}>L</kbd>
          {' '}— лобби
        </p>
      )}
    </div>

    {/* Scroll hint */}
    <div style={{
      position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
      color: 'var(--bc-text-muted)', fontSize: '12px',
    }}>
      <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, transparent, var(--bc-border-glow))' }} />
      <span>Прокрутите вниз</span>
    </div>
  </section>
);

/* ─── Features ──────────────────────────────────────────── */
const features = [
  { icon: <IconFish size={28} color="var(--bc-accent)" />, title: 'EvoFish', desc: 'Уникальный игровой процесс — эволюционируй, захватывай, доминируй. Каждая партия уникальна.' },
  { icon: <IconUsers size={28} color="var(--bc-success)" />, title: 'Мультиплеер до 8 игроков', desc: 'Лобби с реалтайм-чатом, готовностью и синхронизацией через WebSocket.' },
  { icon: <IconZap size={28} color="var(--bc-warning)" />, title: 'Высокая производительность', desc: 'Оптимизировано под 120fps. Адаптивный ввод: мышь, тач и геймпад.' },
  { icon: <IconShield size={28} color="#c084fc" />, title: 'Приватность', desc: 'Нет внешних трекеров, нет SDK. Аналитика только локальная, данные только ваши.' },
];

const Features: FC = () => (
  <section style={{ padding: 'clamp(64px,8vw,120px) clamp(16px,5vw,64px)', maxWidth: '1200px', margin: '0 auto' }}>
    <SectionHeader label="Возможности" title="Почему BlackCrown?" />
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: '20px',
      marginTop: '52px',
    }}>
      {features.map((f, i) => (
        <Glass
          key={i}
          style={{ padding: '28px', animation: `bcSlideUp 0.5s ${i * 0.08}s both` }}
        >
          <div style={{ marginBottom: '16px' }}>{f.icon}</div>
          <h3 style={{ fontFamily: 'var(--bc-font-display)', fontSize: '18px', fontWeight: '700', marginBottom: '10px' }}>
            {f.title}
          </h3>
          <p style={{ color: 'var(--bc-text-secondary)', fontSize: '14px', lineHeight: '1.65' }}>
            {f.desc}
          </p>
        </Glass>
      ))}
    </div>
  </section>
);

/* ─── Roadmap ────────────────────────────────────────────── */
const roadmap = [
  { phase: 'Фаза I', status: 'done',    title: 'Запуск Alpha',        items: ['Базовая платформа', 'EvoFish v1', 'Лобби с чатом'] },
  { phase: 'Фаза II', status: 'active', title: 'Мультиплеер',         items: ['Матчмейкинг', 'Рейтинговые матчи', 'Таблица лидеров'] },
  { phase: 'Фаза III', status: 'soon',  title: 'Магазин',              items: ['Скины и кастомизация', 'Боевой пропуск', 'Достижения'] },
  { phase: 'Фаза IV', status: 'future', title: 'Эксклюзивный контент', items: ['Турниры', 'Стримы', 'Партнёрская программа'] },
];

const statusColor: Record<string, string> = {
  done:   'var(--bc-success)',
  active: 'var(--bc-accent)',
  soon:   'var(--bc-warning)',
  future: 'var(--bc-text-muted)',
};
const statusLabel: Record<string, string> = {
  done:   'Готово',
  active: 'В разработке',
  soon:   'Скоро',
  future: 'Планируется',
};

export const Roadmap: FC = () => (
  <section id="roadmap" style={{ padding: 'clamp(64px,8vw,120px) clamp(16px,5vw,64px)', background: 'rgba(14,18,35,0.4)' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <SectionHeader label="Дорожная карта" title="Что нас ждёт" />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px',
        marginTop: '52px',
      }}>
        {roadmap.map((item, i) => (
          <Glass key={i} style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--bc-text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {item.phase}
              </span>
              <span style={{
                fontSize: '11px', fontWeight: '700',
                padding: '3px 10px', borderRadius: 'var(--bc-r-pill)',
                background: `${statusColor[item.status]}18`,
                color: statusColor[item.status],
                border: `1px solid ${statusColor[item.status]}33`,
              }}>
                {statusLabel[item.status]}
              </span>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', fontFamily: 'var(--bc-font-display)', marginBottom: '14px' }}>
              {item.title}
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {item.items.map((it, j) => (
                <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--bc-text-secondary)' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: statusColor[item.status], flexShrink: 0 }} />
                  {it}
                </li>
              ))}
            </ul>
          </Glass>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Changelog ──────────────────────────────────────────── */
const changelog = [
  { version: '0.3.0', date: '2025-06-01', title: 'Лобби запущено', changes: ['Реалтайм чат с антиспамом', 'Синхронизация готовности', 'BroadcastChannel mock WS'] },
  { version: '0.2.0', date: '2025-05-15', title: 'EvoFish Alpha', changes: ['Первая игровая сессия', 'Настройки качества', 'Fullscreen API'] },
  { version: '0.1.0', date: '2025-05-01', title: 'Запуск платформы', changes: ['Монорепозиторий pnpm', 'Дизайн-система Echo AI', 'PWA для лендинга'] },
];

export const Changelog: FC = () => (
  <section id="changelog" style={{ padding: 'clamp(64px,8vw,120px) clamp(16px,5vw,64px)', maxWidth: '800px', margin: '0 auto' }}>
    <SectionHeader label="Changelog" title="История изменений" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginTop: '52px' }}>
      {changelog.map((entry, i) => (
        <Glass key={i} style={{ padding: '24px 28px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ minWidth: '120px' }}>
            <div style={{ fontFamily: 'var(--bc-font-mono)', fontSize: '15px', fontWeight: '700', color: 'var(--bc-accent)', marginBottom: '4px' }}>
              v{entry.version}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--bc-text-muted)' }}>{entry.date}</div>
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>{entry.title}</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {entry.changes.map((c, j) => (
                <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--bc-text-secondary)' }}>
                  <span style={{ color: 'var(--bc-accent)', fontWeight: '700', marginTop: '1px' }}>+</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Glass>
      ))}
    </div>
  </section>
);

/* ─── Store Preview ──────────────────────────────────────── */
const skins = [
  { name: 'Тёмная Бездна', rarity: 'Легендарный', color: '#6c8fff', price: '1200 Монет' },
  { name: 'Золотой Шторм', rarity: 'Эпический',   color: '#f5c542', price: '800 Монет' },
  { name: 'Призрак Глубин', rarity: 'Редкий',      color: '#3ddba0', price: '400 Монет' },
  { name: 'Огненный Дракон', rarity: 'Эпический',  color: '#ff5c72', price: '800 Монет' },
];

export const StorePreview: FC = () => {
  const { show } = useToast();

  return (
    <section id="store" style={{ padding: 'clamp(64px,8vw,120px) clamp(16px,5vw,64px)', background: 'rgba(14,18,35,0.4)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionHeader label="Магазин" title="Скины и предметы" />
        <p style={{ textAlign: 'center', color: 'var(--bc-text-muted)', marginTop: '12px', marginBottom: '52px', fontSize: '14px' }}>
          Покупки временно недоступны. Магазин откроется в Фазе III.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
        }}>
          {skins.map((skin, i) => (
            <Glass
              key={i}
              style={{ padding: '20px', cursor: 'pointer', transition: 'transform var(--bc-t-fast), box-shadow var(--bc-t-fast)' }}
              onClick={() => show('Покупки отключены', 'warning')}
            >
              {/* Skin visual placeholder */}
              <div style={{
                height: '120px',
                borderRadius: 'var(--bc-r-md)',
                background: `radial-gradient(circle at 40% 40%, ${skin.color}40, transparent 70%), linear-gradient(135deg, ${skin.color}20, transparent)`,
                border: `1px solid ${skin.color}33`,
                marginBottom: '14px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <IconFish size={40} color={skin.color} />
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '6px' }}>{skin.name}</h4>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: 'var(--bc-r-pill)', background: `${skin.color}18`, color: skin.color, fontWeight: '600' }}>
                  {skin.rarity}
                </span>
                <span style={{ fontSize: '13px', color: 'var(--bc-text-muted)' }}>{skin.price}</span>
              </div>
            </Glass>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Footer ─────────────────────────────────────────────── */
const Footer: FC = () => (
  <footer style={{
    borderTop: '1px solid var(--bc-border-subtle)',
    padding: 'clamp(32px,4vw,56px) clamp(16px,5vw,64px)',
    display: 'flex', flexWrap: 'wrap', gap: '24px',
    alignItems: 'center', justifyContent: 'space-between',
    color: 'var(--bc-text-muted)', fontSize: '13px',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <IconCrown size={18} color="var(--bc-accent)" />
      <span style={{ fontWeight: '700', color: 'var(--bc-text-secondary)' }}>BlackCrown</span>
      <span>© 2025</span>
    </div>
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      {[
        ['/about',   'О нас'],
        ['/support', 'Поддержка'],
        ['/privacy', 'Конфиденциальность'],
        ['/terms',   'Условия'],
      ].map(([href, label]) => (
        <a key={href} href={href} style={{ color: 'var(--bc-text-muted)', transition: 'color var(--bc-t-fast)' }}
           onMouseEnter={e => (e.currentTarget.style.color = 'var(--bc-text-secondary)')}
           onMouseLeave={e => (e.currentTarget.style.color = 'var(--bc-text-muted)')}
           onClick={e => { e.preventDefault(); window.history.pushState(null, '', href); window.dispatchEvent(new PopStateEvent('popstate')); window.scrollTo(0,0); }}>
          {label}
        </a>
      ))}
    </div>
  </footer>
);

/* ─── Helper ─────────────────────────────────────────────── */
const SectionHeader: FC<{ label: string; title: string }> = ({ label, title }) => (
  <div style={{ textAlign: 'center' }}>
    <span style={{
      display: 'inline-block',
      fontSize: '12px', fontWeight: '700',
      letterSpacing: '0.1em', textTransform: 'uppercase',
      color: 'var(--bc-accent)',
      padding: '4px 14px',
      borderRadius: 'var(--bc-r-pill)',
      background: 'var(--bc-accent-muted)',
      marginBottom: '14px',
    }}>
      {label}
    </span>
    <h2 style={{
      fontFamily: 'var(--bc-font-display)',
      fontSize: 'clamp(28px, 4vw, 48px)',
      fontWeight: '700',
      letterSpacing: '-0.02em',
      lineHeight: '1.15',
    }}>
      {title}
    </h2>
  </div>
);

/* ─── IconCrown re-export ────────────────────────────────── */
const IconCrownLocal: FC<{ size?: number }> = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 20h20M4 20l2-10 6 4 6-4 2 10" />
    <circle cx="12" cy="7" r="2" fill="currentColor" stroke="none" />
  </svg>
);

/* ─── HomePage ────────────────────────────────────────────── */
export const HomePage: FC = () => (
  <>
    <Hero />
    <Features />
    <Roadmap />
    <Changelog />
    <StorePreview />
    <Footer />
  </>
);
