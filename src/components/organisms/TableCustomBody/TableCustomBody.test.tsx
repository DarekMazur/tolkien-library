import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import TableCustomBody from './TableCustomBody';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import { IBookProps } from '@/lib/types';
import * as createSlugModule from '@/lib/helpers/createSlug';
import * as validateISBNModule from '@/lib/helpers/validateISBN';

describe('TableCustomBody', () => {
  const baseBooks: IBookProps[] = [
    {
      id: '1',
      originalTitle: 'Orig1',
      polishTitle: 'Pol1',
      translator: {
        firstName: 'Jan',
        lastName: 'Kowalski',
        description: '',
        id: 'jk',
      },
      publisher: {
        title: 'Pub1',
        description: '',
        id: 'pub1',
      },
      year: 2020,
      publicationNumber: 2,
      cover: 'Twarda',
      series: 'Series1',
      isbn: '1234567890',
      author: null,
    },
    {
      id: '2',
      originalTitle: 'Orig2',
      polishTitle: 'Pol2',
      translator: null,
      publisher: {
        title: 'Pub1',
        description: '',
        id: 'pub1',
      },
      year: 2018,
      publicationNumber: 3,
      cover: 'Miękka',
      series: null,
      isbn: 'INVALID',
      author: null,
    },
  ];

  beforeAll(() => {
    vi.spyOn(createSlugModule, 'createSlug').mockImplementation((s) => `slug-${s}`);
    vi.spyOn(validateISBNModule, 'validateISBN').mockImplementation((isbn) => isbn !== 'INVALID');
  });

  it('renders sorted ascending by originalTitle when order="asc" and orderBy="originalTitle" (snapshot)', () => {
    const { asFragment } = renderWithProviders(
      <table>
        <TableCustomBody books={baseBooks} order="asc" orderBy="originalTitle" />
      </table>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders sorted descending by year when order="desc" and orderBy="year" (snapshot)', () => {
    const { asFragment } = renderWithProviders(
      <table>
        <TableCustomBody books={baseBooks} order="desc" orderBy="year" />
      </table>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('displays full translator name when present and empty when absent', () => {
    renderWithProviders(
      <table>
        <TableCustomBody books={baseBooks} order="asc" orderBy="id" />
      </table>,
    );

    const rows = screen.getAllByRole('row');
    expect(rows[0].querySelectorAll('td')[2].textContent).toBe('Jan Kowalski');
    expect(rows[1].querySelectorAll('td')[2].textContent).toBe('');
  });

  it('renders link to book detail using createSlug helper', () => {
    renderWithProviders(
      <table>
        <TableCustomBody books={[baseBooks[0]]} order="asc" orderBy="id" />
      </table>,
    );
    const link = screen.getByRole('link', { name: 'Pol1' });
    expect(link).toHaveAttribute('href', '/book/slug-Pol1');
  });

  it('renders "Incorrect number" when validateISBN returns false', () => {
    renderWithProviders(
      <table>
        <TableCustomBody books={[baseBooks[1]]} order="asc" orderBy="id" />
      </table>,
    );
    expect(screen.getByText('Incorrect number')).toBeInTheDocument();
  });

  it('renders numeric and string cells correctly', () => {
    renderWithProviders(
      <table>
        <TableCustomBody books={[baseBooks[0]]} order="asc" orderBy="id" />
      </table>,
    );
    expect(screen.getByText('2020')).toBeInTheDocument();
    expect(screen.getByText('Pub1')).toBeInTheDocument();
    expect(screen.getByText(2)).toBeInTheDocument();
    expect(screen.getByText('Twarda')).toBeInTheDocument();
    expect(screen.getByText('Series1')).toBeInTheDocument();
    expect(screen.getByText('Orig1')).toBeInTheDocument();
  });
});
