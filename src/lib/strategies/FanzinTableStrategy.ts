import {
  IFanzinProps,
  IHeaderDefinition,
  ITableStrategy,
  TNestedKeyOf,
  TPathValue,
  TAllowedPaths,
} from '@/lib/types';

export class FanzinTableStrategy implements ITableStrategy<IFanzinProps> {
  private readonly aliases: Readonly<Record<string, string>> = {
    publisher: 'publisher.title',
  } as const;

  getAliases(): Readonly<Record<string, string>> {
    return this.aliases;
  }

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
