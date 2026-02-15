import type { FC } from 'react';
import { RouterProvider, useRouter } from './router/index.js';
import { ToastProvider } from '@blackcrown/ui';
import { Navbar } from './components/Navbar.js';
import { HomePage } from './pages/HomePage.js';
import { AboutPage } from './pages/AboutPage.js';
import { SupportPage } from './pages/SupportPage.js';
import { PrivacyPage } from './pages/PrivacyPage.js';
import { TermsPage } from './pages/TermsPage.js';
import { isEnabled } from '@blackcrown/core';
import { useEffect } from 'react';
import { storage } from '@blackcrown/core';

const Routes: FC = () => {
  const { path, navigate } = useRouter();

  /* Keyboard shortcuts */
  useEffect(() => {
    if (!isEnabled('KEYBOARD_SHORTCUTS')) return;
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'p' || e.key === 'P') window.location.href = import.meta.env.VITE_GAME_URL ?? 'https://game.blackcrown.gg';
      if (e.key === 'l' || e.key === 'L') window.location.href = import.meta.env.VITE_LOBBY_URL ?? 'https://lobby.blackcrown.gg';
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  /* Theme init */
  useEffect(() => {
    const theme = storage.getOrDefault('theme', 'dark');
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  const pages: Record<string, FC> = {
    '/':        HomePage,
    '/about':   AboutPage,
    '/support': SupportPage,
    '/privacy': PrivacyPage,
    '/terms':   TermsPage,
  };

  const Page = pages[path] ?? HomePage;

  return <Page />;
};

export const App: FC = () => (
  <ToastProvider>
    <RouterProvider>
      <Navbar />
      <main>
        <Routes />
      </main>
    </RouterProvider>
  </ToastProvider>
);
