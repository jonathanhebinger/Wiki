export type DeepPartial<T> = T extends any[]
  ? T
  : T extends { [index: string]: any }
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T
