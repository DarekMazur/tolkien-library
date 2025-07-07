import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import BooksPage from './BooksPage';
import { IBookProps } from '@/lib/types';

const specials = /[*+~.,()'"!:@]/g;
vi.mock('@/lib/helpers/createSlug', () => ({
  createSlug: (s: string) =>
    `${s
      .replace(/\s+/g, '-')
      .replace(/ą/gi, 'a')
      .replace(/ć/gi, 'c')
      .replace(/ę/gi, 'e')
      .replace(/ł/gi, 'l')
      .replace(/ń/gi, 'n')
      .replace(/ó/gi, 'o')
      .replace(/[żź]/gi, 'z')
      .replace(/ś/gi, 's')
      .split('')
      .filter((char) => !specials.test(char))
      .join('')
      .toLowerCase()}`,
}));
vi.mock('@/lib/helpers/validateISBN', () => ({
  validateISBN: (isbn: string) => isbn.startsWith('978'),
}));

const sampleBooks: IBookProps[] = [
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
    originalTitle: 'Unfinished Tales',
    polishTitle: 'Niedokończone opowieści',
    author: 'J.R.R. Tolkien',
    translator: {
      firstName: 'Marta',
      lastName: 'Nowak',
      id: 'martanowak',
      description: '',
    },
    publisher: {
      title: 'Zysk i S-ks',
      id: 'zysk',
      description: '',
    },
    year: 2021,
    publicationNumber: 2,
    cover: 'Twarda',
    series: null,
    isbn: '123INVALID',
  },
];

describe('BooksPage component', () => {
  it('should render heading and subheading correctly', () => {
    renderWithProviders(<BooksPage books={sampleBooks} />);
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe(
      "J.R.R. Tolkien's books catalog",
    );
    expect(screen.getByText('Catalog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3 }).textContent).toBe('Publications list');
  });

  it('should render table headers in correct order', () => {
    renderWithProviders(<BooksPage books={sampleBooks} />);
    const headers = screen.getAllByRole('columnheader').map((h) => h.textContent);
    expect(headers).toEqual([
      'Original Title',
      'Polish Title',
      'Translator',
      'Publisher',
      'Year',
      'Pub. no',
      'Cover',
      'Series',
      'ISBN',
    ]);
  });

  it('should render a row for each book with correct data', () => {
    renderWithProviders(<BooksPage books={sampleBooks} />);

    expect(screen.getByText('The Hobbit')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Hobbit, czyli tam i z powrotem/ })).toHaveAttribute(
      'href',
      '/book/hobbit-czyli-tam-i-z-powrotem',
    );
    expect(screen.getByText('Marek Oramus')).toBeInTheDocument();
    expect(screen.getByText('Rebis')).toBeInTheDocument();
    expect(screen.getByText('2020')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Miękka')).toBeInTheDocument();
    expect(screen.getByText('Middle-earth')).toBeInTheDocument();
    expect(screen.getByText('9781234567897')).toBeInTheDocument();

    expect(screen.getByText('Unfinished Tales')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Niedokończone opowieści/ })).toHaveAttribute(
      'href',
      '/book/niedokonczone-opowiesci',
    );
    expect(screen.getByText('Incorrect number')).toBeInTheDocument();
  });

  it('should display alert when books list is empty', () => {
    renderWithProviders(<BooksPage books={[]} />);
    expect(screen.getByText('No books found')).toBeInTheDocument();
  });

  it('should match snapshot when books list is provided', () => {
    const { asFragment } = renderWithProviders(<BooksPage books={sampleBooks} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should match snapshot when books list is empty', () => {
    const { asFragment } = renderWithProviders(<BooksPage books={[]} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
