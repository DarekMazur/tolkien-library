import {
  IPublicationProps,
  IHeaderDefinition,
  ITableStrategy,
  TNestedKeyOf,
  TPathValue,
} from '@/lib/types';

export class ArticleTableStrategy implements ITableStrategy<IPublicationProps> {
  private readonly aliases = {
    publisher: 'publisher.title',
  } as const;

  getAliases() {
    return this.aliases;
  }

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

  getDisplayValue<P extends TNestedKeyOf<IPublicationProps>>(
    item: IPublicationProps,
    key: P,
  ): TPathValue<IPublicationProps, P> | null {
    if (key.includes('.')) {
      const [parentKey, childKey] = key.split('.');
      const parent = item[parentKey as keyof IPublicationProps];
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
