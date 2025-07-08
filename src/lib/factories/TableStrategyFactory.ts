import { ITableStrategy, EPublicationType, TPublicationType } from '@/lib/types';
import { BookTableStrategy } from '@/lib/strategies/BookTableStrategy';
import { ArticleTableStrategy } from '@/lib/strategies/ArticleTableStrategy';

export class TableStrategyFactory {
  static createStrategy<T extends TPublicationType>(type: EPublicationType): ITableStrategy<T> {
    switch (type) {
      case EPublicationType.BOOK:
        return new BookTableStrategy() as ITableStrategy<T>;
      case EPublicationType.ARTICLE:
        return new ArticleTableStrategy() as ITableStrategy<T>;
      default:
        throw new Error(`Unsupported publication type: ${type}`);
    }
  }
}
