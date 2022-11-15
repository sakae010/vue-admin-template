import { i18n } from '@/locales/setupI18n';
import { useI18n as useNativeI18n } from 'vue-i18n';

type I18nTranslationRestParameters = [string, any];

function getKey(namespace: string | undefined, key: string) {
  if (!namespace) {
    return key;
  }
  if (key.startsWith(namespace)) {
    return key;
  }
  return `${namespace}.${key}`;
}

export function useI18n(namespace?: string) {
  const normalFn = {
    t: (key: string) => {
      return key;
    },
  };

  if (!i18n) {
    return normalFn;
  }

  const { t, ...methods } = useNativeI18n();

  const tFn = (key: string, ...arg: any[]) => {
    if (!key) return '';
    if (!key.includes('.') && !namespace) return key;
    return t(getKey(namespace, key), ...(arg as I18nTranslationRestParameters));
  };
  return {
    ...methods,
    t: tFn,
  };
}

// 为什么要编写此函数？
// 主要用于配合vscode i18nn ally插件。此功能仅用于路由和菜单。请在其他地方使用useI18n
export const t = (key: string) => key;
