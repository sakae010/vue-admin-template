import { GlobConfig } from '@/types/config';

export const useGlobSetting = (): Readonly<GlobConfig> => {
  const { VITE_GLOB_APP_TITLE, VITE_GLOB_API_URL, VITE_GLOB_APP_SHORT_NAME } = import.meta.env;

  const glob: Readonly<GlobConfig> = {
    title: VITE_GLOB_APP_TITLE,
    apiUrl: VITE_GLOB_API_URL,
    shortName: VITE_GLOB_APP_SHORT_NAME,
  };

  return glob;
};
