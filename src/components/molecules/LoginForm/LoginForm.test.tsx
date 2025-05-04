import { vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import LoginForm from './LoginForm';
import { renderWithProviders } from '@/lib/providers/renderWithProviders.tsx';

describe('LoginForm Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders all form elements correctly', () => {
    renderWithProviders(<LoginForm />);

    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go back home' })).toBeInTheDocument();
  });

  it('updates username and password fields on user input', () => {
    renderWithProviders(<LoginForm />);

    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'Test123!' },
    });

    expect(screen.getByLabelText('Username')).toHaveValue('testuser');
    expect(screen.getByLabelText('Password')).toHaveValue('Test123!');
  });
});
