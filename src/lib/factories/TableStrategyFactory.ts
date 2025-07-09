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

/**
 * Table strategy factory for different types of publications.
 *
 * By using the factory pattern, it is possible to get the appropriate instance of
 * table strategy (`ITableStrategy`) depending on the passed publication type.
 *
 * @template T Default publication type, from among `TPublicationType`.
 */
export class TableStrategyFactory {
  /**
   * Returns an instance of the table strategy appropriate for the publication type.
   *
   * @typeParam T The type of publication whose strategy is to be created.
   *              It can be `IBookProps` or `IPublicationProps`.
   * @param {EPublicationType} type - Publication type, such as `EPublicationType.BOOK` or `EPublicationType.ARTICLE`.
   * @returns {StrategyForType<T>} Instance of `ITableStrategy` matched to the publication property T.
   *
   * @throws {Error} When the factory does not support the transferred publication type.
   *
   * @example
   * // Creating a strategy for the book
   * const bookStrategy = TableStrategyFactory.createStrategy<IBookProps>(EPublicationType.BOOK);
   * bookStrategy.renderTable(data);
   *
   * @example
   * // Create a strategy for the article
   * const articleStrategy = TableStrategyFactory.createStrategy<IPublicationProps>(EPublicationType.ARTICLE);
   * articleStrategy.renderTable(data);
   */
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
