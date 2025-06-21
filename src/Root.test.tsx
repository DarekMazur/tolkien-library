import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Root from './Root';

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

describe('Root', () => {
  beforeEach(() => {
    (useAuth0 as unknown as vi.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      loginWithRedirect: mockLoginWithRedirect,
      logout: mockLogout,
      user: {
        name: 'Test User',
        email: 'test@example.com',
      },
    });
  });

  it('renders the Home page on the default path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Root />
      </MemoryRouter>,
    );
    expect(screen.getByText(/lorem ipsum/i)).toBeInTheDocument();
  });

  it('renders a Not Found page for a path that does not exist', () => {
    render(
      <MemoryRouter initialEntries={['/incorrect-path']}>
        <Root />
      </MemoryRouter>,
    );
    expect(screen.getByText(/not all those who wander/i)).toBeInTheDocument();
  });

  it('renders the correct layout depending on the path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Root />
      </MemoryRouter>,
    );
    expect(screen.getByText(/biblioteka tolkienisty/i)).toBeInTheDocument();
    expect(screen.getByText(/tolkienarium ©/i)).toBeInTheDocument();
  });

  it('renders a Login Page for /login path for logged users', () => {
    (useAuth0 as unknown as vi.Mock).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      loginWithRedirect: mockLoginWithRedirect,
      logout: mockLogout,
    });

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Root />
      </MemoryRouter>,
    );
    expect(screen.getByText(/You are already login/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Logout/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Go back home/i })).toBeInTheDocument();
  });

  it('renders a Login Page for /login path for not logged users', () => {
    (useAuth0 as unknown as vi.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      loginWithRedirect: mockLoginWithRedirect,
      logout: mockLogout,
    });

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Root />
      </MemoryRouter>,
    );
    expect(screen.queryByText(/You are already login/i)).not.toBeInTheDocument();
    expect(screen.getByRole('progressbar', { hidden: true })).toBeInTheDocument();
  });

  it('matches the snapshot for the default path', () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/']}>
        <Root />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot for NotFound page', () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/incorrect-path']}>
        <Root />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
