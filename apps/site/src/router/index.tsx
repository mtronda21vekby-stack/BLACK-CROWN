/* ============================================================
   Minimal History API router — no external dependencies
   ============================================================ */

import { useState, useEffect, createContext, useContext, type FC, type ReactNode } from 'react';

interface RouterContextValue {
  path: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextValue>({
  path: '/',
  navigate: () => {},
});

export const RouterProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (to: string) => {
    if (to === window.location.pathname) return;
    window.history.pushState(null, '', to);
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export function useRouter() {
  return useContext(RouterContext);
}

export const Link: FC<{ to: string; children: ReactNode; style?: React.CSSProperties; className?: string }> = ({
  to, children, style, className,
}) => {
  const { navigate } = useRouter();
  return (
    <a
      href={to}
      className={className}
      style={style}
      onClick={e => { e.preventDefault(); navigate(to); }}
    >
      {children}
    </a>
  );
};
