import type { App } from 'vue';
import { Layout } from 'ant-design-vue';

export function registerGlobComp(app: App) {
  app.use(Layout);
}
