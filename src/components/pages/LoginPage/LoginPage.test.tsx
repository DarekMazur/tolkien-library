import { vi, Mock } from 'vitest';
import LoginPage from '@/components/pages/LoginPage/LoginPage';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import { screen } from '@testing-library/react';

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

describe('LoginPage Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(() => {
    (useAuth0 as unknown as Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      loginWithRedirect: mockLoginWithRedirect,
      logout: mockLogout,
    });
  });

  it('should render correctly and match snapshot', () => {
    const { container } = renderWithProviders(<LoginPage />);

    expect(container).toMatchSnapshot();
  });

  it('should have proper styling including background image', () => {
    const { container } = renderWithProviders(<LoginPage />);

    const pageElement = container.firstChild;

    expect(pageElement).toHaveStyle({
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    });

    expect(pageElement).toHaveStyle({
      background: expect.stringContaining('moria.png'),
    });
  });

  it('should render LoginForm and trigger loginWithRedirect if not authenticated', () => {
    renderWithProviders(<LoginPage />);
    expect(screen.queryByText(/You are already login/i)).not.toBeInTheDocument();
  });

  it('should render logged-in state when authenticated', () => {
    (useAuth0 as unknown as Mock).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      loginWithRedirect: mockLoginWithRedirect,
      logout: mockLogout,
    });

    renderWithProviders(<LoginPage />);
    expect(screen.getByText(/You are already login/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Logout/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Go back home/i })).toBeInTheDocument();
  });
});
