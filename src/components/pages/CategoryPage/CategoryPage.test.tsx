import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import CategoryPage from './CategoryPage';
import { ICategoryProps } from '@/lib/types';
import { MemoryRouter } from 'react-router';

const mockCategoryWithPages: ICategoryProps = {
  id: '1',
  title: 'React Fundamentals',
  slug: 'react-fundamentals',
  pages: [
    {
      id: 'page-1',
      title: 'Introduction to React',
      slug: 'introduction-to-react',
      content: '',
    },
    {
      id: 'page-2',
      title: 'Components and Props',
      slug: 'components-and-props',
      content: '',
    },
    {
      id: 'page-3',
      title: 'State and Lifecycle',
      slug: 'state-and-lifecycle',
      content: '',
    },
  ],
};

const mockCategoryWithoutPages: ICategoryProps = {
  id: '2',
  title: 'Advanced Topics',
  slug: 'advanced-topics',
  pages: [],
};

const mockCategoryWithUndefinedPages: ICategoryProps = {
  id: '3',
  title: 'TypeScript Guide',
  slug: 'typescript-guide',
};

describe('CategoryPage', () => {
  describe('Rendering', () => {
    it('should render category title correctly', () => {
      renderWithProviders(
        <MemoryRouter>
          <CategoryPage category={mockCategoryWithPages} />
        </MemoryRouter>,
      );

      const titleElement = screen.getByRole('heading', { level: 2 });
      expect(titleElement).toBeInTheDocument();
      expect(titleElement).toHaveTextContent('React Fundamentals');
    });

    it('should render all page links when pages are provided', () => {
      renderWithProviders(
        <MemoryRouter>
          <CategoryPage category={mockCategoryWithPages} />
        </MemoryRouter>,
      );

      const pageLinks = screen.getAllByRole('link');
      expect(pageLinks).toHaveLength(3);

      expect(pageLinks[0]).toHaveTextContent('Introduction to React');
      expect(pageLinks[0]).toHaveAttribute(
        'href',
        '/library/react-fundamentals/introduction-to-react',
      );

      expect(pageLinks[1]).toHaveTextContent('Components and Props');
      expect(pageLinks[1]).toHaveAttribute(
        'href',
        '/library/react-fundamentals/components-and-props',
      );

      expect(pageLinks[2]).toHaveTextContent('State and Lifecycle');
      expect(pageLinks[2]).toHaveAttribute(
        'href',
        '/library/react-fundamentals/state-and-lifecycle',
      );
    });

    it('should render only title when pages array is empty', () => {
      renderWithProviders(
        <MemoryRouter>
          <CategoryPage category={mockCategoryWithoutPages} />
        </MemoryRouter>,
      );

      const titleElement = screen.getByRole('heading', { level: 2 });
      expect(titleElement).toBeInTheDocument();
      expect(titleElement).toHaveTextContent('Advanced Topics');

      const pageLinks = screen.queryAllByRole('link');
      expect(pageLinks).toHaveLength(0);
    });

    it('should render only title when pages is undefined', () => {
      renderWithProviders(
        <MemoryRouter>
          <CategoryPage category={mockCategoryWithUndefinedPages} />
        </MemoryRouter>,
      );

      const titleElement = screen.getByRole('heading', { level: 2 });
      expect(titleElement).toBeInTheDocument();
      expect(titleElement).toHaveTextContent('TypeScript Guide');

      const pageLinks = screen.queryAllByRole('link');
      expect(pageLinks).toHaveLength(0);
    });
  });

  describe('Material-UI Integration', () => {
    it('should render Typography components with correct variants', () => {
      const { container } = renderWithProviders(
        <MemoryRouter>
          <CategoryPage category={mockCategoryWithPages} />
        </MemoryRouter>,
      );

      const titleTypography = container.querySelector('.MuiTypography-h2');
      expect(titleTypography).toBeInTheDocument();
      expect(titleTypography).toHaveTextContent('React Fundamentals');

      const pageTypographies = container.querySelectorAll('.MuiTypography-root');
      expect(pageTypographies).toHaveLength(7);
    });
  });

  describe('Link Generation', () => {
    it('should generate correct URLs for page links', () => {
      renderWithProviders(
        <MemoryRouter>
          <CategoryPage category={mockCategoryWithPages} />
        </MemoryRouter>,
      );

      const expectedUrls = [
        '/library/react-fundamentals/introduction-to-react',
        '/library/react-fundamentals/components-and-props',
        '/library/react-fundamentals/state-and-lifecycle',
      ];

      const pageLinks = screen.getAllByRole('link');
      pageLinks.forEach((link, index) => {
        expect(link).toHaveAttribute('href', expectedUrls[index]);
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading structure', () => {
      renderWithProviders(
        <MemoryRouter>
          <CategoryPage category={mockCategoryWithPages} />
        </MemoryRouter>,
      );

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveAccessibleName('React Fundamentals');
    });

    it('should have accessible links with proper text content', () => {
      const category = mockCategoryWithPages;

      renderWithProviders(
        <MemoryRouter>
          <CategoryPage category={category} />
        </MemoryRouter>,
      );

      const links = screen.getAllByRole('link');
      links.forEach((link, index) => {
        expect(link).toHaveAccessibleName(category.pages![index].title);
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle category with special characters in title', () => {
      const categoryWithSpecialChars: ICategoryProps = {
        id: '4',
        title: 'React & TypeScript: Advanced Patterns',
        slug: 'react-typescript-patterns',
        pages: [],
      };

      renderWithProviders(
        <MemoryRouter>
          <CategoryPage category={categoryWithSpecialChars} />
        </MemoryRouter>,
      );

      const titleElement = screen.getByRole('heading', { level: 2 });
      expect(titleElement).toHaveTextContent('React & TypeScript: Advanced Patterns');
    });

    it('should handle page titles with special characters', () => {
      const categoryWithSpecialPageTitles: ICategoryProps = {
        id: '5',
        title: 'Special Characters',
        slug: 'special-chars',
        pages: [
          {
            id: 'page-special',
            title: 'Hooks & Context: Best Practices',
            slug: 'hooks-context-best-practices',
            content: '',
          },
        ],
      };

      renderWithProviders(
        <MemoryRouter>
          <CategoryPage category={categoryWithSpecialPageTitles} />
        </MemoryRouter>,
      );

      const pageLink = screen.getByRole('link');
      expect(pageLink).toHaveTextContent('Hooks & Context: Best Practices');
    });
  });

  describe('Snapshot Testing', () => {
    it('should match snapshot with pages', () => {
      const { container } = renderWithProviders(
        <MemoryRouter>
          <CategoryPage category={mockCategoryWithPages} />
        </MemoryRouter>,
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot without pages', () => {
      const { container } = renderWithProviders(
        <MemoryRouter>
          <CategoryPage category={mockCategoryWithoutPages} />
        </MemoryRouter>,
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot with undefined pages', () => {
      const { container } = renderWithProviders(
        <MemoryRouter>
          <CategoryPage category={mockCategoryWithUndefinedPages} />
        </MemoryRouter>,
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
