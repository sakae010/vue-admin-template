/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_PORT: number;
  readonly VITE_PUBLIC_PATH: string;
  readonly VITE_DROP_CONSOLE: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
