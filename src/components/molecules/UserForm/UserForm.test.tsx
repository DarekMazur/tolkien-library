vi.mock('../../../../store', async () => {
  const actual = await vi.importActual('../../../../store');
  return {
    ...actual,
    useUpdateUserMutation: vi.fn(),
  };
});

import { Mock, vi } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import UserForm from './UserForm';
import { IUser } from '@/lib/types';
import { useUpdateUserMutation } from '../../../../store';

describe('UserForm Component', () => {
  const mockUser: IUser = {
    id: '1',
    userName: 'testuser',
    avatar: 'http://example.com/avatar.png',
    isBanned: false,
    role: {
      id: '2',
      roleName: 'User',
      roleShorthand: 'user',
    },
    email: '',
    emailVerified: true,
  };
  const triggerMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useUpdateUserMutation as Mock).mockImplementation(() => [
      triggerMock,
      { isLoading: false, isError: false, error: null },
    ]);
  });

  it('renders in read-only mode', () => {
    renderWithProviders(
      <UserForm
        user={mockUser}
        editMode={false}
        setEditMode={() => {}}
        setNotification={() => {}}
      />,
    );
    expect(screen.getByDisplayValue('testuser')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockUser.avatar);
  });

  it('enables Save on input change and submits data', async () => {
    const setEditMode = vi.fn();
    const setNotification = vi.fn();
    renderWithProviders(
      <UserForm
        user={mockUser}
        editMode={true}
        setEditMode={setEditMode}
        setNotification={setNotification}
      />,
    );

    const userNameInput = screen.getByDisplayValue('testuser');

    fireEvent.change(userNameInput, { target: { value: 'newuser' } });
    expect(screen.getByRole('button', { name: /save changes/i })).toBeEnabled();

    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));
    await waitFor(() => {
      expect(triggerMock).toHaveBeenCalledWith({
        id: '1',
        userName: 'newuser',
        avatar: mockUser.avatar,
      });
      expect(setNotification).toHaveBeenCalledWith({
        open: true,
        message: 'Profile updated successfully.',
        severity: 'success',
      });
      expect(setEditMode).toHaveBeenCalledWith(false);
    });
  });

  it('matches snapshot', () => {
    const { asFragment } = renderWithProviders(
      <UserForm
        user={mockUser}
        editMode={false}
        setEditMode={() => {}}
        setNotification={() => {}}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
