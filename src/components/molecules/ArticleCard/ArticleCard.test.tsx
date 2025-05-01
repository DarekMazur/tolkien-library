import { screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, it, beforeAll } from 'vitest';

import ArticleCard from './ArticleCard';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import { server } from '@/setupTest';

const mockArticle = {
  id: '1',
  date: new Date('2024-05-01T10:00:00Z'),
  category: 'Tech',
  content: '# Hello World\nThis is **markdown** content.',
};

describe('ArticleCard Component', () => {
  beforeAll(() => {
    server.use(
      http.get(`${import.meta.env.VITE_API_URL}/article/1`, () => HttpResponse.json(mockArticle)),
    );
  });

  it('should render ArticleCard without crashing', () => {
    renderWithProviders(<ArticleCard item={mockArticle} />);
    expect(screen.getByText(/hello world/i)).toBeInTheDocument();
  });

  it('should display article title, date and content', async () => {
    renderWithProviders(<ArticleCard item={mockArticle} />);
    expect(screen.getByText(/hello world/i)).toBeInTheDocument();
    expect(screen.getByText(/tech/i)).toBeInTheDocument();
    expect(screen.getByText(/this is/i)).toBeInTheDocument();
    expect(screen.getByText('1.05.2024')).toBeInTheDocument();
  });

  it('should render category if provided', () => {
    renderWithProviders(<ArticleCard item={mockArticle} />);
    expect(screen.getByText('Tech')).toBeInTheDocument();
  });

  it('should render markdown content correctly', () => {
    renderWithProviders(<ArticleCard item={mockArticle} />);
    expect(screen.getByText('markdown').tagName).toBe('STRONG');
  });

  it('should match snapshot', () => {
    const { container } = renderWithProviders(<ArticleCard item={mockArticle} />);
    expect(container).toMatchSnapshot();
  });

  it('should handle empty content gracefully', () => {
    const emptyArticle = { ...mockArticle, content: '' };
    renderWithProviders(<ArticleCard item={emptyArticle} />);
    expect(screen.queryByText('Hello World')).not.toBeInTheDocument();
  });
});
