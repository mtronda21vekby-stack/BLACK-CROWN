import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { cssVariables, globalStyles } from '@blackcrown/assets';
import { injectKeyframes } from '@blackcrown/ui';
import { App } from './App.js';

/* Inject global CSS */
const styleEl = document.createElement('style');
styleEl.textContent = cssVariables + globalStyles + `
  [data-bc-blur="panel"] { backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
  .bc-grid { display: grid; }
  @keyframes bcFadeIn  { from { opacity:0 }                        to { opacity:1 } }
  @keyframes bcSlideUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
  @keyframes bcGlow    { 0%,100%{opacity:.7} 50%{opacity:1} }
`;
document.head.appendChild(styleEl);
injectKeyframes();

/* Register SW */
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(console.error);
}

const root = document.getElementById('root')!;
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
