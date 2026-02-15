# BlackCrown Monorepo

pnpm monorepo — 3 приложения + 3 shared-пакета.

## Структура

```
blackcrown-monorepo/
├── apps/
│   ├── site/     — Лендинг (Echo AI vibe, PWA)
│   ├── game/     — EvoFish контейнер (NO-CACHE)
│   └── lobby/    — Лобби + чат (8 игроков)
├── packages/
│   ├── ui/       — UI Kit: Button, Modal, Drawer, Tabs, Toast, Toggle
│   ├── core/     — Storage, EventBus, FeatureFlags, WS abstraction
│   └── assets/   — Иконки, токены, темы, PWA manifest
```

## Стек

- **TypeScript** strict + ESM
- **Vite** + **React** (minimal, без роутера/стейт-менеджера)
- **pnpm** workspaces
- **Cloudflare Pages** (3 отдельных проекта из одного репо)

## Быстрый старт

```bash
# Установить зависимости
pnpm install

# Dev-сервер
pnpm dev:site    # http://localhost:5173
pnpm dev:game    # http://localhost:5174
pnpm dev:lobby   # http://localhost:5175

# Build
pnpm build:all
```

## Cloudflare Pages — настройки деплоя

### apps/site
| Поле | Значение |
|------|----------|
| Build command | `pnpm install --frozen-lockfile && pnpm --filter @blackcrown/site build` |
| Output directory | `apps/site/dist` |
| Root directory | `/` |
| Node version | `18` |

### apps/game
| Поле | Значение |
|------|----------|
| Build command | `pnpm install --frozen-lockfile && pnpm --filter @blackcrown/game build` |
| Output directory | `apps/game/dist` |
| Root directory | `/` |
| Node version | `18` |

### apps/lobby
| Поле | Значение |
|------|----------|
| Build command | `pnpm install --frozen-lockfile && pnpm --filter @blackcrown/lobby build` |
| Output directory | `apps/lobby/dist` |
| Root directory | `/` |
| Node version | `18` |

## Переменные окружения

```env
# apps/game
VITE_GAME_URL=/evofish/index.html

# apps/lobby
VITE_WS_URL=mock://lobby
VITE_MAX_PLAYERS=8
```

## Feature Flags (packages/core)

Флаги задаются в `packages/core/src/featureFlags.ts`:

```ts
THEME_TOGGLE         // Переключатель темы (тёмная/светлая)
REDUCE_EFFECTS       // Режим экономии ресурсов
KEYBOARD_SHORTCUTS   // Горячие клавиши (P=Play, L=Lobby)
STATUS_BADGE         // Бейдж alpha/offline/online
SEO_META             // OpenGraph мета-теги
```

## PWA

- `apps/site` — SW с offline shell cache
- `apps/game` — **без** Service Worker, заголовок `no-store`
- `apps/lobby` — SW опционален

## EvoFish

Файлы игры размещаются в `apps/game/public/evofish/`.
Логика игры не модифицируется — только iframe-обёртка.
