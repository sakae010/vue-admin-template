import { watch, unref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from '@/hooks/web/useI18n';
import { useLocaleStore } from '@/store/modules/locale';
import { useTitle as usePageTitle } from '@vueuse/core';
import { REDIRECT_NAME } from '@/router/constant';
import { useGlobSetting } from '@/settings';

/**
 * Listening to page changes and dynamically changing site titles
 */
export function useTitle() {
  const { t } = useI18n();
  const { currentRoute } = useRouter();
  const localeStore = useLocaleStore();
  const { title } = useGlobSetting();

  const pageTitle = usePageTitle();

  watch(
    [() => currentRoute.value.path, () => localeStore.getLocale],
    () => {
      const route = unref(currentRoute);

      if (route.name === REDIRECT_NAME) {
        return;
      }
      const tTitle = t(route.meta.title as string);
      pageTitle.value = tTitle ? ` ${tTitle} - ${title} ` : `${title}`;
    },
    { immediate: true },
  );
}
