import { useState, useCallback, useRef, useEffect, type FC } from 'react';
import { Button, Drawer, Toggle, ToastProvider, useToast, Glass, injectKeyframes } from '@blackcrown/ui';
import { storage } from '@blackcrown/core';
import { IconPlay, IconSettings, IconFullscreen, IconVolume } from '@blackcrown/assets';

const GAME_PATH = import.meta.env.VITE_GAME_PATH ?? '/evofish/index.html';

/* ─── FPS Counter ─── */
const FpsCounter: FC = () => {
  const [fps, setFps] = useState(0);
  const frameRef = useRef(0);
  const lastRef  = useRef(performance.now());
  const countRef = useRef(0);

  useEffect(() => {
    let id: number;
    const tick = () => {
      countRef.current++;
      const now = performance.now();
      if (now - lastRef.current >= 1000) {
        setFps(countRef.current);
        countRef.current = 0;
        lastRef.current = now;
      }
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div style={{
      position: 'fixed', top: '12px', left: '12px',
      padding: '4px 10px',
      background: 'rgba(5,8,16,0.7)',
      border: '1px solid var(--bc-border-subtle)',
      borderRadius: 'var(--bc-r-pill)',
      fontFamily: 'var(--bc-font-mono)',
      fontSize: '11px',
      color: fps >= 55 ? 'var(--bc-success)' : fps >= 30 ? 'var(--bc-warning)' : 'var(--bc-danger)',
      zIndex: 50,
      pointerEvents: 'none',
    }}>
      {fps} FPS
    </div>
  );
};

/* ─── Settings Drawer ─── */
interface Settings {
  sound:     boolean;
  fpsCounter:boolean;
  quality:   'low' | 'med' | 'high';
  inputMode: 'auto' | 'touch' | 'mouse';
}

const SettingsDrawer: FC<{ open: boolean; onClose: () => void; settings: Settings; onChange: (s: Settings) => void }> = ({
  open, onClose, settings, onChange,
}) => {
  const set = <K extends keyof Settings>(k: K, v: Settings[K]) => {
    const next = { ...settings, [k]: v };
    onChange(next);
    (storage.set as (k: string, v: unknown) => void)(k as string, v);
  };

  const Row: FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--bc-border-subtle)' }}>
      <span style={{ fontSize: '14px', color: 'var(--bc-text-secondary)' }}>{label}</span>
      {children}
    </div>
  );

  const Select: FC<{ value: string; options: [string, string][]; onChange: (v: string) => void }> = ({ value, options, onChange }) => (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        background: 'var(--bc-bg-panel)',
        border: '1px solid var(--bc-border-subtle)',
        borderRadius: 'var(--bc-r-md)',
        color: 'var(--bc-text-primary)',
        padding: '6px 12px',
        fontSize: '13px',
        fontFamily: 'var(--bc-font-body)',
        outline: 'none',
        cursor: 'pointer',
      }}
    >
      {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
    </select>
  );

  return (
    <Drawer open={open} onClose={onClose} title="Настройки" side="right" width="320px">
      <Row label="Звук">
        <Toggle
          checked={settings.sound}
          onChange={v => set('sound', v)}
        />
      </Row>
      <Row label="FPS-счётчик">
        <Toggle
          checked={settings.fpsCounter}
          onChange={v => set('fpsCounter', v)}
        />
      </Row>
      <Row label="Качество">
        <Select
          value={settings.quality}
          options={[['low','Низкое'],['med','Среднее'],['high','Высокое']]}
          onChange={v => set('quality', v as Settings['quality'])}
        />
      </Row>
      <Row label="Ввод">
        <Select
          value={settings.inputMode}
          options={[['auto','Авто'],['touch','Касание'],['mouse','Мышь']]}
          onChange={v => set('inputMode', v as Settings['inputMode'])}
        />
      </Row>

      <div style={{ marginTop: '24px' }}>
        <p style={{ fontSize: '12px', color: 'var(--bc-text-muted)', lineHeight: '1.6' }}>
          Изменения применяются при следующем запуске игры. Кэш игры намеренно отключён (no-store).
        </p>
      </div>
    </Drawer>
  );
};

