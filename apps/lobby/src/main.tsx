import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { cssVariables, globalStyles } from '@blackcrown/assets';
import { injectKeyframes } from '@blackcrown/ui';
import { LobbyApp } from './LobbyApp.js';

const styleEl = document.createElement('style');
styleEl.textContent = cssVariables + globalStyles;
document.head.appendChild(styleEl);
injectKeyframes();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LobbyApp />
  </StrictMode>
);
