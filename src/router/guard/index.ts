import { Router } from 'vue-router';
import { createPermissionGuard } from './permissionGuard';

// Don't change the order of creation
export function setupRouterGuard(router: Router) {
  createPageGuard(router);
  createPermissionGuard(router);
}

/**
 * 处理页面状态
 */
function createPageGuard(router: Router) {
  const loadedPageMap = new Map<string, boolean>();

  router.beforeEach(async (to) => {
    // 页面已经加载，重新打开会更快，不需要做加载等处理
    to.meta.loaded = !!loadedPageMap.get(to.path);
    // 提醒路由改变

    return true;
  });

  router.afterEach((to) => {
    loadedPageMap.set(to.path, true);
  });
}
