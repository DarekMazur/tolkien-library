import {
  IBookProps,
  IHeaderDefinition,
  ITableStrategy,
  TNestedKeyOf,
  TPathValue,
} from '@/lib/types';

/**
 * The strategy responsible for generating a table of books.
 * Implements methods that retrieve field aliases, header definitions and values to display.
 *
 * @implements {ITableStrategy<IBookProps>}
 */

export class BookTableStrategy implements ITableStrategy<IBookProps> {
  /**
   * Alias map for nested property keys, used in filtering or sorting.
   *
   * @readonly
   * @private
   * @type {{ readonly translator: 'translator'; readonly publisher: 'publisher.title' }}
   */

  private readonly aliases = {
    translator: 'translator',
    publisher: 'publisher.title',
  } as const;

  /**
   * Returns an alias object for an object property.
   *
   * @returns {Record<string, string>} Alias map, where the key is the name of the property,
   * and the value is the path (can be with a dot) to the actual value.
   */

  getAliases(): Record<string, string> {
    return this.aliases;
  }

  /**
   * Generates a list of column header definitions based on a sample object.
   * It takes into account the order of properties, display conditions and the sortability flag.
   *
   * @param {IBookProps} item - An example of a book object used to evaluate conditions.
   * @returns {IHeaderDefinition<IBookProps>[]} An array of header definitions,
   * sorted by predefined order of properties.
   */

  getHeaders(item: IBookProps): IHeaderDefinition<IBookProps>[] {
    const propertyOrder: Exclude<keyof IBookProps, 'id'>[] = [
      'originalTitle',
      'polishTitle',
      'author',
      'translator',
      'publisher',
      'year',
      'publicationNumber',
      'cover',
      'series',
      'isbn',
    ];

    const headerDefinitions: Record<
      Exclude<keyof IBookProps, 'id'>,
      IHeaderDefinition<IBookProps>
    > = {
      originalTitle: { displayTitle: 'Original Title', key: 'originalTitle', sortable: true },
      polishTitle: { displayTitle: 'Polish Title', key: 'polishTitle', sortable: true },
      author: {
        displayTitle: 'Author',
        key: 'author',
        condition: (item: IBookProps) => item.author !== 'J.R.R. Tolkien',
        sortable: true,
      },
      translator: {
        displayTitle: 'Translator',
        key: 'translator' as TNestedKeyOf<IBookProps>,
        condition: (item: IBookProps) => item.author === 'J.R.R. Tolkien',
        sortable: true,
      },
      publisher: {
        displayTitle: 'Publisher',
        key: 'publisher.title' as TNestedKeyOf<IBookProps>,
        sortable: true,
      },
      year: { displayTitle: 'Year', key: 'year', sortable: true },
      publicationNumber: { displayTitle: 'Pub. no', key: 'publicationNumber', sortable: true },
      cover: {
        displayTitle: 'Cover',
        key: 'cover',
        condition: (item: IBookProps) => item.author === 'J.R.R. Tolkien',
        sortable: false,
      },
      series: {
        displayTitle: 'Series',
        key: 'series',
        condition: (item: IBookProps) => item.author === 'J.R.R. Tolkien',
        sortable: true,
      },
      isbn: { displayTitle: 'ISBN', key: 'isbn', sortable: true },
    };

    return propertyOrder
      .filter((prop) => prop in item)
      .map((prop) => headerDefinitions[prop])
      .filter((definition) => !definition.condition || definition.condition(item));
  }

  /**
   * Retrieves the value of properties (including nested properties) for a given key.
   *
   * @typeParam P - Property key, can be nested (object).
   * @param {IBookProps} item - The book object from which the value is taken.
   * @param {P} key - Property key, such as ‘author’ or ‘publisher.title’.
   * @returns {TPathValue<IBookProps, P> | null} Property value or null if it does not exist.
   */

  getDisplayValue<P extends TNestedKeyOf<IBookProps>>(
    item: IBookProps,
    key: P,
  ): TPathValue<IBookProps, P> | null {
    if (key.includes('.')) {
      const [parentKey, childKey] = key.split('.') as [keyof IBookProps, string];
      const parent = item[parentKey];
      if (parent && typeof parent === 'object' && childKey in parent) {
        return (parent as unknown as Record<string, unknown>)[childKey] as TPathValue<
          IBookProps,
          P
        >;
      }
      return null;
    }

    return item[key as keyof IBookProps] as TPathValue<IBookProps, P>;
  }
}
