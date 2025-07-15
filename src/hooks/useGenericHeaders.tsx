import { useMemo } from 'react';
import {
  ETableType,
  TPublicationType,
  TAllowedPaths,
  ITableStrategy,
  TPathValue,
  IHeaderDefinition,
} from '@/lib/types';
import { TableStrategyFactory } from '@/lib/factories/TableStrategyFactory';

/**
 * Hook to generate table headers and value display functions for various publication types.
 *
 * @template {TPublicationType} T - Publication object type extending TPublicationType
 *
 * @param {T[]} items - Array of publication elements to be processed
 * @param {ETableType} publicationType - The type of publication that determines the processing strategy
 *
 * @returns {{
 *   headers: IHeaderDefinition<T>[],
 *   getDisplayValue: <P extends TAllowedPaths<T>>(item: T, key: P) => TPathValue<T, P> | null,
 *   aliases: Record<string, string>
 * }} Object containing table headers, function to retrieve display values and aliases
 *
 * @property {string[]} headers - An array of table headers generated from the first element
 * @property {Function} getDisplayValue - Function to retrieve the formatted value displayed for a given key
 * @property {Record<string, string>} aliases - Alias map of column names to display
 *
 * @example
 * // Basic use with articles
 * const articles = [
 *   { title: "Artykuł 1", author: "Jan Kowalski", date: "2023-01-01" },
 *   { title: "Artykuł 2", author: "Anna Nowak", date: "2023-01-02" }
 * ];
 *
 * const { headers, getDisplayValue, aliases } = useGenericHeaders(
 *   articles,
 *   ETableType.ARTICLE
 * );
 *
 * // Using headers in a table component
 * headers.forEach(header => {
 *   const displayValue = getDisplayValue(articles[0], header);
 *   console.log(`${aliases[header] || header}: ${displayValue}`);
 * });
 *
 * @example
 * // Use with an empty array
 * const { headers } = useGenericHeaders([], ETableType.BOOK);
 * console.log(headers); // []
 *
 * @see {@link TableStrategyFactory} - Table strategy factory
 * @see {@link ITableStrategy} - Table strategy interface
 * @see {@link ETableType} - Enum of publication types
 */

export const useGenericHeaders = <T extends TPublicationType>(
  items: T[],
  publicationType: ETableType,
): {
  headers: IHeaderDefinition<T>[];
  getDisplayValue: <P extends TAllowedPaths<T>>(item: T, key: P) => TPathValue<T, P> | null;
  aliases: Record<string, string>;
} => {
  const strategy = useMemo(
    () => TableStrategyFactory.createStrategy(publicationType) as ITableStrategy<T>,
    [publicationType],
  );

  const headers = useMemo(() => {
    if (items.length === 0) return [];
    return strategy.getHeaders(items[0]);
  }, [items, strategy]);

  const getDisplayValue = useMemo(() => {
    return <P extends TAllowedPaths<T>>(item: T, key: P): TPathValue<T, P> | null => {
      return strategy.getDisplayValue(item, key);
    };
  }, [strategy]);

  const aliases = useMemo(() => strategy.getAliases(), [strategy]);

  return { headers, getDisplayValue, aliases };
};
