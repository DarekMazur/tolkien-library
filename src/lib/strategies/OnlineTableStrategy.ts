import {
  IOnlineProps,
  IHeaderDefinition,
  ITableStrategy,
  TNestedKeyOf,
  TPathValue,
  TAllowedPaths,
} from '@/lib/types';

/**
 * Table handling strategy for online data.
 * Implements the ITableStrategy interface for objects of type IOnlineProps.
 * Provides functionality for generating table headers, column aliases and retrieving values for display.
 *
 * @implements {ITableStrategy<IOnlineProps>}
 * @template {IOnlineProps} T
 * @example
 * // Create an instance of the strategy
 * const strategy = new OnlineTableStrategy();
 *
 * // Downloading aliases
 * const aliases = strategy.getAliases();
 * console.log(aliases.publisher); // "publisher.title"
 *
 * // Generating headers for an element
 * const headers = strategy.getHeaders(onlineItem);
 *
 * // Downloading values for display
 * const publisherName = strategy.getDisplayValue(onlineItem, 'publisher.title');
 *
 */

export class OnlineTableStrategy implements ITableStrategy<IOnlineProps> {
  /**
   * Column alias map used to map nested keys.
   * Defines shortcuts for complex property access paths.
   *
   * @type {Readonly<Record<string, string>>}
   * @readonly
   * @private
   * @example
   * {
   *   publisher: 'publisher.title'
   * }
   */

  private readonly aliases: Readonly<Record<string, string>> = {
    publisher: 'publisher.title',
  } as const;

  /**
   * Retrieves a map of column aliases.
   * Returns an object containing a mapping between alias names and actual paths to properties.
   *
   * @returns {Readonly<Record<string, string>>} Column alias map
   * @example
   * const strategy = new OnlineTableStrategy();
   * const aliases = strategy.getAliases();
   * console.log(aliases.publisher); // "publisher.title"
   *
   */

  getAliases(): Readonly<Record<string, string>> {
    return this.aliases;
  }

  /**
   * Generates table header definitions based on the passed element.
   * Returns an array of header definitions in the specified order, filtering out those,
   * that do not meet the conditions or do not exist in the element.
   *
   * @param {IOnlineProps} item - Data element for which headers are generated
   * @returns {IHeaderDefinition<IOnlineProps>[]} Header definition table
   * @throws {TypeError} When the passed parameter is not an object
   * @example
   * const strategy = new OnlineTableStrategy();
   * const headers = strategy.getHeaders({
   *   id: 1,
   *   title: "Example Title",
   *   version: "1.0",
   *   publisher: { title: "Publisher Name" },
   *   startDate: "2023-01-01",
   *   lastIssueDate: "2023-12-31"
   * });
   *
   * // Returns an array with header definitions for all columns
   *
   */

  getHeaders(item: IOnlineProps): IHeaderDefinition<IOnlineProps>[] {
    const propertyOrder: Exclude<keyof IOnlineProps, 'id'>[] = [
      'title',
      'version',
      'publisher',
      'startDate',
      'lastIssueDate',
    ];

    const headerDefinitions: Record<
      Exclude<keyof IOnlineProps, 'id'>,
      IHeaderDefinition<IOnlineProps>
    > = {
      title: { displayTitle: 'Title', key: 'title', sortable: true },
      version: { displayTitle: 'Version', key: 'version', sortable: true },
      publisher: {
        displayTitle: 'Publisher',
        key: 'publisher.title' as TNestedKeyOf<IOnlineProps>,
        sortable: true,
      },
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
   * Retrieves the value to display for a specified key from an object.
   * Supports both simple properties and nested paths (e.g. ‘publisher.title’).
   *
   * @template {TAllowedPaths<IOnlineProps>} P
   * @param {IOnlineProps} item - The object from which the value is taken
   * @param {P} key - Key or path to the property (may include a dot for nested properties)
   * @returns {TPathValue<IOnlineProps, P> | null} Property value or null if not found
   * @throws {TypeError} When the item passed is not an object
   * @example
   * const strategy = new OnlineTableStrategy();
   * const item = {
   *   title: "Example Title",
   *   publisher: { title: "Publisher Name" }
   * };
   *
   * // Downloading a simple property
   * const title = strategy.getDisplayValue(item, 'title');
   * console.log(title); // "Example Title"
   *
   * // Downloading a nested property
   * const publisherName = strategy.getDisplayValue(item, 'publisher.title');
   * console.log(publisherName); // "Publisher Name"
   *
   * // The property does not exist
   * const missing = strategy.getDisplayValue(item, 'nonexistent');
   * console.log(missing); // null
   *
   */

  getDisplayValue<P extends TAllowedPaths<IOnlineProps>>(
    item: IOnlineProps,
    key: P,
  ): TPathValue<IOnlineProps, P> | null {
    if (key.includes('.')) {
      const [parentKey, childKey] = key.split('.');
      const parent = item[parentKey as keyof IOnlineProps];
      if (parent && typeof parent === 'object' && childKey in parent) {
        return (parent as unknown as Record<string, unknown>)[childKey] as TPathValue<
          IOnlineProps,
          P
        >;
      }
      return null;
    }

    return item[key as keyof IOnlineProps] as TPathValue<IOnlineProps, P> | null;
  }
}
