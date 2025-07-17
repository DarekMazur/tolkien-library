import {
  IFanEditionsProps,
  IHeaderDefinition,
  ITableStrategy,
  TPathValue,
  TAllowedPaths,
} from '@/lib/types';

export class FanEditionTableStrategy implements ITableStrategy<IFanEditionsProps> {
  private readonly aliases: Readonly<Record<string, string>> = {} as const;

  getAliases(): Readonly<Record<string, string>> {
    return this.aliases;
  }

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
