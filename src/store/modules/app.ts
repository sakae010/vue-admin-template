import { ThemeEnum } from '@/enums/appEnum';
import { PROJ_CFG_KEY } from '@/enums/cacheEnum';
import { ProjectConfig, TransitionSetting } from '@/types/config';
import { BeforeMiniState } from '@/types/store';
import { Persistent } from '@/utils/cache/persistent';
import { deepMerge } from '@/utils';
import { defineStore } from 'pinia';
import { store } from '@/store';

interface AppState {
  darkMode?: ThemeEnum;
  // Page loading status
  pageLoading: boolean;
  // project config
  projectConfig: ProjectConfig | null;
  // When the window shrinks, remember some states, and restore these states when the window is restored
  beforeMiniInfo: BeforeMiniState;
}

let timeId: TimeoutHandle;

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    darkMode: undefined,
    pageLoading: false,
    projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
    beforeMiniInfo: {},
  }),
  getters: {
    getPageLoading(): boolean {
      return this.pageLoading;
    },
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig);
    },
    getBeforeMiniInfo(): BeforeMiniState {
      return this.beforeMiniInfo;
    },
    getTransitionSetting(): TransitionSetting {
      return this.getProjectConfig.transitionSetting;
    },
  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading;
    },
    setBeforeMiniInfo(state: BeforeMiniState): void {
      this.beforeMiniInfo = state;
    },
    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config);
      Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig);
    },
    async setPageLoadingAction(loading: boolean): Promise<void> {
      if (loading) {
        clearTimeout(timeId);
        // Prevent flicker
        timeId = setTimeout(() => {
          this.setPageLoading(loading);
        }, 50);
      } else {
        this.setPageLoading(loading);
        clearTimeout(timeId);
      }
    },
  },
});

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store);
}
