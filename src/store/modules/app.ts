import { ThemeEnum } from '@/enums/appEnum';
import { defineStore } from 'pinia';

interface AppState {
  darkMode?: ThemeEnum;
  // Page loading status
  pageLoading: boolean;
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    darkMode: undefined,
    pageLoading: false,
    // projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
    // beforeMiniInfo: {},
  }),
});
