import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TranslatedBooksList from './TranslatedBooksList';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import { MemoryRouter } from 'react-router';
import * as createSlugModule from '@/lib/helpers/createSlug';

const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
  const actual = (await vi.importActual('react-router')) as Record<string, unknown>;
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('TranslatedBooksList component', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  it('should render empty-state message when books prop is null', () => {
    renderWithProviders(
      <MemoryRouter>
        <TranslatedBooksList books={null} />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { level: 2, name: /Translated books:/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/No translated books found/i)).toBeInTheDocument();
  });

  it('should render empty-state message when books array is empty', () => {
    renderWithProviders(
      <MemoryRouter>
        <TranslatedBooksList books={[]} />
      </MemoryRouter>,
    );

    expect(screen.getByText(/No translated books found/i)).toBeVisible();
  });

  it('should render list of books with proper polish titles', () => {
    const mockBooks = [
      {
        id: '1',
        originalTitle: 'The Hobbit',
        polishTitle: 'Hobbit, czyli tam i z powrotem',
        author: 'J.R.R. Tolkien',
        translator: {
          firstName: 'Marek',
          lastName: 'Oramus',
          id: 'marekormus',
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
          id: 'marekormus',
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
    ];

    renderWithProviders(
      <MemoryRouter>
        <TranslatedBooksList books={mockBooks} />
      </MemoryRouter>,
    );

    mockBooks.forEach((book) => {
      expect(screen.getByRole('button', { name: book.polishTitle })).toBeInTheDocument();
    });
  });

  it('should navigate with slugified title on click', async () => {
    const user = userEvent.setup();
    const mockBooks = [
      {
        id: '1',
        originalTitle: 'The Hobbit',
        polishTitle: 'Hobbit, czyli tam i z powrotem',
        author: 'J.R.R. Tolkien',
        translator: {
          firstName: 'Marek',
          lastName: 'Oramus',
          id: 'marekormus',
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
          id: 'marekormus',
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
    ];

    const slugSpy = vi.spyOn(createSlugModule, 'createSlug');

    renderWithProviders(
      <MemoryRouter>
        <TranslatedBooksList books={mockBooks} />
      </MemoryRouter>,
    );

    const target = screen.getByRole('button', { name: /Hobbit, czyli tam i z powrotem/i });

    await user.click(target);

    expect(slugSpy).toHaveBeenCalledWith('Hobbit, czyli tam i z powrotem');

    expect(mockNavigate).toHaveBeenCalledWith('/library/books/hobbit-czyli-tam-i-z-powrotem');
  });

  it('should match snapshot with two translated books', () => {
    const mockBooks = [
      {
        id: '1',
        originalTitle: 'The Hobbit',
        polishTitle: 'Hobbit, czyli tam i z powrotem',
        author: 'J.R.R. Tolkien',
        translator: {
          firstName: 'Marek',
          lastName: 'Oramus',
          id: 'marekormus',
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
          id: 'marekormus',
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
    ];

    const { asFragment } = renderWithProviders(
      <MemoryRouter>
        <TranslatedBooksList books={mockBooks} />
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should apply fit-content styling to List wrapper', () => {
    const mockBooks = [
      {
        id: '1',
        originalTitle: 'The Hobbit',
        polishTitle: 'Hobbit, czyli tam i z powrotem',
        author: 'J.R.R. Tolkien',
        translator: {
          firstName: 'Marek',
          lastName: 'Oramus',
          id: 'marekormus',
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
    ];

    renderWithProviders(
      <MemoryRouter>
        <TranslatedBooksList books={mockBooks} />
      </MemoryRouter>,
    );

    const list = screen.getByRole('list');
    expect(list).toHaveStyle({ width: 'fit-content' });
  });
});
