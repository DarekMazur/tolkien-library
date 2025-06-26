import { vi } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import UserProfile from './UserProfile';

vi.mock('@/hooks/useMe', () => ({
  useMe: vi.fn(),
}));

import { useMe } from '@/hooks/useMe';

describe('UserProfile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loader during loading state', () => {
    (useMe as jest.Mock).mockReturnValue({
      user: null,
      isLoading: true,
      isAuthenticated: false,
    });

    renderWithProviders(<UserProfile />);

    expect(screen.getByLabelText(/loader/i)).toBeInTheDocument();
  });

  it('displays user profile when data is available', () => {
    (useMe as jest.Mock).mockReturnValue({
      user: {
        id: 'abc',
        avatar: 'avatar.png',
        email: 'test@example.com',
        emailVerified: true,
        userName: 'TestUser',
        isBanned: false,
        role: { id: '1', roleName: 'User', roleShorthand: 'user' },
      },
      isLoading: false,
      isAuthenticated: true,
    });

    renderWithProviders(<UserProfile />);

    expect(screen.getByDisplayValue(/TestUser/i)).toBeInTheDocument();
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(document.body).toMatchSnapshot();
  });

  it('renders nothing when not loading and no user exists', () => {
    (useMe as jest.Mock).mockReturnValue({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });

    const { container } = renderWithProviders(<UserProfile />);
    const main = container.querySelector('main');

    expect(main?.childElementCount).toBe(0);
  });

  it('shows success notification after form submit in edit mode', async () => {
    (useMe as jest.Mock).mockReturnValue({
      user: {
        id: 'abc',
        avatar: 'avatar.png',
        email: 'test@example.com',
        emailVerified: true,
        userName: 'TestUser',
        isBanned: false,
        role: { id: '1', roleName: 'User', roleShorthand: 'user' },
      },
      isLoading: false,
      isAuthenticated: true,
    });

    renderWithProviders(<UserProfile />);

    fireEvent.click(screen.getByRole('button', { name: /edit/i }));

    const saveButton = screen.getByRole('button', { name: /save/i });
    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toBeDisabled();

    const input = screen.getByDisplayValue(/TestUser/i);
    fireEvent.change(input, { target: { value: 'New UserName' } });

    expect(saveButton).not.toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: /Save/i }));

    await waitFor(() => {
      expect(screen.getByText(/Profile updated successfully/i)).toBeVisible();
    });
  });
});
