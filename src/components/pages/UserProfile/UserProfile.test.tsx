import { expect, vi } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import UserProfile from './UserProfile';

vi.mock('@/hooks/useMe', () => ({
  useMe: vi.fn(),
}));

import { useMe } from '@/hooks/useMe';
import { MemoryRouter } from 'react-router';

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

    renderWithProviders(
      <MemoryRouter>
        <UserProfile />
      </MemoryRouter>,
    );

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

    renderWithProviders(
      <MemoryRouter>
        <UserProfile />
      </MemoryRouter>,
    );

    expect(screen.getByDisplayValue(/TestUser/i)).toBeInTheDocument();
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(document.body).toMatchSnapshot();
  });

  it('renders error when not loading and no user exists', () => {
    (useMe as jest.Mock).mockReturnValue({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });

    renderWithProviders(
      <MemoryRouter>
        <UserProfile />
      </MemoryRouter>,
    );

    expect(screen.queryByRole('alert')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong...')).toBeInTheDocument();
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

    renderWithProviders(
      <MemoryRouter>
        <UserProfile />
      </MemoryRouter>,
    );

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
