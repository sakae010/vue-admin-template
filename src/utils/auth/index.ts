import { CacheTypeEnum } from '@/enums/cacheEnum';
import projectSetting from '@/settings/projectSetting';
import { BasicKeys, BasicStore, Persistent } from '@/utils/cache/persistent';

const { permissionCacheType } = projectSetting;
const isLocal = permissionCacheType === CacheTypeEnum.LOCAL;

export function getAuthCache<T>(key: BasicKeys) {
  const fn = isLocal ? Persistent.getLocal : Persistent.getSession;
  return fn(key) as T;
}

export function setAuthCache(key: BasicKeys, value: BasicStore[BasicKeys]) {
  const fn = isLocal ? Persistent.setLocal : Persistent.setSession;
  return fn(key, value, true);
}
