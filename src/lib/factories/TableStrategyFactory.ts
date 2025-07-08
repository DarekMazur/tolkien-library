import {
  ITableStrategy,
  EPublicationType,
  TPublicationType,
  IBookProps,
  IPublicationProps,
} from '@/lib/types';
import { BookTableStrategy } from '@/lib/strategies/BookTableStrategy';
import { ArticleTableStrategy } from '@/lib/strategies/ArticleTableStrategy';

type StrategyForType<T extends TPublicationType> = T extends IBookProps
  ? ITableStrategy<IBookProps>
  : T extends IPublicationProps
    ? ITableStrategy<IPublicationProps>
    : never;

export class TableStrategyFactory {
  static createStrategy<T extends TPublicationType = TPublicationType>(
    type: EPublicationType,
  ): StrategyForType<T> {
    switch (type) {
      case EPublicationType.BOOK:
        return new BookTableStrategy() as unknown as StrategyForType<T>;
      case EPublicationType.ARTICLE:
        return new ArticleTableStrategy() as unknown as StrategyForType<T>;
      default:
        throw new Error(`Unsupported publication type: ${type}`);
    }
  }
}
