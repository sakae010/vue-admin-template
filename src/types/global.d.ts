declare type Recordable<T = any> = Record<string, T>;

declare type Nullable<T> = T | null;

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

declare type TimeoutHandle = ReturnType<typeof setTimeout>;
declare type IntervalHandle = ReturnType<typeof setInterval>;
