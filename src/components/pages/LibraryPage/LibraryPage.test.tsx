import { screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import LibraryPage from './LibraryPage';
import * as reactRouter from 'react-router';
import * as usePageHook from '@/hooks/usePages';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import { IPageProps } from '@/lib/types';
import '@testing-library/jest-dom';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useLocation: vi.fn(),
  };
});

vi.mock('@/hooks/usePages', () => ({
  usePages: vi.fn(),
}));

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
  };

  beforeEach(() => {
    vi.mocked(reactRouter.useLocation).mockReturnValue(mockLocation);

    vi.mocked(usePageHook.usePages).mockReturnValue({
      page: null,
      isError: false,
      isLoading: true,
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should display loader when page is loading', () => {
    vi.mocked(usePageHook.usePages).mockReturnValue({
      page: null,
      isError: false,
      isLoading: true,
    });

    renderWithProviders(<LibraryPage />);

    expect(screen.getByRole('progressbar', { hidden: true })).toBeInTheDocument();
    expect(screen.queryByText('Test Page Title')).not.toBeInTheDocument();
  });

  it('should render page content when successfully loaded', () => {
    vi.mocked(usePageHook.usePages).mockReturnValue({
      page: mockPageData,
      isError: false,
      isLoading: false,
    });

    renderWithProviders(<LibraryPage />);

    expect(screen.getByText('Test Page Title')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('This is test markdown content.')).toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('should render nothing when error occurs', () => {
    vi.mocked(usePageHook.usePages).mockReturnValue({
      page: null,
      isError: true,
      isLoading: false,
    });

    const { container } = renderWithProviders(<LibraryPage />);
    const main = container.querySelector('main');

    expect(main?.childElementCount).toBe(0);
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Page Title')).not.toBeInTheDocument();
  });

  it('should render nothing when page is null but not loading', () => {
    vi.mocked(usePageHook.usePages).mockReturnValue({
      page: null,
      isError: false,
      isLoading: false,
    });

    const { container } = renderWithProviders(<LibraryPage />);
    const main = container.querySelector('main');

    expect(main?.childElementCount).toBe(0);

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('should call usePages with correct slug from pathname', () => {
    const customLocation = {
      ...mockLocation,
      pathname: '/my-custom-page',
    };
    vi.mocked(reactRouter.useLocation).mockReturnValue(customLocation);

    renderWithProviders(<LibraryPage />);

    expect(usePageHook.usePages).toHaveBeenCalledWith('my-custom-page');
  });

  it('should handle complex markdown content rendering', () => {
    const complexMarkdownPage: IPageProps = {
      id: '2',
      title: 'Complex Page',
      content:
        '# Heading 1\n\n## Heading 2\n\n- List item 1\n- List item 2\n\n**Bold text** and *italic text*',
    };

    vi.mocked(usePageHook.usePages).mockReturnValue({
      page: complexMarkdownPage,
      isError: false,
      isLoading: false,
    });

    renderWithProviders(<LibraryPage />);

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
      vi.mocked(usePageHook.usePages).mockReturnValue({
        page: null,
        isError: false,
        isLoading: true,
      });

      const { asFragment } = renderWithProviders(<LibraryPage />);

      expect(asFragment()).toMatchSnapshot();
    });

    it('should match snapshot when page is loaded', () => {
      vi.mocked(usePageHook.usePages).mockReturnValue({
        page: mockPageData,
        isError: false,
        isLoading: false,
      });

      const { asFragment } = renderWithProviders(<LibraryPage />);

      expect(asFragment()).toMatchSnapshot();
    });

    it('should match snapshot when error occurs', () => {
      vi.mocked(usePageHook.usePages).mockReturnValue({
        page: null,
        isError: true,
        isLoading: false,
      });

      const { asFragment } = renderWithProviders(<LibraryPage />);

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('Component Styling and Material-UI Integration', () => {
    it('should apply correct Material-UI components and styles', () => {
      vi.mocked(usePageHook.usePages).mockReturnValue({
        page: mockPageData,
        isError: false,
        isLoading: false,
      });

      const { container } = renderWithProviders(<LibraryPage />);

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
      };

      vi.mocked(usePageHook.usePages).mockReturnValue({
        page: markdownWithGfm,
        isError: false,
        isLoading: false,
      });

      renderWithProviders(<LibraryPage />);

      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getByText('Column 1')).toBeInTheDocument();
      expect(screen.getByText('Cell 1')).toBeInTheDocument();
    });
  });

  describe('Hook Integration Tests', () => {
    it('should handle pathname with leading slash correctly', () => {
      const locationWithSlash = {
        ...mockLocation,
        pathname: '/about-us',
      };
      vi.mocked(reactRouter.useLocation).mockReturnValue(locationWithSlash);

      renderWithProviders(<LibraryPage />);

      expect(usePageHook.usePages).toHaveBeenCalledWith('about-us');
    });

    it('should handle root pathname correctly', () => {
      const rootLocation = {
        ...mockLocation,
        pathname: '/',
      };
      vi.mocked(reactRouter.useLocation).mockReturnValue(rootLocation);

      renderWithProviders(<LibraryPage />);

      expect(usePageHook.usePages).toHaveBeenCalledWith('');
    });
  });
});
