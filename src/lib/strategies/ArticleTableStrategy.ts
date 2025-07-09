import {
  IPublicationProps,
  IHeaderDefinition,
  ITableStrategy,
  TNestedKeyOf,
  TPathValue,
  TAllowedPaths,
} from '@/lib/types';

/**
 * Table building strategy for publication objects (articles).
 * Implements the ITableStrategy interface for the IPublicationProps type.
 */

export class ArticleTableStrategy implements ITableStrategy<IPublicationProps> {
  /**
   * Mapping alternative keys (aliases) to actual property paths.Mapping alternative keys (aliases) to actual property paths.
   * Used when sorting or filtering by nested fields.
   *
   * @readonly
   * @private
   * @type {Readonly<Record<string, string>>}
   * @example
   * // alias ‘publisher’ points to ‘publisher.title’ property
   * this.aliases.publisher === 'publisher.title';
   */

  private readonly aliases = {
    publisher: 'publisher.title',
  } as const;

  /**
   * Returns the alias object used by this strategy.
   *
   * @returns {Record<string, string>} Alias map key → property path.
   */

  getAliases(): Record<string, string> {
    return this.aliases;
  }

  /**
   * Generates table header definitions in a preset order and filters them
   * by conditions (e.g. presence of ISBN/ISSN values).
   *
   * @param {IPublicationProps} item – A single publication object,
   *   used to evaluate conditions when displaying columns.
   * @returns {IHeaderDefinition<IPublicationProps>[]} List of header definitions,
   *   ready to be rendered in a table.
   *
   * @remarks
   * The order of the columns is fixed:
   * ['title', 'author', 'publisher', 'year', 'isbn', 'issn', 'description']
   *
   * @example
   * const headers = strategy.getHeaders(publication);
   * // headers is an array of definitions with keys and title translations
   */

  getHeaders(item: IPublicationProps): IHeaderDefinition<IPublicationProps>[] {
    const propertyOrder: Exclude<keyof IPublicationProps, 'id'>[] = [
      'title',
      'author',
      'publisher',
      'year',
      'isbn',
      'issn',
      'description',
    ];

    const headerDefinitions: Record<
      Exclude<keyof IPublicationProps, 'id'>,
      IHeaderDefinition<IPublicationProps>
    > = {
      title: { displayTitle: 'Tytuł', key: 'title', sortable: true },
      author: { displayTitle: 'Autor', key: 'author', sortable: true },
      publisher: {
        displayTitle: 'Wydawca',
        key: 'publisher.title' as TNestedKeyOf<IPublicationProps>,
        sortable: true,
      },
      year: { displayTitle: 'Rok', key: 'year', sortable: true },
      isbn: {
        displayTitle: 'ISBN',
        key: 'isbn',
        condition: (item) => item.isbn !== null,
        sortable: true,
      },
      issn: {
        displayTitle: 'ISSN',
        key: 'issn',
        condition: (item) => item.issn !== null,
        sortable: true,
      },
      description: { displayTitle: 'Opis', key: 'description', sortable: false },
    };

    return propertyOrder
      .filter((prop) => prop in item)
      .map((prop) => headerDefinitions[prop])
      .filter((definition) => !definition.condition || definition.condition(item));
  }

  /**
   * Retrieves the value of a publication object property based on a key or nested path.
   *
   * @template P – Allowed path in IPublicationProps type.
   * @param {IPublicationProps} item – Object of publication.
   * @param {P} key – Key or path (e.g., ‘publisher.title’).
   * @returns {TPathValue<IPublicationProps, P> | null}
   *   The value of the indicated property or null if it does not exist.
   *
   * @example
   * // For the key ‘title’ it will return string | null
   * strategy.getDisplayValue(pub, 'title');
   * // For nested key ‘publisher.title’ will return Publisher.title | null
   * strategy.getDisplayValue(pub, 'publisher.title');
   */

  getDisplayValue<P extends TAllowedPaths<IPublicationProps>>(
    item: IPublicationProps,
    key: P,
  ): TPathValue<IPublicationProps, P> | null {
    if (key.includes('.')) {
      const [parentKey, childKey] = key.split('.') as [keyof IPublicationProps, string];
      const parent = item[parentKey];
      if (parent && typeof parent === 'object' && childKey in parent) {
        return (parent as unknown as Record<string, unknown>)[childKey] as TPathValue<
          IPublicationProps,
          P
        >;
      }
      return null;
    }
    return item[key as keyof IPublicationProps] as TPathValue<IPublicationProps, P> | null;
  }
}
