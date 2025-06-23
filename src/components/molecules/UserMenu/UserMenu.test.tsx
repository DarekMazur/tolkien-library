import { vi } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import UserMenu from './UserMenu';

const mockLogout = vi.fn();

vi.mock('@auth0/auth0-react', () => ({
  Auth0Provider: ({ children }: { children: React.ReactNode }) => children,
  useAuth0: () => ({
    logout: mockLogout,
    isAuthenticated: true,
    isLoading: false,
    user: {
      email: 'test@example.com',
      nickname: 'tester',
      picture: 'https://example.com/avatar.jpg',
    },
  }),
}));

const mockNavigate = vi.fn();
vi.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock('@/hooks/useMe', () => ({
  useMe: () => ({
    user: {
      id: '1',
      avatar: 'https://example.com/avatar.jpg',
      email: 'test@example.com',
      emailVerified: true,
      userName: 'tester',
      isBanned: false,
      role: { id: '2', roleName: 'User', roleShorthand: 'user' },
    },
    isLoading: false,
    isAuthenticated: true,
  }),
}));

describe('UserMenu Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render user menu button with correct aria-label', () => {
    renderWithProviders(<UserMenu />);
    const speedDial = screen.getByLabelText(/user menu/i);
    expect(speedDial).toBeInTheDocument();
  });

  it('should display user avatar in SpeedDial', () => {
    renderWithProviders(<UserMenu />);
    const avatar = screen.getByRole('img', { hidden: true });
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('should open menu and show actions when SpeedDial is clicked', async () => {
    renderWithProviders(<UserMenu />);
    const speedDial = screen.getByLabelText(/user menu/i);
    fireEvent.mouseEnter(speedDial);

    await waitFor(() => {
      expect(screen.getByLabelText('My profile')).toBeInTheDocument();
      expect(screen.getByLabelText('Logout')).toBeInTheDocument();
    });
  });

  it('should call navigate when "My profile" action is clicked', async () => {
    renderWithProviders(<UserMenu />);
    const speedDial = screen.getByLabelText(/user menu/i);
    fireEvent.mouseEnter(speedDial);

    fireEvent.mouseEnter(screen.getByLabelText('My profile'));

    await waitFor(() => {
      const profileLabel = screen.getByText('My profile');
      expect(profileLabel).toBeInTheDocument();
    });

    const profileAction = screen.getByLabelText('My profile');
    fireEvent.click(profileAction);

    expect(mockNavigate).toHaveBeenCalledWith('/profile');
  });

  it('should call logout when "Logout" action is hover', async () => {
    renderWithProviders(<UserMenu />);
    const speedDial = screen.getByLabelText(/user menu/i);
    fireEvent.mouseEnter(speedDial);

    const logoutAction = screen.getByLabelText('Logout');
    fireEvent.click(logoutAction);

    expect(mockLogout).toHaveBeenCalledWith({
      logoutParams: { returnTo: window.location.origin },
    });
  });

  it('should close menu when mouse leave SpeedDial', async () => {
    renderWithProviders(<UserMenu />);
    const speedDial = screen.getByLabelText(/user menu/i);
    fireEvent.mouseEnter(speedDial);

    await screen.findByLabelText('My profile');
    fireEvent.mouseLeave(speedDial);

    await waitFor(() => {
      expect(screen.queryByLabelText('My profile')).not.toBeVisible();
    });
  });

  it('should match snapshot', () => {
    const { container } = renderWithProviders(<UserMenu />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
