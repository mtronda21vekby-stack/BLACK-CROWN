/* ============================================================
   @blackcrown/ui — Full UI Kit
   Components: Button, Modal, Drawer, Tabs, Toast, Toggle
   ============================================================ */

import { useState, useEffect, useRef, useCallback, createContext, useContext, type FC, type ReactNode, type ButtonHTMLAttributes, type KeyboardEvent } from 'react';

/* ─────────────────────────────── Button ─────────────────────────────── */

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
}

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  children,
  disabled,
  style,
  ...rest
}) => {
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    border: '1px solid transparent',
    borderRadius: 'var(--bc-r-pill)',
    fontFamily: 'var(--bc-font-body)',
    fontWeight: '600',
    letterSpacing: '0.01em',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.5 : 1,
    width: fullWidth ? '100%' : undefined,
    transition: 'transform var(--bc-t-fast), box-shadow var(--bc-t-fast), opacity var(--bc-t-fast)',
    WebkitTapHighlightColor: 'transparent',
    userSelect: 'none',
  };

  const sizes: Record<string, React.CSSProperties> = {
    sm: { padding: '8px 18px', fontSize: '13px', minHeight: '36px' },
    md: { padding: '12px 28px', fontSize: '15px', minHeight: '44px' },
    lg: { padding: '16px 40px', fontSize: '17px', minHeight: '52px' },
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: 'linear-gradient(135deg, #6c8fff 0%, #4a6fe8 100%)',
      borderColor: 'rgba(108,143,255,0.4)',
      color: '#fff',
      boxShadow: 'var(--bc-shadow-button)',
    },
    secondary: {
      background: 'var(--bc-bg-panel)',
      borderColor: 'var(--bc-border-glow)',
      color: 'var(--bc-text-primary)',
      backdropFilter: 'var(--bc-blur-panel)',
    },
    ghost: {
      background: 'transparent',
      borderColor: 'transparent',
      color: 'var(--bc-text-secondary)',
    },
    danger: {
      background: 'linear-gradient(135deg, #ff5c72 0%, #d94055 100%)',
      borderColor: 'rgba(255,92,114,0.4)',
      color: '#fff',
    },
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading) {
      e.currentTarget.style.transform = 'scale(1.02)';
      e.currentTarget.style.boxShadow = 'var(--bc-shadow-glow)';
    }
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.boxShadow = variants[variant].boxShadow as string ?? '';
  };
  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading) e.currentTarget.style.transform = 'scale(0.98)';
  };
  const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading) e.currentTarget.style.transform = 'scale(1.02)';
  };

  return (
    <button
      disabled={disabled || loading}
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...rest}
    >
      {loading ? <Spinner size={size === 'sm' ? 14 : 16} /> : children}
    </button>
  );
};

const Spinner: FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-label="Загрузка">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="32">
      <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite" />
    </circle>
  </svg>
);

/* ─────────────────────────────── Toggle ─────────────────────────────── */

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const Toggle: FC<ToggleProps> = ({ checked, onChange, label, disabled }) => {
  const id = useRef(`toggle-${Math.random().toString(36).slice(2)}`).current;

  return (
    <label
      htmlFor={id}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        userSelect: 'none',
      }}
    >
      <input
        id={id}
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        onChange={e => onChange(e.target.checked)}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
      />
      <span
        style={{
          position: 'relative',
          display: 'inline-block',
          width: '44px',
          height: '26px',
          borderRadius: 'var(--bc-r-pill)',
          background: checked
            ? 'linear-gradient(135deg, #6c8fff, #4a6fe8)'
            : 'var(--bc-bg-panel)',
          border: `1px solid ${checked ? 'rgba(108,143,255,0.5)' : 'var(--bc-border-subtle)'}`,
          transition: 'background var(--bc-t-normal), border-color var(--bc-t-normal)',
          boxShadow: checked ? 'var(--bc-shadow-glow)' : 'none',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '3px',
            left: checked ? '21px' : '3px',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            background: '#fff',
            boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
            transition: 'left var(--bc-t-fast)',
          }}
        />
      </span>
      {label && (
        <span style={{ fontSize: '14px', color: 'var(--bc-text-secondary)' }}>{label}</span>
      )}
    </label>
  );
};

/* ─────────────────────────────── Modal ─────────────────────────────── */

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxWidth?: string;
}

