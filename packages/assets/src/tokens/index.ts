/* ============================================================
   BlackCrown Design Tokens — "Echo AI vibe"
   ============================================================ */

export const tokens = {
  color: {
    /* Backgrounds */
    bgDeep:        '#050810',
    bgSurface:     '#0a0d1a',
    bgPanel:       'rgba(14, 18, 35, 0.72)',
    bgPanelHover:  'rgba(20, 26, 50, 0.80)',

    /* Borders */
    borderSubtle:  'rgba(120, 140, 220, 0.14)',
    borderGlow:    'rgba(120, 140, 220, 0.32)',

    /* Accent — quiet neon */
    accent:        '#6c8fff',
    accentMuted:   'rgba(108, 143, 255, 0.18)',
    accentGlow:    'rgba(108, 143, 255, 0.08)',

    /* Text */
    textPrimary:   '#eef0fc',
    textSecondary: 'rgba(200, 210, 240, 0.64)',
    textMuted:     'rgba(160, 175, 210, 0.40)',

    /* Status */
    success:       '#3ddba0',
    warning:       '#f5c542',
    danger:        '#ff5c72',

    /* Gradients */
    gradHero:      'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(108,143,255,0.22) 0%, transparent 70%)',
    gradPanel:     'linear-gradient(135deg, rgba(108,143,255,0.07) 0%, rgba(61,219,160,0.04) 100%)',
  },

  font: {
    display: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
    body:    '"SF Pro Text",    -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
    mono:    '"SF Mono", "Fira Code", "Cascadia Code", monospace',
  },

  size: {
    xs:  '11px',
    sm:  '13px',
    md:  '15px',
    lg:  '18px',
    xl:  '24px',
    '2xl': '32px',
    '3xl': '48px',
    '4xl': '64px',
  },

  weight: {
    regular:   '400',
    medium:    '500',
    semibold:  '600',
    bold:      '700',
  },

  radius: {
    sm:   '8px',
    md:   '12px',
    lg:   '18px',
    xl:   '24px',
    pill: '9999px',
  },

  shadow: {
    panel:  '0 8px 32px rgba(0,0,0,0.48), inset 0 1px 0 rgba(255,255,255,0.05)',
    button: '0 4px 16px rgba(108,143,255,0.18)',
    glow:   '0 0 24px rgba(108,143,255,0.22)',
  },

  blur: {
    panel: 'blur(20px)',
    heavy: 'blur(40px)',
  },

  transition: {
    fast:   '120ms cubic-bezier(0.4,0,0.2,1)',
    normal: '220ms cubic-bezier(0.4,0,0.2,1)',
    slow:   '380ms cubic-bezier(0.4,0,0.2,1)',
  },

  zIndex: {
    base:    0,
    overlay: 100,
    modal:   200,
    toast:   300,
  },
} as const;

export type Tokens = typeof tokens;
