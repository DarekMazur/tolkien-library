import { useMemo } from 'react';
import {
  EPublicationType,
  TPublicationType,
  TAllowedPaths,
  ITableStrategy,
  TPathValue,
} from '@/lib/types';
import { TableStrategyFactory } from '@/lib/factories/TableStrategyFactory';

export const useGenericHeaders = <T extends TPublicationType>(
  items: T[],
  publicationType: EPublicationType,
) => {
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
