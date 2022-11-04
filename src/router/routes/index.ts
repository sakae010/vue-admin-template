import type { AppRouteRecordRaw } from '@/router/types';
import { PageEnum } from '@/enums/pageEnum';

// 根路由
export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

// 公共路由
export const basicRoutes = [RootRoute];
