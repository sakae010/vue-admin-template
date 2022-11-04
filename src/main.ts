import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { setupStore } from '@/store';
import { registerGlobComp } from '@/components/registerGlobComp';
import { setupRouter } from '@/router';

function bootstrap() {
  const app = createApp(App);

  // 配置 store
  setupStore(app);

  // 注册全局组件
  registerGlobComp(app);

  // 配置国际化

  // 配置路由
  setupRouter(app);

  // 配置路由守卫

  // 注册全局指令

  // 配置全局错误处理

  app.mount('#app');
}

bootstrap();
