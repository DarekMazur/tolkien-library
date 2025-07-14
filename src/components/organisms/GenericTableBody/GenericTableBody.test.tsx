import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import GenericTableBody from '@/components/organisms/GenericTableBody/GenericTableBody';
import type { IBookProps, IHeaderDefinition, TAllowedPaths, TPathValue } from '@/lib/types';

type GDV = <P extends TAllowedPaths<IBookProps>>(
  item: IBookProps,
  key: P,
) => TPathValue<IBookProps, P> | null;

const headers: IHeaderDefinition<IBookProps>[] = [
  { key: 'originalTitle', displayTitle: 'Original Title' },
  { key: 'polishTitle', displayTitle: 'Polish Title' },
  { key: 'translator', displayTitle: 'Translator' },
  { key: 'publisher', displayTitle: 'Publisher' },
  { key: 'year', displayTitle: 'Year' },
];

const getCellTexts = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('td')).map((cell) => cell.textContent?.trim());

describe('GenericTableBody', () => {
  const sampleData: IBookProps[] = [
    {
      id: '1',
      originalTitle: 'The Hobbit',
      polishTitle: 'Hobbit, czyli tam i z powrotem',
      author: 'J.R.R. Tolkien',
      translator: {
        firstName: 'Marek',
        lastName: 'Oramus',
        id: 'marekoramus',
        description: '',
      },
      publisher: {
        title: 'Rebis',
        id: 'rebis',
        description: '',
      },
      year: 2020,
      publicationNumber: 5,
      cover: 'Miękka',
      series: 'Middle-earth',
      isbn: '9781234567897',
    },
    {
      id: '2',
      originalTitle: 'The Lord of the Rings',
      polishTitle: 'Władca Pierścieni',
      author: 'J.R.R. Tolkien',
      translator: {
        firstName: 'Marek',
        lastName: 'Oramus',
        id: 'marekoramus',
        description: '',
      },
      publisher: {
        title: 'Rebis',
        id: 'rebis',
        description: '',
      },
      year: 2019,
      publicationNumber: 3,
      cover: 'Twarda',
      series: 'Middle-earth',
      isbn: '9781234567890',
    },
    {
      id: '3',
      originalTitle: 'Unfinished Tales',
      polishTitle: 'Niedokończone opowieści',
      author: 'J.R.R. Tolkien',
      translator: {
        firstName: 'Marek',
        lastName: 'Oramus',
        id: 'marekoramus',
        description: '',
      },
      publisher: {
        title: 'Rebis',
        id: 'rebis',
        description: '',
      },
      year: 2021,
      publicationNumber: 2,
      cover: 'Miękka',
      series: null,
      isbn: '123INVALID',
    },
  ];

  const mockGetDisplayValue = vi.fn().mockImplementation((<P extends TAllowedPaths<IBookProps>>(
    item: IBookProps,
    key: P,
  ): TPathValue<IBookProps, P> | null => {
    const rawValue = (item as unknown as Record<string, unknown>)[key as string];
    if (rawValue == null) {
      return null;
    }
    if (typeof rawValue === 'object' && ('firstName' in rawValue || 'lastName' in rawValue)) {
      return rawValue as TPathValue<IBookProps, P>;
    }
    if (typeof rawValue === 'object' && 'title' in rawValue) {
      return rawValue.title as TPathValue<IBookProps, P>;
    }
    if (typeof rawValue === 'string' || typeof rawValue === 'number') {
      return rawValue as TPathValue<IBookProps, P>;
    }
    return null;
  }) as GDV);

  it('renders rows and cells correctly', () => {
    const { container } = renderWithProviders(
      <GenericTableBody
        data={sampleData}
        order="asc"
        orderBy={null}
        headers={headers}
        getDisplayValue={mockGetDisplayValue}
      />,
    );

    const rows = container.querySelectorAll('tr');
    expect(rows).toHaveLength(3);

    const texts = getCellTexts(container);
    expect(texts).toEqual([
      'The Hobbit',
      'Hobbit, czyli tam i z powrotem',
      'Marek Oramus',
      'Rebis',
      '2020',
      'The Lord of the Rings',
      'Władca Pierścieni',
      'Marek Oramus',
      'Rebis',
      '2019',
      'Unfinished Tales',
      'Niedokończone opowieści',
      'Marek Oramus',
      'Rebis',
      '2021',
    ]);
  });

  it('sorts by originalTitle ascending when orderBy="originalTitle"', () => {
    const { container } = renderWithProviders(
      <GenericTableBody
        data={sampleData}
        order="asc"
        orderBy="originalTitle"
        headers={headers}
        getDisplayValue={mockGetDisplayValue}
      />,
    );

    const texts = getCellTexts(container);
    expect(texts).toEqual([
      'The Hobbit',
      'Hobbit, czyli tam i z powrotem',
      'Marek Oramus',
      'Rebis',
      '2020',
      'The Lord of the Rings',
      'Władca Pierścieni',
      'Marek Oramus',
      'Rebis',
      '2019',
      'Unfinished Tales',
      'Niedokończone opowieści',
      'Marek Oramus',
      'Rebis',
      '2021',
    ]);
  });

  it('sorts by originalTitle descending when order="desc"', () => {
    const { container } = renderWithProviders(
      <GenericTableBody
        data={sampleData}
        order="desc"
        orderBy="originalTitle"
        headers={headers}
        getDisplayValue={mockGetDisplayValue}
      />,
    );

    const texts = getCellTexts(container);
    expect(texts).toEqual([
      'Unfinished Tales',
      'Niedokończone opowieści',
      'Marek Oramus',
      'Rebis',
      '2021',
      'The Lord of the Rings',
      'Władca Pierścieni',
      'Marek Oramus',
      'Rebis',
      '2019',
      'The Hobbit',
      'Hobbit, czyli tam i z powrotem',
      'Marek Oramus',
      'Rebis',
      '2020',
    ]);
  });

  it('renders links', () => {
    renderWithProviders(
      <GenericTableBody
        data={sampleData}
        order="desc"
        orderBy="originalTitle"
        headers={headers}
        getDisplayValue={mockGetDisplayValue}
      />,
    );

    const links = screen.getAllByRole('link');
    const titleLink = screen.getByRole('link', { name: /hobbit, czyli tam i z powrotem/i });
    const translatorLinks = screen.getAllByRole('link', { name: /marek oramus/i });
    const publisherLinks = screen.getAllByRole('link', { name: /rebis/i });

    expect(links).toHaveLength(9);
    expect(titleLink).toBeInTheDocument();
    expect(titleLink.getAttribute('href')).toBe('/library/books/hobbit-czyli-tam-i-z-powrotem');
    expect(translatorLinks).toHaveLength(3);
    expect(translatorLinks[0].getAttribute('href')).toBe('/library/translator/marek-oramus');
    expect(publisherLinks).toHaveLength(3);
    expect(publisherLinks[0].getAttribute('href')).toBe('/library/publishers/rebis');
  });

  it('renders "-" for null values', () => {
    const dataWithNull: IBookProps[] = [
      {
        id: '1',
        originalTitle: null,
        polishTitle: 'Hobbit, czyli tam i z powrotem',
        author: null,
        translator: null,
        publisher: {
          title: 'Rebis',
          id: 'rebis',
          description: '',
        },
        year: 2020,
        publicationNumber: 5,
        cover: null,
        series: null,
        isbn: '9781234567897',
      },
    ];
    const { container } = renderWithProviders(
      <GenericTableBody
        data={dataWithNull}
        order="asc"
        orderBy={null}
        headers={headers}
        getDisplayValue={mockGetDisplayValue}
      />,
    );

    const texts = getCellTexts(container);
    expect(texts).toEqual(['-', 'Hobbit, czyli tam i z powrotem', '-', 'Rebis', '2020']);
  });

  it('matches snapshot with sorted data', () => {
    const tree = renderWithProviders(
      <GenericTableBody
        data={sampleData}
        order="asc"
        orderBy="originalTitle"
        headers={headers}
        getDisplayValue={mockGetDisplayValue}
      />,
    ).container;
    expect(tree).toMatchSnapshot();
  });
});
