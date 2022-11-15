import { createApp } from 'vue';
import App from './App.vue';
import { setupStore } from '@/store';
import { registerGlobComp } from '@/components/registerGlobComp';
import { router, setupRouter } from '@/router';
import { setupI18n } from '@/locales/setupI18n';
import { setupRouterGuard } from '@/router/guard';
import { setupGlobDirectives } from '@/directives';
import { setupErrorHandle } from '@/logics/error-handle';

async function bootstrap() {
  const app = createApp(App);

  // 配置 store
  setupStore(app);

  // 注册全局组件
  registerGlobComp(app);

  // 配置国际化
  await setupI18n(app);

  // 配置路由
  setupRouter(app);

  // 配置路由守卫
  setupRouterGuard(router);

  // 注册全局指令
  setupGlobDirectives(app);

  // 配置全局错误处理
  setupErrorHandle(app);

  app.mount('#app');
}

bootstrap();
