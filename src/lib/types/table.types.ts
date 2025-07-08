export type TNestedKeyOf<T> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object ? K | `${K}.${TNestedKeyOf<T[K]>}` : K;
    }[keyof T & string]
  : never;

export type TPathValue<T, P extends string> = P extends `${infer K}.${infer R}`
  ? K extends keyof T
    ? TPathValue<T[K], R>
    : never
  : P extends keyof T
    ? T[P]
    : never;

export const aliases = {
  translator: 'translator.lastName',
  publisher: 'publisher.title',
} as const;

export type TAllowedPaths<T> = TNestedKeyOf<T> | keyof typeof aliases;

export interface IHeaderDefinition<T> {
  displayTitle: string;
  key: TNestedKeyOf<T>;
  condition?: (item: T) => boolean;
  sortable?: boolean;
  width?: number;
}

export interface ITableStrategy<T> {
  getAliases(): Record<string, string>;

  getHeaders(item: T): IHeaderDefinition<T>[];

  getDisplayValue<P extends TAllowedPaths<T>>(item: T, key: P): TPathValue<T, P> | null;
}
