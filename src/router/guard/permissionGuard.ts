import { PageEnum } from '@/enums/pageEnum';
import { Router } from 'vue-router';
import { RootRoute } from '@/router/routes';
import { useUserStoreWithOut } from '@/store/modules/user';
import { PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic';

const LOGIN_PATH = PageEnum.BASE_LOGIN;

const ROOT_PATH = RootRoute.path;

const whitePathList: PageEnum[] = [LOGIN_PATH];

export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithOut();
  router.beforeEach(async (to, from, next) => {
    if (
      from.path === ROOT_PATH &&
      to.path === PageEnum.BASE_HOME &&
      userStore.getUserInfo.homePath &&
      userStore.getUserInfo.homePath !== PageEnum.BASE_HOME
    ) {
      next(userStore.getUserInfo.homePath);
      return;
    }

    const token = userStore.getToken;

    // Whitelist can be directly entered
    if (whitePathList.includes(to.path as PageEnum)) {
      if (to.path === LOGIN_PATH && token) {
        const isSessionTimeout = userStore.getSessionTimeout;
        try {
          // await userStore.afterLoginAction();
          if (!isSessionTimeout) {
            next((to.query?.redirect as string) || '/');
            return;
          }
        } catch {}
      }
      next();
      return;
    }

    // token does not exist
    if (!token) {
      // 您可以未经许可访问。您需要将路由 meta.ignoreAuth 设置为 true
      if (to.meta.ignoreAuth) {
        next();
        return;
      }

      // redirect login page
      const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
        path: LOGIN_PATH,
        replace: true,
      };
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path,
        };
      }
      next(redirectData);
      return;
    }

    // 处理登录后跳转到404页面
    if (
      from.path === LOGIN_PATH &&
      to.name === PAGE_NOT_FOUND_ROUTE.name &&
      to.fullPath !== (userStore.getUserInfo.homePath || PageEnum.BASE_HOME)
    ) {
      next(userStore.getUserInfo.homePath || PageEnum.BASE_HOME);
      return;
    }

    // 在上次获取时间为空时获取用户信息
    if (userStore.getLastUpdateTime === 0) {
      try {
        // await userStore.getUserInfoAction();
      } catch (err) {
        next();
        return;
      }
    }

    // if (permissionStore.getIsDynamicAddedRoute) {
    //   next();
    //   return;
    // }
  });
}
