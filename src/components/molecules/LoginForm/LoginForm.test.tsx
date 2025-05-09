import { vi } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import LoginForm from '@/components/molecules/LoginForm/LoginForm';

vi.mock('@auth0/auth0-react', async () => {
  const actual = await vi.importActual<typeof import('@auth0/auth0-react')>('@auth0/auth0-react');
  return {
    ...actual,
    Auth0Provider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useAuth0: vi.fn(),
  };
});

import { useAuth0 } from '@auth0/auth0-react';

const mockLoginWithRedirect = vi.fn();
const mockLogout = vi.fn();

describe('LoginForm component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('when loading', () => {
    beforeEach(() => {
      (useAuth0 as unknown as vi.Mock).mockReturnValue({
        isAuthenticated: false,
        isLoading: true,
        loginWithRedirect: mockLoginWithRedirect,
        logout: mockLogout,
      });
    });

    it('should render loading spinner and match snapshot', () => {
      const { container } = renderWithProviders(<LoginForm />);
      expect(screen.getByRole('progressbar', { hidden: true })).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });
  });

  describe('when not authenticated and not loading', () => {
    beforeEach(() => {
      (useAuth0 as unknown as vi.Mock).mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        loginWithRedirect: mockLoginWithRedirect,
        logout: mockLogout,
      });
    });

    it('should call loginWithRedirect on mount', async () => {
      renderWithProviders(<LoginForm />);
      await waitFor(() => {
        expect(mockLoginWithRedirect).toHaveBeenCalled();
      });
    });

    it('should match snapshot for unauthenticated state', () => {
      const { container } = renderWithProviders(<LoginForm />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('when authenticated', () => {
    beforeEach(() => {
      (useAuth0 as unknown as vi.Mock).mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        loginWithRedirect: mockLoginWithRedirect,
        logout: mockLogout,
      });
    });

    it('should display logged in message and logout button', () => {
      renderWithProviders(<LoginForm />);
      expect(screen.getByText(/You are already login/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Logout/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Go back home/i })).toBeInTheDocument();
    });

    it('should call logout when Logout button is clicked', () => {
      renderWithProviders(<LoginForm />);
      const logoutButton = screen.getByRole('button', { name: /Logout/i });
      fireEvent.click(logoutButton);
      expect(mockLogout).toHaveBeenCalled();
    });

    it('should match snapshot for authenticated state', () => {
      const { container } = renderWithProviders(<LoginForm />);
      expect(container).toMatchSnapshot();
    });
  });
});
