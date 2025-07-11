import { OnlineTableStrategy } from '../OnlineTableStrategy';
import { IOnlineProps, TAllowedPaths } from '@/lib/types';

describe('OnlineTableStrategy', () => {
  let strategy: OnlineTableStrategy;
  let mockItem: IOnlineProps;

  beforeEach(() => {
    strategy = new OnlineTableStrategy();
    mockItem = {
      id: '1',
      title: 'Test Online Resource',
      version: '2.0',
      publisher: {
        title: 'Test Publisher',
        description: '',
        id: 'tp',
      },
      startDate: new Date('2023-01-01'),
      lastIssueDate: new Date('2023-12-31'),
    };
  });

  describe('getAliases', () => {
    it('should return a map of column aliases', () => {
      const aliases = strategy.getAliases();

      expect(aliases).toEqual({
        publisher: 'publisher.title',
      });
    });

    it('should contain an alias for publisher', () => {
      const aliases = strategy.getAliases();

      expect(aliases.publisher).toBe('publisher.title');
    });
  });

  describe('getHeaders', () => {
    it('should return all headers for a complete element', () => {
      const headers = strategy.getHeaders(mockItem);

      expect(headers).toHaveLength(5);
      expect(headers[0]).toEqual({
        displayTitle: 'Title',
        key: 'title',
        sortable: true,
      });
      expect(headers[1]).toEqual({
        displayTitle: 'Version',
        key: 'version',
        sortable: true,
      });
      expect(headers[2]).toEqual({
        displayTitle: 'Publisher',
        key: 'publisher.title',
        sortable: true,
      });
      expect(headers[3]).toEqual({
        displayTitle: 'From',
        key: 'startDate',
        sortable: true,
      });
      expect(headers[4]).toEqual({
        displayTitle: 'Last number',
        key: 'lastIssueDate',
        condition: expect.any(Function),
        sortable: true,
      });
    });

    it('should hide the lastIssueDate header when the value is null', () => {
      const itemWithNullLastIssue = {
        ...mockItem,
        lastIssueDate: null,
      };

      const headers = strategy.getHeaders(itemWithNullLastIssue);

      expect(headers).toHaveLength(4);
      expect(headers.find((h) => h.key === 'lastIssueDate')).toBeUndefined();
    });

    it('should show the lastIssueDate header when the value is not null', () => {
      const itemWithValidLastIssue = {
        ...mockItem,
        lastIssueDate: new Date('2023-12-31'),
      };

      const headers = strategy.getHeaders(itemWithValidLastIssue);

      expect(headers).toHaveLength(5);
      expect(headers.find((h) => h.key === 'lastIssueDate')).toBeDefined();
    });

    it('should maintain a certain order of headers', () => {
      const headers = strategy.getHeaders(mockItem);

      const keys = headers.map((h) => h.key);
      expect(keys).toEqual(['title', 'version', 'publisher.title', 'startDate', 'lastIssueDate']);
    });

    it('should set all headers as sortable', () => {
      const headers = strategy.getHeaders(mockItem);

      headers.forEach((header) => {
        expect(header.sortable).toBe(true);
      });
    });

    it('should work correctly with an empty object', () => {
      const emptyItem = { id: '1' } as IOnlineProps;

      const headers = strategy.getHeaders(emptyItem);

      expect(headers).toHaveLength(0);
    });
  });

  describe('getDisplayValue', () => {
    describe('simple features', () => {
      it('should return a value for the simple property', () => {
        const value = strategy.getDisplayValue(mockItem, 'title');

        expect(value).toBe('Test Online Resource');
      });

      it('should return a value for version', () => {
        const value = strategy.getDisplayValue(mockItem, 'version');

        expect(value).toBe('2.0');
      });

      it('should return a value for startDate', () => {
        const value = strategy.getDisplayValue(mockItem, 'startDate');

        expect(value).toStrictEqual(new Date('2023-01-01'));
      });

      it('should return a value for lastIssueDate', () => {
        const value = strategy.getDisplayValue(mockItem, 'lastIssueDate');

        expect(value).toStrictEqual(new Date('2023-12-31'));
      });

      it('should return undefined for a non-existent property', () => {
        const value = strategy.getDisplayValue(
          mockItem,
          'nonExistentProperty' as unknown as TAllowedPaths<IOnlineProps>,
        );
        expect(value).not.toBeDefined();
      });
    });

    describe('nested properties', () => {
      it('should return a value for the nested publisher.title property', () => {
        const value = strategy.getDisplayValue(mockItem, 'publisher.title');

        expect(value).toBe('Test Publisher');
      });
    });

    describe('edge cases', () => {
      it('should handle a key starting with a period', () => {
        const invalidKey = '.title' as unknown as TAllowedPaths<IOnlineProps>;
        const value = strategy.getDisplayValue(mockItem, invalidKey);
        expect(value).toBeNull();
      });

      it('should handle a key ending in a period', () => {
        const invalidKey = 'publisher.' as unknown as TAllowedPaths<IOnlineProps>;
        const value = strategy.getDisplayValue(mockItem, invalidKey);
        expect(value).toBeNull();
      });

      it('should handle the empty key', () => {
        const emptyKey = '' as unknown as TAllowedPaths<IOnlineProps>;
        const value = strategy.getDisplayValue(mockItem, emptyKey);
        expect(value).not.toBeDefined();
      });
    });
  });

  describe('integration of methods', () => {
    it('should use aliases in headers', () => {
      const aliases = strategy.getAliases();

      const headers = strategy.getHeaders(mockItem);

      const publisherHeader = headers.find((h) => h.displayTitle === 'Publisher');
      expect(publisherHeader?.key).toBe(aliases.publisher);
    });

    it('should retrieve values for keys from headers', () => {
      const headers = strategy.getHeaders(mockItem);

      headers.forEach((header) => {
        const value = strategy.getDisplayValue(mockItem, header.key);
        expect(value).toBeDefined();
      });
    });
  });

  describe('TypeScript validation', () => {
    it('should implement the ITableStrategy interface', () => {
      expect(strategy).toHaveProperty('getAliases');
      expect(strategy).toHaveProperty('getHeaders');
      expect(strategy).toHaveProperty('getDisplayValue');
      expect(typeof strategy.getAliases).toBe('function');
      expect(typeof strategy.getHeaders).toBe('function');
      expect(typeof strategy.getDisplayValue).toBe('function');
    });
  });
});
