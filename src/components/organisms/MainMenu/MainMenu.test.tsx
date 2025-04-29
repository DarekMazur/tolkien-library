import { vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import MainMenu from './MainMenu';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import { server } from '@/setupTest';
import '@/setupTest';

const mockNavigationData = [
  { id: 1, title: 'Home', path: '/', isDivider: false },
  { id: 2, title: null, path: null, isDivider: true },
  { id: 3, title: 'About', path: '/about', isDivider: false },
];

describe('MainMenu Component', () => {
  beforeAll(() => {
    server.use(
      http.get(`${import.meta.env.VITE_API_URL}/navigation`, () =>
        HttpResponse.json(mockNavigationData),
      ),
    );
  });

  it('should render menu drawer when open', () => {
    renderWithProviders(<MainMenu isMenuOpen={true} toggleMenu={vi.fn()} />);

    expect(screen.getByRole('presentation')).toBeInTheDocument();
  });

  it('should render navigation items after loading', async () => {
    renderWithProviders(<MainMenu isMenuOpen={true} toggleMenu={vi.fn()} />);

    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(2);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
    });
  });

  it('should match snapshot', async () => {
    const { container } = renderWithProviders(<MainMenu isMenuOpen={true} toggleMenu={vi.fn()} />);

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
