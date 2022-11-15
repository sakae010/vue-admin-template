import { TOKEN_KEY, USER_INFO_KEY } from '@/enums/cacheEnum';
import { RoleEnum } from '@/enums/roleEnum';
import { UserInfo } from '@/types/store';
import { getAuthCache, setAuthCache } from '@/utils/auth';
import { defineStore } from 'pinia';
import { store } from '@/store';

interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  roleList: RoleEnum[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
}

export const useUserStore = defineStore('app-user', {
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
    // roleList
    roleList: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY);
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout;
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime;
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : ''; // for null or undefined value
      setAuthCache(TOKEN_KEY, info);
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
      setAuthCache(USER_INFO_KEY, info);
    },
    // async afterLoginAction(goHome?: boolean): Promise<UserInfo | null> {
    //   if (!this.getToken) return null;
    //   // return userInfo;
    // },
    // async getUserInfoAction(): Promise<UserInfo | null> {
    //   if (!this.getToken) return null;
    // },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
