/* BlackCrown — CSS Custom Properties  */
/* Auto-generated from design tokens  */

export const cssVariables = `
:root {
  /* Backgrounds */
  --bc-bg-deep:        #050810;
  --bc-bg-surface:     #0a0d1a;
  --bc-bg-panel:       rgba(14, 18, 35, 0.72);
  --bc-bg-panel-hover: rgba(20, 26, 50, 0.80);

  /* Borders */
  --bc-border-subtle:  rgba(120, 140, 220, 0.14);
  --bc-border-glow:    rgba(120, 140, 220, 0.32);

  /* Accent */
  --bc-accent:         #6c8fff;
  --bc-accent-muted:   rgba(108, 143, 255, 0.18);
  --bc-accent-glow:    rgba(108, 143, 255, 0.08);

  /* Text */
  --bc-text-primary:   #eef0fc;
  --bc-text-secondary: rgba(200, 210, 240, 0.64);
  --bc-text-muted:     rgba(160, 175, 210, 0.40);

  /* Status */
  --bc-success: #3ddba0;
  --bc-warning: #f5c542;
  --bc-danger:  #ff5c72;

  /* Typography */
  --bc-font-display: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
  --bc-font-body:    "SF Pro Text",    -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
  --bc-font-mono:    "SF Mono", "Fira Code", monospace;

  /* Radius */
  --bc-r-sm:   8px;
  --bc-r-md:   12px;
  --bc-r-lg:   18px;
  --bc-r-xl:   24px;
  --bc-r-pill: 9999px;

  /* Shadows */
  --bc-shadow-panel:  0 8px 32px rgba(0,0,0,0.48), inset 0 1px 0 rgba(255,255,255,0.05);
  --bc-shadow-button: 0 4px 16px rgba(108,143,255,0.18);
  --bc-shadow-glow:   0 0 24px rgba(108,143,255,0.22);

  /* Motion */
  --bc-t-fast:   120ms cubic-bezier(0.4,0,0.2,1);
  --bc-t-normal: 220ms cubic-bezier(0.4,0,0.2,1);
  --bc-t-slow:   380ms cubic-bezier(0.4,0,0.2,1);

  /* Z-index */
  --bc-z-overlay: 100;
  --bc-z-modal:   200;
  --bc-z-toast:   300;

  /* Safe area */
  --bc-safe-top:    env(safe-area-inset-top, 0px);
  --bc-safe-bottom: env(safe-area-inset-bottom, 0px);
  --bc-safe-left:   env(safe-area-inset-left, 0px);
  --bc-safe-right:  env(safe-area-inset-right, 0px);
}

/* Light theme override */
[data-theme="light"] {
  --bc-bg-deep:        #f0f2fa;
  --bc-bg-surface:     #e8ecf7;
  --bc-bg-panel:       rgba(240, 242, 255, 0.85);
  --bc-bg-panel-hover: rgba(230, 234, 255, 0.92);
  --bc-border-subtle:  rgba(80, 100, 180, 0.14);
  --bc-border-glow:    rgba(80, 100, 180, 0.32);
  --bc-text-primary:   #0a0d1e;
  --bc-text-secondary: rgba(20, 30, 80, 0.64);
  --bc-text-muted:     rgba(40, 55, 110, 0.40);
  --bc-shadow-panel:   0 8px 32px rgba(80,100,180,0.12), inset 0 1px 0 rgba(255,255,255,0.5);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`;

export const globalStyles = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html {
  font-family: var(--bc-font-body);
  font-size: 16px;
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background: var(--bc-bg-deep);
  color: var(--bc-text-primary);
  min-height: 100svh;
  overflow-x: hidden;
}

:focus-visible {
  outline: 2px solid var(--bc-accent);
  outline-offset: 3px;
  border-radius: var(--bc-r-sm);
}

::selection {
  background: var(--bc-accent-muted);
  color: var(--bc-text-primary);
}

img, svg { display: block; max-width: 100%; }

button { cursor: pointer; font: inherit; border: none; background: none; }
a { color: inherit; text-decoration: none; }
`;
