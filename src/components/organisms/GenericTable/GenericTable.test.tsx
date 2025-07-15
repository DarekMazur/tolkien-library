import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import GenericTable from './GenericTable';

import { ETableType, IPublicationProps, TAllowedPaths } from '@/lib/types';
import { IHeaderDefinition } from '@/lib/types/table.types';

type PublicationKey = TAllowedPaths<IPublicationProps>;

const mockData: IPublicationProps[] = [
  {
    id: '1',
    title: 'Silmarillion',
    author: 'J.R.R. Tolkien',
    publisher: { id: 'p1', title: 'Allen & Unwin', description: '' },
    year: '1977',
    isbn: '9780007136599',
    issn: null,
    description: 'Legendarium',
  },
  {
    id: '2',
    title: 'Hobbit',
    author: 'J.R.R. Tolkien',
    publisher: { id: 'p2', title: 'Allen & Unwin', description: '' },
    year: '1937',
    isbn: '9780007118359',
    issn: null,
    description: 'Przygody Bilba',
  },
];

const mockHeaders: IHeaderDefinition<IPublicationProps>[] = [
  { key: 'title', displayTitle: 'Tytuł' },
  { key: 'author', displayTitle: 'Autor' },
  { key: 'publisher.title', displayTitle: 'Wydawca' },
  { key: 'year', displayTitle: 'Rok' },
];

const mockGetDisplayValue = (item: IPublicationProps, key: PublicationKey): string | null => {
  switch (key) {
    case 'title':
      return item.title;
    case 'author':
      return item.author;
    case 'year':
      return item.year;
    case 'publisher.title':
      return item.publisher.title;
    case 'isbn':
      return item.isbn ?? null;
    case 'issn':
      return item.issn ?? null;
    case 'description':
      return item.description;
    default:
      return null;
  }
};

vi.mock('@/hooks/useGenericHeaders', () => ({
  useGenericHeaders: vi.fn(() => ({
    headers: mockHeaders,
    getDisplayValue: mockGetDisplayValue,
    aliases: { publisher: 'publisher.title' },
  })),
}));

vi.mock('@/components/molecules/TableHeader/TableHeader', () => ({
  default: ({
    order,
    orderBy,
    handleRequestSort,
    headerTitles,
  }: {
    order: 'asc' | 'desc';
    orderBy: PublicationKey | null;
    handleRequestSort: (key: PublicationKey) => void;
    headerTitles: { key: PublicationKey; displayTitle: string }[];
  }) => (
    <thead data-testid="table-header">
      <tr>
        {headerTitles.map(({ key, displayTitle }) => (
          <th key={key} onClick={() => handleRequestSort(key)} data-testid={`header-${key}`}>
            {displayTitle}
            {orderBy === key && (
              <span data-testid={`sort-indicator-${order}`}>{order === 'asc' ? '↑' : '↓'}</span>
            )}
          </th>
        ))}
      </tr>
    </thead>
  ),
}));

vi.mock('../GenericTableBody/GenericTableBody', () => ({
  default: ({
    data,
    headers,
    getDisplayValue,
  }: {
    data: IPublicationProps[];
    headers: IHeaderDefinition<IPublicationProps>[];
    getDisplayValue: (item: IPublicationProps, key: PublicationKey) => string | null;
    order: 'asc' | 'desc';
    orderBy: PublicationKey | null;
  }) => (
    <tbody data-testid="table-body">
      {data.map((item, rowIdx) => (
        <tr key={item.id} data-testid={`table-row-${rowIdx}`}>
          {headers.map(({ key }) => (
            <td key={key} data-testid={`cell-${rowIdx}-${key}`}>
              {getDisplayValue(item, key)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  ),
}));

describe('GenericTable', () => {
  const defaultProps = {
    data: mockData,
    publicationType: ETableType.ARTICLE,
    title: 'Test Table Title',
    subtitle: 'Test Table Subtitle',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders title and subtitle correctly', () => {
      renderWithProviders(<GenericTable {...defaultProps} />);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Table Title');
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Test Table Subtitle');
    });

    it('omits subtitle when undefined', () => {
      const props = { ...defaultProps, subtitle: undefined };
      renderWithProviders(<GenericTable {...props} />);
      expect(screen.queryByRole('heading', { level: 2 })).toBeNull();
    });

    it('renders table structure', () => {
      renderWithProviders(<GenericTable {...defaultProps} />);
      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getByTestId('table-header')).toBeInTheDocument();
      expect(screen.getByTestId('table-body')).toBeInTheDocument();
    });
  });

  describe('Sorting behavior', () => {
    it('toggles sort order on header click', () => {
      renderWithProviders(<GenericTable {...defaultProps} />);
      const header = screen.getByTestId('header-title');
      fireEvent.click(header);
      expect(screen.getByTestId('sort-indicator-asc')).toBeInTheDocument();
      fireEvent.click(header);
      expect(screen.getByTestId('sort-indicator-desc')).toBeInTheDocument();
    });

    it('resets previous sort when new header clicked', () => {
      renderWithProviders(<GenericTable {...defaultProps} />);
      const titleHeader = screen.getByTestId('header-title');
      const authorHeader = screen.getByTestId('header-author');
      fireEvent.click(titleHeader);
      fireEvent.click(authorHeader);
      expect(screen.getByTestId('sort-indicator-asc')).toBeInTheDocument();
      expect(screen.queryByTestId('sort-indicator-desc')).toBeNull();
    });
  });

  describe('Data rendering', () => {
    it('renders correct number of rows and cells', () => {
      renderWithProviders(<GenericTable {...defaultProps} />);
      mockData.forEach((_, idx) => {
        expect(screen.getByTestId(`table-row-${idx}`)).toBeInTheDocument();
        mockHeaders.forEach(({ key }) => {
          expect(screen.getByTestId(`cell-${idx}-${key}`)).toBeInTheDocument();
        });
      });
    });

    it('renders correct cell content', () => {
      renderWithProviders(<GenericTable {...defaultProps} />);
      expect(screen.getByTestId('cell-0-title')).toHaveTextContent('Silmarillion');
      expect(screen.getByTestId('cell-0-author')).toHaveTextContent('J.R.R. Tolkien');
      expect(screen.getByTestId('cell-0-publisher.title')).toHaveTextContent('Allen & Unwin');
      expect(screen.getByTestId('cell-0-year')).toHaveTextContent('1977');
    });

    it('renders empty table body for empty data', () => {
      renderWithProviders(<GenericTable {...defaultProps} data={[]} />);
      expect(screen.getByTestId('table-body').children.length).toBe(0);
    });
  });

  describe('Snapshot tests', () => {
    it('matches snapshot (full props)', () => {
      const { container } = renderWithProviders(<GenericTable {...defaultProps} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot (no subtitle)', () => {
      const { container } = renderWithProviders(
        <GenericTable {...{ ...defaultProps, subtitle: undefined }} />,
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot (empty data)', () => {
      const { container } = renderWithProviders(
        <GenericTable {...{ ...defaultProps, data: [] }} />,
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
