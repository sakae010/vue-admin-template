import { genMessage } from '../helper';
import antdLocale from 'ant-design-vue/es/locale/zh_CN';

const modules = import.meta.glob('./zh-CN/**/*.ts', { eager: true }) as Record<
  string,
  Record<string, any>
>;
export default {
  message: {
    ...genMessage(modules, 'zh-CN'),
    antdLocale,
  },
};
