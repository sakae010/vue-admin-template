import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting';
import { setRouteChange } from '@/logics/mitt/routeChange';
import projectSetting from '@/settings/projectSetting';
import { useAppStoreWithOut } from '@/store/modules/app';
import { useUserStoreWithOut } from '@/store/modules/user';
import { AxiosCanceler } from '@/utils/http/axiosCancel';
import nProgress from 'nprogress';
import { unref } from 'vue';
import { RouteLocationNormalized, Router } from 'vue-router';
import { createPermissionGuard } from './permissionGuard';
import { Modal, notification } from 'ant-design-vue';
import { warn } from '@/utils/log';

// Don't change the order of creation
export function setupRouterGuard(router: Router) {
  createPageGuard(router);
  createPageLoadingGuard(router);
  createHttpGuard(router);
  createScrollGuard(router);
  createMessageGuard(router);
  createProgressGuard(router);
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
    setRouteChange(to);

    return true;
  });

  router.afterEach((to) => {
    loadedPageMap.set(to.path, true);
  });
}

function createPageLoadingGuard(router: Router) {
  const userStore = useUserStoreWithOut();
  const appStore = useAppStoreWithOut();
  const { getOpenPageLoading } = useTransitionSetting();
  router.beforeEach(async (to) => {
    if (!userStore.getToken) {
      return true;
    }
    if (to.meta.loaded) {
      return true;
    }

    if (unref(getOpenPageLoading)) {
      appStore.setPageLoadingAction(true);
      return true;
    }

    return true;
  });
  router.afterEach(async () => {
    if (unref(getOpenPageLoading)) {
      // TODO Looking for a better way
      // The timer simulates the loading time to prevent flashing too fast,
      setTimeout(() => {
        appStore.setPageLoading(false);
      }, 220);
    }
    return true;
  });
}

/**
 * The interface used to close the current page to complete the request when the route is switched
 * @param router
 */
function createHttpGuard(router: Router) {
  const { removeAllHttpPending } = projectSetting;
  let axiosCanceler: Nullable<AxiosCanceler>;
  if (removeAllHttpPending) {
    axiosCanceler = new AxiosCanceler();
  }
  router.beforeEach(async () => {
    // Switching the route will delete the previous request
    axiosCanceler?.removeAllPending();
    return true;
  });
}

// Routing switch back to the top
function createScrollGuard(router: Router) {
  const isHash = (href: string) => {
    return /^#/.test(href);
  };

  const body = document.body;

  router.afterEach(async (to) => {
    // scroll top
    isHash((to as RouteLocationNormalized & { href: string })?.href) && body.scrollTo(0, 0);
    return true;
  });
}

/**
 * Used to close the message instance when the route is switched
 * @param router
 */
export function createMessageGuard(router: Router) {
  const { closeMessageOnSwitch } = projectSetting;

  router.beforeEach(async () => {
    try {
      if (closeMessageOnSwitch) {
        Modal.destroyAll();
        notification.destroy();
      }
    } catch (error) {
      warn('message guard error:' + error);
    }
    return true;
  });
}

export function createProgressGuard(router: Router) {
  const { getOpenNProgress } = useTransitionSetting();
  router.beforeEach(async (to) => {
    if (to.meta.loaded) {
      return true;
    }
    unref(getOpenNProgress) && nProgress.start();
    return true;
  });

  router.afterEach(async () => {
    unref(getOpenNProgress) && nProgress.done();
    return true;
  });
}
