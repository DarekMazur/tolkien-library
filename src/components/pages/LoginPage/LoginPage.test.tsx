import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import LoginPage from '@/components/pages/LoginPage/LoginPage.tsx';
import { renderWithProviders } from '@/lib/providers/renderWithProviders.tsx';

describe('LoginPage Component', () => {
  it('should render the LoginPage component', () => {
    renderWithProviders(<LoginPage />);

    const loginForm = screen.getByRole('form');
    expect(loginForm).toBeInTheDocument();
  });

  it('should display the login form fields', () => {
    renderWithProviders(<LoginPage />);

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('should display the login button', () => {
    renderWithProviders(<LoginPage />);

    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('should match the snapshot', () => {
    const { asFragment } = renderWithProviders(<LoginPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
