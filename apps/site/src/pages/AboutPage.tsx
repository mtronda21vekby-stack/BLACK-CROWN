import type { FC, ReactNode } from 'react';
import { Glass } from '@blackcrown/ui';

/* ─── Shared Layout ─── */
const PageLayout: FC<{ title: string; subtitle?: string; children: ReactNode }> = ({ title, subtitle, children }) => (
  <div style={{ maxWidth: '760px', margin: '0 auto', padding: 'clamp(48px,6vw,96px) clamp(16px,5vw,48px)' }}>
    <div style={{ marginBottom: '48px' }}>
      <h1 style={{ fontFamily: 'var(--bc-font-display)', fontSize: 'clamp(32px,5vw,56px)', fontWeight: '700', letterSpacing: '-0.02em', lineHeight: '1.1', marginBottom: '16px' }}>
        {title}
      </h1>
      {subtitle && (
        <p style={{ fontSize: '16px', color: 'var(--bc-text-secondary)', lineHeight: '1.6' }}>{subtitle}</p>
      )}
    </div>
    {children}
  </div>
);

const Section: FC<{ title: string; children: ReactNode }> = ({ title, children }) => (
  <Glass style={{ padding: '24px 28px', marginBottom: '16px' }}>
    <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px', color: 'var(--bc-accent)' }}>{title}</h2>
    <div style={{ fontSize: '14px', color: 'var(--bc-text-secondary)', lineHeight: '1.7' }}>{children}</div>
  </Glass>
);

/* ─── About ─── */
export const AboutPage: FC = () => (
  <PageLayout title="О BlackCrown" subtitle="Платформа нового поколения для истинных игроков">
    <Section title="Наша миссия">
      <p>BlackCrown — это не просто игровая платформа. Это экосистема для тех, кто ценит качество, скорость и честную конкуренцию. Мы создаём пространство, где каждая партия имеет значение.</p>
    </Section>
    <Section title="Технологии">
      <p>Платформа построена на TypeScript strict + ESM + Vite + React. Модульная монорепозитория архитектура обеспечивает независимый деплой каждого приложения на Cloudflare Pages.</p>
      <p style={{ marginTop: '10px' }}>Производительность: оптимизировано под 120fps. Анимации только через transform/opacity — без тяжёлых фильтров.</p>
    </Section>
    <Section title="Команда">
      <p>Небольшая команда разработчиков, объединённых страстью к играм и чистому коду. Мы постоянно улучшаем платформу и прислушиваемся к сообществу.</p>
    </Section>
    <Section title="Открытость">
      <p>Нет внешних аналитических SDK. Нет скрытых трекеров. Ваши данные — только ваши. Аналитика хранится локально на вашем устройстве.</p>
    </Section>
  </PageLayout>
);

/* ─── Support ─── */
export const SupportPage: FC = () => (
  <PageLayout title="Поддержка" subtitle="Мы здесь, чтобы помочь вам">
    <Section title="Часто задаваемые вопросы">
      <p><strong style={{ color: 'var(--bc-text-primary)' }}>Как сохранить никнейм?</strong><br />
      Нажмите на кнопку «Войти» в навигационной панели, введите никнейм (2–16 символов) и нажмите «Сохранить». Никнейм сохраняется в вашем браузере.</p>
      <p style={{ marginTop: '14px' }}><strong style={{ color: 'var(--bc-text-primary)' }}>Как попасть в лобби?</strong><br />
      Нажмите кнопку «Открыть Лобби» на главной странице или используйте горячую клавишу <kbd style={{ padding: '1px 5px', border: '1px solid var(--bc-border-subtle)', borderRadius: '3px', fontFamily: 'monospace', fontSize: '12px' }}>L</kbd>.</p>
      <p style={{ marginTop: '14px' }}><strong style={{ color: 'var(--bc-text-primary)' }}>Игра не запускается?</strong><br />
      Убедитесь, что ваш браузер поддерживает WebGL. Попробуйте сбросить кэш (Ctrl+Shift+R) или переключить качество в настройках игры.</p>
    </Section>
    <Section title="Связаться с нами">
      <p>По всем вопросам пишите на: <span style={{ color: 'var(--bc-accent)' }}>support@blackcrown.gg</span></p>
      <p style={{ marginTop: '8px' }}>Время ответа: до 24 часов в рабочие дни.</p>
    </Section>
    <Section title="Сообщить об ошибке">
      <p>Нашли баг? Опишите его как можно подробнее: браузер, версию ОС, шаги воспроизведения. Это поможет нам исправить проблему быстрее.</p>
    </Section>
  </PageLayout>
);

/* ─── Privacy ─── */
export const PrivacyPage: FC = () => (
  <PageLayout title="Конфиденциальность" subtitle="Ваша приватность — наш приоритет">
    <Section title="Что мы собираем">
      <p>BlackCrown собирает минимум данных: только никнейм (хранится локально в вашем браузере), настройки игры и локальная аналитика сессий. Ничего не отправляется на внешние серверы.</p>
    </Section>
    <Section title="Cookies и локальное хранилище">
      <p>Мы используем localStorage исключительно для сохранения ваших настроек: никнейма, темы оформления, параметров игры. Эти данные никогда не покидают ваше устройство.</p>
    </Section>
    <Section title="Сторонние сервисы">
      <p>BlackCrown не использует внешние аналитические SDK (Google Analytics, Mixpanel и т.п.). Вся аналитика — только локальные хуки без передачи данных третьим лицам.</p>
    </Section>
    <Section title="Ваши права">
      <p>Вы можете в любой момент очистить все данные: откройте инструменты разработчика браузера → Application → Local Storage → очистить все записи с префиксом <code style={{ fontFamily: 'monospace', fontSize: '12px', padding: '1px 4px', background: 'var(--bc-accent-muted)', borderRadius: '3px' }}>bc:</code>.</p>
    </Section>
    <Section title="Контакт">
      <p>Вопросы по конфиденциальности: <span style={{ color: 'var(--bc-accent)' }}>privacy@blackcrown.gg</span></p>
    </Section>
  </PageLayout>
);

/* ─── Terms ─── */
export const TermsPage: FC = () => (
  <PageLayout title="Условия использования" subtitle="Правила платформы BlackCrown">
    <Section title="Принятие условий">
      <p>Используя BlackCrown, вы соглашаетесь с настоящими Условиями использования. Если вы не согласны с каким-либо пунктом — пожалуйста, прекратите использование платформы.</p>
    </Section>
    <Section title="Допустимое использование">
      <p>Запрещено: читерство, взлом, распространение вредоносного кода, спам в чате, оскорбительное поведение по отношению к другим игрокам, попытки нарушить работу сервиса.</p>
    </Section>
    <Section title="Аккаунт и никнейм">
      <p>Никнейм должен быть уникальным, не содержать оскорбительных слов, рекламы или личных данных третьих лиц. Мы оставляем за собой право заблокировать никнейм, нарушающий правила.</p>
    </Section>
    <Section title="Интеллектуальная собственность">
      <p>Все материалы платформы (дизайн, код, графика) защищены авторским правом и принадлежат BlackCrown. Запрещено копирование или использование в коммерческих целях без письменного разрешения.</p>
    </Section>
    <Section title="Изменения условий">
      <p>Мы можем обновлять Условия. Актуальная версия всегда доступна на этой странице. Продолжение использования платформы после изменений означает принятие новых Условий.</p>
    </Section>
    <Section title="Контакт">
      <p>Вопросы по условиям: <span style={{ color: 'var(--bc-accent)' }}>legal@blackcrown.gg</span></p>
    </Section>
  </PageLayout>
);