export const Modal: FC<ModalProps> = ({ open, onClose, title, children, maxWidth = '480px' }) => {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        zIndex: 'var(--bc-z-modal)' as unknown as number,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        background: 'rgba(5,8,16,0.7)',
        backdropFilter: 'blur(8px)',
        animation: 'bcFadeIn var(--bc-t-normal) both',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        style={{
          width: '100%',
          maxWidth,
          background: 'var(--bc-bg-panel)',
          backdropFilter: 'var(--bc-blur-panel)',
          border: '1px solid var(--bc-border-glow)',
          borderRadius: 'var(--bc-r-xl)',
          boxShadow: 'var(--bc-shadow-panel)',
          padding: '28px',
          animation: 'bcSlideUp var(--bc-t-slow) both',
          position: 'relative',
        }}
      >
        {title && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h2 style={{ fontFamily: 'var(--bc-font-display)', fontSize: '20px', fontWeight: '700', color: 'var(--bc-text-primary)' }}>
              {title}
            </h2>
            <button
              onClick={onClose}
              aria-label="Закрыть"
              style={{
                width: '36px', height: '36px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 'var(--bc-r-md)',
                background: 'var(--bc-accent-muted)',
                color: 'var(--bc-text-secondary)',
                transition: 'background var(--bc-t-fast)',
              }}
            >
              ✕
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

/* ─────────────────────────────── Drawer ─────────────────────────────── */

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  side?: 'right' | 'left' | 'bottom';
  children: ReactNode;
  width?: string;
}

export const Drawer: FC<DrawerProps> = ({
  open, onClose, title, side = 'right', children, width = '340px',
}) => {
  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const translate = {
    right:  open ? 'translateX(0)' : 'translateX(100%)',
    left:   open ? 'translateX(0)' : 'translateX(-100%)',
    bottom: open ? 'translateY(0)' : 'translateY(100%)',
  }[side];

  const position: React.CSSProperties = side === 'bottom'
    ? { bottom: 0, left: 0, right: 0, maxHeight: '80svh', borderRadius: '20px 20px 0 0' }
    : { top: 0, bottom: 0, [side]: 0, width };

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed', inset: 0,
          zIndex: 'calc(var(--bc-z-modal) - 1)' as unknown as number,
          background: 'rgba(5,8,16,0.6)',
          backdropFilter: 'blur(4px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity var(--bc-t-normal)',
        }}
        onClick={onClose}
      />
      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{
          position: 'fixed',
          ...position,
          zIndex: 'var(--bc-z-modal)' as unknown as number,
          background: 'var(--bc-bg-surface)',
          border: '1px solid var(--bc-border-subtle)',
          boxShadow: 'var(--bc-shadow-panel)',
          display: 'flex',
          flexDirection: 'column',
          transform: translate,
          transition: 'transform var(--bc-t-slow)',
          overflow: 'hidden',
          paddingBottom: 'var(--bc-safe-bottom)',
        }}
      >
        {title && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '20px 24px 16px',
            borderBottom: '1px solid var(--bc-border-subtle)',
          }}>
            <h2 style={{ fontFamily: 'var(--bc-font-display)', fontSize: '18px', fontWeight: '700' }}>
              {title}
            </h2>
            <button
              onClick={onClose}
              aria-label="Закрыть"
              style={{
                width: '44px', height: '44px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 'var(--bc-r-md)',
                color: 'var(--bc-text-secondary)',
              }}
            >✕</button>
          </div>
        )}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {children}
        </div>
      </div>
    </>
  );
};

/* ─────────────────────────────── Tabs ─────────────────────────────── */

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
}