/* ─── EvoFish iframe wrapper ─── */
const GameFrame: FC<{ running: boolean; quality: string }> = ({ running, quality }) => {
  const src = running ? `${GAME_PATH}?quality=${quality}&t=${Date.now()}` : '';

  if (!running) {
    return (
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'var(--bc-bg-deep)',
        gap: '12px',
      }}>
        <div style={{
          width: '80px', height: '80px',
          borderRadius: '50%',
          background: 'var(--bc-accent-muted)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <IconPlay size={36} color="var(--bc-accent)" />
        </div>
        <p style={{ color: 'var(--bc-text-muted)', fontSize: '14px' }}>Нажмите «Играть» для запуска</p>
      </div>
    );
  }

  return (
    <iframe
      src={src}
      title="EvoFish"
      allow="fullscreen"
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        border: 'none',
        display: 'block',
      }}
    />
  );
};

/* ─── GameApp ─── */
const GameContent: FC = () => {
  const nickname = storage.get('nickname') ?? 'Гость';
  const { show } = useToast();

  const [running,  setRunning]  = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [settings, setSettings] = useState<Settings>({
    sound:      storage.getOrDefault('soundEnabled', false),
    fpsCounter: storage.getOrDefault('fpsCounter',   false),
    quality:    storage.getOrDefault('quality',      'med'),
    inputMode:  storage.getOrDefault('inputMode',    'auto'),
  });

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed', inset: 0,
        background: 'var(--bc-bg-deep)',
        display: 'flex', flexDirection: 'column',
        paddingTop: 'var(--bc-safe-top)',
        paddingBottom: 'var(--bc-safe-bottom)',
      }}
    >
      {/* Top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '56px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px',
        background: running ? 'rgba(5,8,16,0.6)' : 'transparent',
        backdropFilter: running ? 'blur(12px)' : 'none',
        zIndex: 20,
        transition: 'background var(--bc-t-normal)',
        paddingTop: 'var(--bc-safe-top)',
      }}>
        {/* Back + nickname */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a
            href={import.meta.env.VITE_SITE_URL ?? '/'}
            style={{ color: 'var(--bc-text-muted)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            ← BlackCrown
          </a>
          <span style={{ fontSize: '13px', color: 'var(--bc-text-secondary)', borderLeft: '1px solid var(--bc-border-subtle)', paddingLeft: '12px' }}>
            @{nickname}
          </span>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {!running && (
            <Button variant="primary" size="sm" onClick={() => setRunning(true)}>
              <IconPlay size={14} />
              Играть
            </Button>
          )}
          {running && (
            <Button variant="secondary" size="sm" onClick={() => setRunning(false)}>
              Стоп
            </Button>
          )}
          <button
            onClick={() => setSettingsOpen(true)}
            aria-label="Настройки"
            style={{ width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--bc-r-md)', color: 'var(--bc-text-secondary)', background: 'var(--bc-accent-muted)' }}
          >
            <IconSettings size={18} />
          </button>
          <button
            onClick={toggleFullscreen}
            aria-label="Полный экран"
            style={{ width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--bc-r-md)', color: 'var(--bc-text-secondary)', background: 'var(--bc-accent-muted)' }}
          >
            <IconFullscreen size={18} />
          </button>
        </div>
      </div>

      {/* Game area */}
      <div style={{ position: 'relative', flex: 1 }}>
        <GameFrame running={running} quality={settings.quality} />
      </div>

      {/* FPS Counter */}
      {settings.fpsCounter && running && <FpsCounter />}

      {/* Settings Drawer */}
      <SettingsDrawer
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={settings}
        onChange={setSettings}
      />
    </div>
  );
};

export const GameApp: FC = () => (
  <ToastProvider>
    <GameContent />
  </ToastProvider>
);
