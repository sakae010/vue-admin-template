import { ErrorLogInfo } from '@/types/store';
import { formatToDateTime } from '@/utils/date';
import { defineStore } from 'pinia';
import { store } from '@/store';

export interface ErrorLogState {
  errorLogInfoList: Nullable<ErrorLogInfo[]>;
  errorLogListCount: number;
}

export const useErrorLogStore = defineStore('app-error-log', {
  state: (): ErrorLogState => ({
    errorLogInfoList: null,
    errorLogListCount: 0,
  }),
  getters: {
    getErrorLogInfoList(): ErrorLogInfo[] {
      return this.errorLogInfoList || [];
    },
    getErrorLogListCount(): number {
      return this.errorLogListCount;
    },
  },
  actions: {
    addErrorLogInfo(info: ErrorLogInfo) {
      const item = {
        ...info,
        time: formatToDateTime(new Date()),
      };
      this.errorLogInfoList = [item, ...(this.errorLogInfoList || [])];
      this.errorLogListCount += 1;
    },
  },
});

// Need to be used outside the setup
export function useErrorLogStoreWithOut() {
  return useErrorLogStore(store);
}
