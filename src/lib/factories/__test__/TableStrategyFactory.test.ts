import { ETableType } from '@/lib/types';
import { BookTableStrategy } from '@/lib/strategies/BookTableStrategy.ts';
import { TableStrategyFactory } from '@/lib/factories/TableStrategyFactory.ts';
import { ArticleTableStrategy } from '@/lib/strategies/ArticleTableStrategy.ts';

describe('TableStrategyFactory.createStrategy', () => {
  it('should return an instance of BookTableStrategy for ETableType.BOOK', () => {
    const strategy = TableStrategyFactory.createStrategy(ETableType.BOOK);
    expect(strategy).toBeInstanceOf(BookTableStrategy);
  });

  it('should return an ArticleTableStrategy instance for ETableType.ARTICLE', () => {
    const strategy = TableStrategyFactory.createStrategy(ETableType.ARTICLE);
    expect(strategy).toBeInstanceOf(ArticleTableStrategy);
  });

  it('should have methods specific to BookTableStrategy', () => {
    const strategy = TableStrategyFactory.createStrategy(ETableType.BOOK) as BookTableStrategy;
    expect(typeof strategy.getHeaders).toBe('function');
    expect(typeof strategy.getDisplayValue).toBe('function');
    expect(typeof strategy.getAliases).toBe('function');
  });

  it('should have methods specific to ArticleTableStrategy', () => {
    const strategy = TableStrategyFactory.createStrategy(
      ETableType.ARTICLE,
    ) as ArticleTableStrategy;
    expect(typeof strategy.getHeaders).toBe('function');
    expect(typeof strategy.getDisplayValue).toBe('function');
    expect(typeof strategy.getAliases).toBe('function');
  });

  it('should throw an error for an unsupported type', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(() => TableStrategyFactory.createStrategy('UNSUPPORTED')).toThrow(
      'Unsupported publication type: UNSUPPORTED',
    );
  });
});
