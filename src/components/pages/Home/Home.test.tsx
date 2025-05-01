import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import Home from './Home';
import * as store from '@/../store';
import { renderWithProviders } from '@/lib/providers/renderWithProviders.tsx';

vi.mock('@/../store', async () => {
  const actual = await vi.importActual<typeof store>('@/../store');
  return {
    ...actual,
    useGetArticlesQuery: vi.fn(),
  };
});

const mockUseGetArticlesQuery = store.useGetArticlesQuery as jest.Mock;

describe('Home', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders static text "Lorem Ipsum"', () => {
    mockUseGetArticlesQuery.mockReturnValue({ data: undefined });
    renderWithProviders(<Home />);
    expect(screen.getByText('Lorem Ipsum')).toBeInTheDocument();
  });

  it('renders nothing when newsList is undefined', () => {
    mockUseGetArticlesQuery.mockReturnValue({ data: undefined });
    const { container } = renderWithProviders(<Home />);
    const card = container.querySelector('.MuiCard-root');
    expect(card).not.toBeInTheDocument();
  });

  it('renders nothing when newsList is empty', () => {
    const { container } = renderWithProviders(<Home />);
    const card = container.querySelector('.MuiCard-root');
    expect(card).not.toBeInTheDocument();
  });

  it('renders ArticleCard for each item in newsList', () => {
    const articles = [
      {
        id: '1',
        date: new Date('2024-05-01T10:00:00Z'),
        category: 'Tech',
        content: '# Hello World\nThis is **markdown** content.',
      },
      {
        id: '2',
        date: new Date('2024-04-04T10:00:00Z'),
        category: 'Edu',
        content: '# Hello World\nThis is **NEW markdown** content.',
      },
    ];
    mockUseGetArticlesQuery.mockReturnValue({ data: articles });
    const { container } = renderWithProviders(<Home />);
    const card = container.querySelectorAll('.MuiCard-root');
    expect(card).toHaveLength(2);
  });

  it('passes correct props to ArticleCard', () => {
    const articles = [
      {
        id: '1',
        date: new Date('2024-05-01T10:00:00Z'),
        category: 'Tech',
        content: '# Hello World\nThis is test **markdown** content.',
      },
    ];
    mockUseGetArticlesQuery.mockReturnValue({ data: articles });
    renderWithProviders(<Home />);
    expect(screen.getByText(/this is test/i)).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    mockUseGetArticlesQuery.mockReturnValue({
      data: [{ id: 1, title: 'Snapshot Article' }],
    });
    const { asFragment } = renderWithProviders(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });
});
