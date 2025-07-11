import {
  IOnlineProps,
  IHeaderDefinition,
  ITableStrategy,
  TNestedKeyOf,
  TPathValue,
  TAllowedPaths,
} from '@/lib/types';

export class OnlineTableStrategy implements ITableStrategy<IOnlineProps> {
  private readonly aliases = {
    publisher: 'publisher.title',
  } as const;

  getAliases() {
    return this.aliases;
  }

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

  getDisplayValue<P extends TAllowedPaths<IOnlineProps>>(
    item: IOnlineProps,
    key: P,
  ): TPathValue<IOnlineProps, P> | null {
    console.log(item);
    console.log(key);

    return null;
  }
}
