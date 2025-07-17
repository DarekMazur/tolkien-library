import {
  IFanEditionsProps,
  IHeaderDefinition,
  ITableStrategy,
  TPathValue,
  TAllowedPaths,
} from '@/lib/types';

/**
 * FanEditionTableStrategy implements the ITableStrategy interface for IFanEditionsProps.
 * It provides table header definitions and value extraction logic for fan edition items.
 */

export class FanEditionTableStrategy implements ITableStrategy<IFanEditionsProps> {
  /**
   * A read-only map of alias keys to nested property paths.
   * Currently empty because no aliases are in use.
   * @readonly
   * @private
   * @type {Readonly<Record<string, string>>}
   */

  private readonly aliases: Readonly<Record<string, string>> = {} as const;
  /**
   * Returns the current alias mappings.
   *
   * @returns {Readonly<Record<string, string>>} An object where each key is
   *  an alias and each value is the corresponding nested property path.
   */

  getAliases(): Readonly<Record<string, string>> {
    return this.aliases;
  }
  /**
   * Builds and returns an array of header definitions for a given item.
   *
   * The headers appear in the fixed order: cover, title, year, description.
   * Optional headers are included only if the corresponding property exists
   * on the item and any defined `condition` functions return true.
   *
   * @param {IFanEditionsProps} item - The fan edition item to generate headers for.
   * @returns {IHeaderDefinition<IFanEditionsProps>[]} Array of header definitions.
   */

  getHeaders(item: IFanEditionsProps): IHeaderDefinition<IFanEditionsProps>[] {
    const propertyOrder: Exclude<keyof IFanEditionsProps, 'id' | 'isMumakil'>[] = [
      'cover',
      'title',
      'year',
      'description',
    ];

    const headerDefinitions: Record<
      Exclude<keyof IFanEditionsProps, 'id' | 'isMumakil'>,
      IHeaderDefinition<IFanEditionsProps>
    > = {
      cover: { displayTitle: 'Cover', key: 'cover', sortable: true },
      title: { displayTitle: 'Title', key: 'title', sortable: true },
      year: { displayTitle: 'Year', key: 'year', sortable: true },
      description: { displayTitle: 'Description', key: 'description', sortable: true },
    };

    return propertyOrder
      .filter((prop) => prop in item)
      .map((prop) => headerDefinitions[prop])
      .filter((definition) => !definition.condition || definition.condition(item));
  }
  /**
   * Retrieves the display value for a given key on the item.
   *
   * Supports both shallow keys (e.g. 'title') and nested keys (e.g. 'publisher.title').
   * If the key includes a dot, the method attempts to access the nested property.
   * Returns `null` if the nested path is invalid or the property is missing.
   *
   * @template P
   * @param {IFanEditionsProps} item - The item to extract the value from.
   * @param {P} key - The property key or alias (allowed paths) to retrieve.
   * @returns {(TPathValue<IFanEditionsProps, P> | null)} The extracted value or `null` if not found.
   */

  getDisplayValue<P extends TAllowedPaths<IFanEditionsProps>>(
    item: IFanEditionsProps,
    key: P,
  ): TPathValue<IFanEditionsProps, P> | null {
    if (key.includes('.')) {
      const [parentKey, childKey] = key.split('.');
      const parent = item[parentKey as keyof IFanEditionsProps];
      if (parent && typeof parent === 'object' && childKey in parent) {
        return (parent as unknown as Record<string, unknown>)[childKey] as TPathValue<
          IFanEditionsProps,
          P
        >;
      }
      return null;
    }

    return item[key as keyof IFanEditionsProps] as TPathValue<IFanEditionsProps, P> | null;
  }
}