export const Tabs: FC<TabsProps> = ({ tabs, active, onChange }) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, id: string, idx: number) => {
    if (e.key === 'ArrowRight') onChange(tabs[(idx + 1) % tabs.length].id);
    if (e.key === 'ArrowLeft')  onChange(tabs[(idx - 1 + tabs.length) % tabs.length].id);
  };

  return (
    <div
      role="tablist"
      style={{
        display: 'flex',
        gap: '4px',
        background: 'var(--bc-bg-panel)',
        border: '1px solid var(--bc-border-subtle)',
        borderRadius: 'var(--bc-r-pill)',
        padding: '4px',
      }}
    >
      {tabs.map((tab, idx) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={active === tab.id}
          tabIndex={active === tab.id ? 0 : -1}
          onClick={() => onChange(tab.id)}
          onKeyDown={e => handleKeyDown(e, tab.id, idx)}
          style={{
            flex: 1,
            minHeight: '36px',
            padding: '6px 16px',
            borderRadius: 'var(--bc-r-pill)',
            fontSize: '13px',
            fontWeight: active === tab.id ? '600' : '500',
            color: active === tab.id ? 'var(--bc-text-primary)' : 'var(--bc-text-secondary)',
            background: active === tab.id
              ? 'linear-gradient(135deg, rgba(108,143,255,0.25), rgba(61,219,160,0.12))'
              : 'transparent',
            borderBottom: active === tab.id ? '1px solid var(--bc-accent-muted)' : '1px solid transparent',
            transition: 'background var(--bc-t-fast), color var(--bc-t-fast)',
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

/* ─────────────────────────────── Toast ─────────────────────────────── */

interface ToastItem {
  id: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
  duration: number;
}

interface ToastContextValue {
  show: (message: string, type?: ToastItem['type'], duration?: number) => void;
}

const ToastContext = createContext<ToastContextValue>({ show: () => {} });

export const useToast = () => useContext(ToastContext);

export const ToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const show = useCallback((message: string, type: ToastItem['type'] = 'info', duration = 3500) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { id, message, type, duration }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration);
  }, []);

  const colors: Record<string, string> = {
    info:    'var(--bc-accent)',
    success: 'var(--bc-success)',
    error:   'var(--bc-danger)',
    warning: 'var(--bc-warning)',
  };

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        style={{
          position: 'fixed',
          bottom: 'max(24px, calc(var(--bc-safe-bottom) + 16px))',
          right: '24px',
          zIndex: 'var(--bc-z-toast)' as unknown as number,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          pointerEvents: 'none',
          maxWidth: '360px',
          width: 'calc(100vw - 48px)',
        }}
      >
        {toasts.map(toast => (
          <div
            key={toast.id}
            role="status"
            style={{
              background: 'var(--bc-bg-surface)',
              border: `1px solid ${colors[toast.type]}33`,
              borderLeft: `3px solid ${colors[toast.type]}`,
              borderRadius: 'var(--bc-r-md)',
              padding: '14px 18px',
              boxShadow: 'var(--bc-shadow-panel)',
              color: 'var(--bc-text-primary)',
              fontSize: '14px',
              lineHeight: '1.4',
              animation: 'bcSlideUp 200ms both',
            }}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

/* ─────────────────────────── Layout helpers ─────────────────────────── */

export const Stack: FC<{
  gap?: number;
  direction?: 'row' | 'column';
  align?: string;
  justify?: string;
  wrap?: boolean;
  style?: React.CSSProperties;
  children: ReactNode;
}> = ({ gap = 16, direction = 'column', align = 'stretch', justify = 'flex-start', wrap = false, style, children }) => (
  <div style={{ display: 'flex', flexDirection: direction, gap, alignItems: align, justifyContent: justify, flexWrap: wrap ? 'wrap' : 'nowrap', ...style }}>
    {children}
  </div>
);

export const Glass: FC<{
  children: ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
}> = ({ children, style, onClick }) => (
  <div
    onClick={onClick}
    style={{
      background: 'var(--bc-bg-panel)',
      backdropFilter: 'var(--bc-blur-panel)',
      WebkitBackdropFilter: 'var(--bc-blur-panel)',
      border: '1px solid var(--bc-border-subtle)',
      borderRadius: 'var(--bc-r-lg)',
      boxShadow: 'var(--bc-shadow-panel)',
      ...style,
    }}
  >
    {children}
  </div>
);

/* ─────────────────────────── Keyframe injector ─────────────────────────── */

let keyframesInjected = false;
export function injectKeyframes(): void {
  if (keyframesInjected || typeof document === 'undefined') return;
  keyframesInjected = true;
  const style = document.createElement('style');
  style.textContent = `
    @keyframes bcFadeIn  { from { opacity: 0 }                   to { opacity: 1 } }
    @keyframes bcSlideUp { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }
    @keyframes bcPulse   { 0%,100% { opacity: 1 } 50% { opacity: 0.5 } }
  `;
  document.head.appendChild(style);
}
