import { defineConfig, loadEnv } from 'vite';
import { join } from 'path';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    base: '/',
    root: process.cwd(),
    resolve: {
      alias: {
        '@': join(__dirname, 'src'),
      },
    },
    server: {
      host: true,
      port: Number(env.VITE_PORT),
    },
    plugins: [
      vue(),
      Components({
        resolvers: [AntDesignVueResolver()],
      }),
    ],
  };
});
