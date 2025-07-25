import { screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import LibraryPage from './LibraryPage';
import * as reactRouter from 'react-router';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import { IPageProps } from '@/lib/types';
import * as useApiModule from '@/hooks/useApi';
import * as apiModule from '@/lib/getDataFromApi';
import '@testing-library/jest-dom';
import { useLocation, Location, MemoryRouter } from 'react-router';
import { getPageBySlug } from '@/lib/getDataFromApi';

vi.mock('@/hooks/useApi');
vi.mock('@/lib/getDataFromApi', () => ({
  getPageBySlug: vi.fn(),
}));

vi.mocked(apiModule.getPageBySlug).mockResolvedValue({
  data: null,
  isError: false,
  errorMessage: null,
});

type GetPageBySlugReturn = ReturnType<typeof getPageBySlug>;
type PageResponseType = Awaited<GetPageBySlugReturn>;

const mockUseApi = vi.mocked(useApiModule.useApi);
mockUseApi.mockReturnValue({
  data: null,
  isError: false,
  isLoading: false,
  errorMessage: null,
});

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useLocation: vi.fn(),
  };
});

describe('LibraryPage Component', () => {
  const mockLocation = {
    pathname: '/test-page',
    search: '',
    hash: '',
    state: null,
    key: 'default',
  };

  const mockPageData: IPageProps = {
    id: '1',
    title: 'Test Page Title',
    content: '# Test Content\n\nThis is test markdown content.',
    slug: 'test-page-title',
  };

  beforeEach(() => {
    vi.mocked(reactRouter.useLocation).mockReturnValue(mockLocation);

    mockUseApi.mockReturnValue({
      data: null,
      isError: false,
      isLoading: true,
      errorMessage: null,
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should display loader when page is loading', () => {
    mockUseApi.mockReturnValue({
      data: null,
      isError: false,
      isLoading: true,
      errorMessage: null,
    });

    renderWithProviders(
      <MemoryRouter>
        <LibraryPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('progressbar', { hidden: true })).toBeInTheDocument();
    expect(screen.queryByText('Test Page Title')).not.toBeInTheDocument();
  });

  it('should render page content when successfully loaded', () => {
    mockUseApi.mockReturnValue({
      data: mockPageData,
      isError: false,
      isLoading: false,
      errorMessage: null,
    });

    renderWithProviders(
      <MemoryRouter>
        <LibraryPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('Test Page Title')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('This is test markdown content.')).toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('should render error message when error occurs', () => {
    mockUseApi.mockReturnValue({
      data: null,
      isError: true,
      isLoading: false,
      errorMessage: null,
    });

    renderWithProviders(
      <MemoryRouter>
        <LibraryPage />
      </MemoryRouter>,
    );

    screen.debug();

    expect(screen.queryByRole('alert')).toBeInTheDocument();
    expect(screen.queryByText('Test Page Title')).not.toBeInTheDocument();
    expect(screen.queryByText('Something went wrong...')).toBeInTheDocument();
  });

  it('should call useApi with correct slug from pathname', async () => {
    vi.mocked(useLocation).mockReturnValue({ pathname: '/my-custom-page' } as Location);
    renderWithProviders(
      <MemoryRouter>
        <LibraryPage />
      </MemoryRouter>,
    );
    expect(useApiModule.useApi).toHaveBeenCalledWith(expect.any(Function));
    const fetchFn = mockUseApi.mock.calls[0][0] as () => Promise<PageResponseType>;
    await fetchFn();
    await waitFor(() => {
      expect(apiModule.getPageBySlug).toHaveBeenCalledWith('my-custom-page');
      expect(apiModule.getPageBySlug).toHaveBeenCalledTimes(1);
    });
  });

  it('should handle complex markdown content rendering', () => {
    const complexMarkdownPage: IPageProps = {
      id: '2',
      title: 'Complex Page',
      content:
        '# Heading 1\n\n## Heading 2\n\n- List item 1\n- List item 2\n\n**Bold text** and *italic text*',
      slug: 'complex-page',
    };

    mockUseApi.mockReturnValue({
      data: complexMarkdownPage,
      isError: false,
      isLoading: false,
      errorMessage: null,
    });

    renderWithProviders(
      <MemoryRouter>
        <LibraryPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('Complex Page')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Heading 1',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Heading 2',
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('List item 1')).toBeInTheDocument();
    expect(screen.getByText('List item 2')).toBeInTheDocument();
  });

  describe('Component Snapshots', () => {
    it('should match snapshot when loading', () => {
      mockUseApi.mockReturnValue({
        data: null,
        isError: false,
        isLoading: true,
        errorMessage: null,
      });

      const { asFragment } = renderWithProviders(
        <MemoryRouter>
          <LibraryPage />
        </MemoryRouter>,
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should match snapshot when page is loaded', () => {
      mockUseApi.mockReturnValue({
        data: mockPageData,
        isError: false,
        isLoading: false,
        errorMessage: null,
      });

      const { asFragment } = renderWithProviders(
        <MemoryRouter>
          <LibraryPage />
        </MemoryRouter>,
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should match snapshot when error occurs', () => {
      mockUseApi.mockReturnValue({
        data: null,
        isError: true,
        isLoading: false,
        errorMessage: null,
      });

      const { asFragment } = renderWithProviders(
        <MemoryRouter>
          <LibraryPage />
        </MemoryRouter>,
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('Component Styling and Material-UI Integration', () => {
    it('should apply correct Material-UI components and styles', () => {
      mockUseApi.mockReturnValue({
        data: mockPageData,
        isError: false,
        isLoading: false,
        errorMessage: null,
      });

      const { container } = renderWithProviders(
        <MemoryRouter>
          <LibraryPage />
        </MemoryRouter>,
      );

      const wrapperElement = container.querySelector('[class*="MuiBox"]');
      expect(wrapperElement).toBeInTheDocument();

      const titleElement = screen.getByText('Test Page Title');
      expect(titleElement.closest('[class*="MuiTypography"]')).toBeInTheDocument();
    });

    it('should render ReactMarkdown with proper configuration', () => {
      const markdownWithGfm: IPageProps = {
        id: '3',
        title: 'GFM Test',
        content: '| Column 1 | Column 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |',
        slug: 'gfm-test',
      };

      mockUseApi.mockReturnValue({
        data: markdownWithGfm,
        isError: false,
        isLoading: false,
        errorMessage: null,
      });

      renderWithProviders(
        <MemoryRouter>
          <LibraryPage />
        </MemoryRouter>,
      );

      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getByText('Column 1')).toBeInTheDocument();
      expect(screen.getByText('Cell 1')).toBeInTheDocument();
    });
  });

  describe('Hook Integration Tests', () => {
    it('should handle pathname with leading slash correctly', async () => {
      const locationWithSlash = {
        ...mockLocation,
        pathname: '/about-us',
      };
      vi.mocked(useLocation).mockReturnValue(locationWithSlash);

      renderWithProviders(
        <MemoryRouter>
          <LibraryPage />
        </MemoryRouter>,
      );

      expect(useApiModule.useApi).toHaveBeenCalledWith(expect.any(Function));
      const fetchFn = mockUseApi.mock.calls[0][0] as () => Promise<PageResponseType>;
      await fetchFn();
      await waitFor(() => {
        expect(apiModule.getPageBySlug).toHaveBeenCalledWith('about-us');
        expect(apiModule.getPageBySlug).toHaveBeenCalledTimes(1);
      });
    });

    it('should handle root pathname correctly', async () => {
      const rootLocation = {
        ...mockLocation,
        pathname: '/',
      };
      vi.mocked(useLocation).mockReturnValue(rootLocation);

      renderWithProviders(
        <MemoryRouter>
          <LibraryPage />
        </MemoryRouter>,
      );

      expect(useApiModule.useApi).toHaveBeenCalledWith(expect.any(Function));
      const fetchFn = mockUseApi.mock.calls[0][0] as () => Promise<PageResponseType>;
      await fetchFn();
      await waitFor(() => {
        expect(apiModule.getPageBySlug).toHaveBeenCalledWith('');
        expect(apiModule.getPageBySlug).toHaveBeenCalledTimes(1);
      });
    });
  });
});
