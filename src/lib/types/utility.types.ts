import { IBookProps } from '@/lib/types/publication.types.ts';

export type TNestedKeyOf<T> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object ? K | `${K}.${TNestedKeyOf<T[K]>}` : K;
    }[keyof T & string]
  : never;

export const aliases = {
  translator: 'translator.lastName',
  publisher: 'publisher.title',
} as const;

export type TAllowedPaths = TNestedKeyOf<IBookProps> | keyof typeof aliases;

export type TPathValue<T, P extends string> = P extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? TPathValue<T[Key], Rest>
    : never
  : P extends keyof T
    ? T[P]
    : never;
