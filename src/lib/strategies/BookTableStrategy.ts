import {
  IBookProps,
  IHeaderDefinition,
  ITableStrategy,
  TNestedKeyOf,
  TPathValue,
} from '@/lib/types';

export class BookTableStrategy implements ITableStrategy<IBookProps> {
  private readonly aliases = {
    translator: 'translator.lastName',
    publisher: 'publisher.title',
  } as const;

  getAliases(): Record<string, string> {
    return this.aliases;
  }

  getHeaders(item: IBookProps): IHeaderDefinition<IBookProps>[] {
    const propertyOrder: Exclude<keyof IBookProps, 'id'>[] = [
      'originalTitle',
      'polishTitle',
      'author',
      'translator',
      'publisher',
      'year',
      'publicationNumber',
      'cover',
      'series',
      'isbn',
    ];

    const headerDefinitions: Record<
      Exclude<keyof IBookProps, 'id'>,
      IHeaderDefinition<IBookProps>
    > = {
      originalTitle: { displayTitle: 'Original Title', key: 'originalTitle', sortable: true },
      polishTitle: { displayTitle: 'Polish Title', key: 'polishTitle', sortable: true },
      author: {
        displayTitle: 'Author',
        key: 'author',
        condition: (item: IBookProps) => item.author !== 'J.R.R. Tolkien',
        sortable: true,
      },
      translator: {
        displayTitle: 'Translator',
        key: 'translator.lastName' as TNestedKeyOf<IBookProps>,
        condition: (item: IBookProps) => item.author === 'J.R.R. Tolkien',
        sortable: true,
      },
      publisher: {
        displayTitle: 'Publisher',
        key: 'publisher.title' as TNestedKeyOf<IBookProps>,
        sortable: true,
      },
      year: { displayTitle: 'Year', key: 'year', sortable: true },
      publicationNumber: { displayTitle: 'Pub. no', key: 'publicationNumber', sortable: true },
      cover: {
        displayTitle: 'Cover',
        key: 'cover',
        condition: (item: IBookProps) => item.author === 'J.R.R. Tolkien',
        sortable: false,
      },
      series: {
        displayTitle: 'Series',
        key: 'series',
        condition: (item: IBookProps) => item.author === 'J.R.R. Tolkien',
        sortable: true,
      },
      isbn: { displayTitle: 'ISBN', key: 'isbn', sortable: true },
    };

    return propertyOrder
      .filter((prop) => prop in item)
      .map((prop) => headerDefinitions[prop])
      .filter((definition) => !definition.condition || definition.condition(item));
  }

  getDisplayValue<P extends TNestedKeyOf<IBookProps>>(
    item: IBookProps,
    key: P,
  ): TPathValue<IBookProps, P> | null {
    if (key.includes('.')) {
      const [parentKey, childKey] = key.split('.') as [keyof IBookProps, string];
      const parent = item[parentKey];
      if (parent && typeof parent === 'object' && childKey in parent) {
        return (parent as unknown as Record<string, unknown>)[childKey] as TPathValue<
          IBookProps,
          P
        >;
      }
      return null;
    }

    return item[key as keyof IBookProps] as TPathValue<IBookProps, P>;
  }
}
