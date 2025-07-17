import {
  IFanzinProps,
  IHeaderDefinition,
  ITableStrategy,
  TNestedKeyOf,
  TPathValue,
  TAllowedPaths,
} from '@/lib/types';

/**
 * Concrete implementation of ITableStrategy for rendering
 * and handling table data for Fanzin entities.
 *
 * Manages column aliases, header definitions, and value extraction
 * (including nested properties) for IFanzinProps items.
 */

export class FanzinTableStrategy implements ITableStrategy<IFanzinProps> {
  /**
   * Mapping of property aliases to nested property keys.
   * Used to translate simple alias keys into full data paths.
   *
   * @readonly
   * @private
   * @type {Readonly<Record<string, string>>}
   */

  private readonly aliases: Readonly<Record<string, string>> = {
    publisher: 'publisher.title',
  } as const;
  /**
   * Returns the alias-to-path mapping for this strategy.
   *
   * @returns {Readonly<Record<string, string>>} Read-only record of aliases
   */

  getAliases(): Readonly<Record<string, string>> {
    return this.aliases;
  }
  /**
   * Builds and returns the header definitions for a given item.
   *
   * The headers are defined in a fixed order:
   * 'title', 'version', 'publisher', 'numbers', 'startDate', 'lastIssueDate'.
   * Headers with a `condition` function will be included only if the
   * condition returns true for the provided item.
   *
   * @param {IFanzinProps} item - The Fanzin item used to determine which headers to include.
   * @returns {IHeaderDefinition<IFanzinProps>[]} Array of header definitions,
   *   in display order, filtered by existence and condition.
   */

  getHeaders(item: IFanzinProps): IHeaderDefinition<IFanzinProps>[] {
    const propertyOrder: Exclude<keyof IFanzinProps, 'id'>[] = [
      'title',
      'version',
      'publisher',
      'numbers',
      'startDate',
      'lastIssueDate',
    ];

    const headerDefinitions: Record<
      Exclude<keyof IFanzinProps, 'id'>,
      IHeaderDefinition<IFanzinProps>
    > = {
      title: { displayTitle: 'Title', key: 'title', sortable: true },
      version: { displayTitle: 'Version', key: 'version', sortable: true },
      publisher: {
        displayTitle: 'Publisher',
        key: 'publisher.title' as TNestedKeyOf<IFanzinProps>,
        sortable: true,
      },
      numbers: { displayTitle: 'Numbers count', key: 'numbers', sortable: true },
      startDate: { displayTitle: 'From', key: 'startDate', sortable: true },
      lastIssueDate: {
        displayTitle: 'Last number',
        key: 'lastIssueDate',
        condition: (item) => item.lastIssueDate !== null,
        sortable: true,
      },
    };

    return propertyOrder
      .filter((prop) => prop in item)
      .map((prop) => headerDefinitions[prop])
      .filter((definition) => !definition.condition || definition.condition(item));
  }
  /**
   * Retrieves the display value from the provided item for the given key.
   * Supports nested keys delimited by a dot ('.').
   *
   * Examples:
   * - key = 'title' returns item.title
   * - key = 'publisher.title' returns item.publisher.title if available
   *
   * @typeParam P - A valid path key of IFanzinProps, possibly nested.
   * @param {IFanzinProps} item - The source object from which the value is extracted.
   * @param {P} key - The property key (or nested key) to extract.
   * @returns {TPathValue<IFanzinProps, P> | null} The value at the specified key, or null if not present.
   */

  getDisplayValue<P extends TAllowedPaths<IFanzinProps>>(
    item: IFanzinProps,
    key: P,
  ): TPathValue<IFanzinProps, P> | null {
    if (key.includes('.')) {
      const [parentKey, childKey] = key.split('.');
      const parent = item[parentKey as keyof IFanzinProps];
      if (parent && typeof parent === 'object' && childKey in parent) {
        return (parent as unknown as Record<string, unknown>)[childKey] as TPathValue<
          IFanzinProps,
          P
        >;
      }
      return null;
    }

    return item[key as keyof IFanzinProps] as TPathValue<IFanzinProps, P> | null;
  }
}
