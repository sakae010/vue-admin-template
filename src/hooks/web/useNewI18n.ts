import { i18n } from '@/locales/setupI18n';
import { useI18n as useI18n2 } from 'vue-i18n';

type I18nTranslationRestParameters = [string, any];

export function useSafeI18n() {
  const normalFn = {
    t: (key: string) => {
      return key;
    },
  };

  if (!i18n) {
    return normalFn;
  }

  const { t, ...methods } = useI18n2();

  const tFn = (key: string, ...arg: any[]) => {
    if (!key) return '';
    return t(key, ...(arg as I18nTranslationRestParameters));
  };

  return {
    methods,
    t: tFn,
  };
}
