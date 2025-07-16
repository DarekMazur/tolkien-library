import {
  IMumakilProps,
  IHeaderDefinition,
  ITableStrategy,
  TPathValue,
  TAllowedPaths,
} from '@/lib/types';

export class OnlineTableStrategy implements ITableStrategy<IMumakilProps> {
  private readonly aliases: Readonly<Record<string, string>> = {
    publisher: 'publisher.title',
  } as const;

  getAliases(): Readonly<Record<string, string>> {
    return this.aliases;
  }

  getHeaders(item: IMumakilProps): IHeaderDefinition<IMumakilProps>[] {
    const propertyOrder: Exclude<keyof IMumakilProps, 'id'>[] = [
      'cover',
      'title',
      'year',
      'description',
    ];

    const headerDefinitions: Record<
      Exclude<keyof IMumakilProps, 'id'>,
      IHeaderDefinition<IMumakilProps>
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

  getDisplayValue<P extends TAllowedPaths<IMumakilProps>>(
    item: IMumakilProps,
    key: P,
  ): TPathValue<IMumakilProps, P> | null {
    if (key.includes('.')) {
      const [parentKey, childKey] = key.split('.');
      const parent = item[parentKey as keyof IMumakilProps];
      if (parent && typeof parent === 'object' && childKey in parent) {
        return (parent as unknown as Record<string, unknown>)[childKey] as TPathValue<
          IMumakilProps,
          P
        >;
      }
      return null;
    }

    return item[key as keyof IMumakilProps] as TPathValue<IMumakilProps, P> | null;
  }
}
