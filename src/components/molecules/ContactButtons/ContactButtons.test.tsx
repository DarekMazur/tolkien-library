import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import ContactButtons from './ContactButtons';

describe('ContactButtons', () => {
  const mockEmail = 'test@example.com';

  it('renders both email and home buttons correctly', () => {
    renderWithProviders(<ContactButtons email={mockEmail} />);

    const emailButton = screen.getByRole('button', { name: /send me a message/i });
    expect(emailButton).toBeInTheDocument();

    const homeButton = screen.getByRole('button', { name: /shire/i });
    expect(homeButton).toBeInTheDocument();
  });

  it('displays correct email link in href attribute', () => {
    renderWithProviders(<ContactButtons email={mockEmail} />);

    const emailButton = screen.getByRole('button', { name: /send me a message/i });
    const emailLink = emailButton.closest('a');
    expect(emailLink).toHaveAttribute('href', mockEmail);
  });

  it('renders buttons with proper Material-UI classes', () => {
    renderWithProviders(<ContactButtons email={mockEmail} />);

    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toHaveClass('MuiButton-root');
    });
  });

  it('displays email and cottage icons correctly', () => {
    renderWithProviders(<ContactButtons email={mockEmail} />);

    const emailButton = screen.getByRole('button', { name: /send me a message/i });
    const emailIcon = emailButton.querySelector('svg[data-testid="EmailIcon"]');
    expect(emailIcon).toBeInTheDocument();

    const homeButton = screen.getByRole('button', { name: /shire/i });
    const cottageIcon = homeButton.querySelector('svg[data-testid="CottageIcon"]');
    expect(cottageIcon).toBeInTheDocument();
  });

  it('arranges buttons in a vertical stack layout', () => {
    const { container } = renderWithProviders(<ContactButtons email={mockEmail} />);

    const stackContainer = container.querySelector('.MuiStack-root');
    expect(stackContainer).toBeInTheDocument();
  });

  it('handles empty email prop gracefully', () => {
    renderWithProviders(<ContactButtons email="" />);

    expect(screen.getByRole('button', { name: /send me a message/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /shire/i })).toBeInTheDocument();

    const emailButton = screen.getByRole('button', { name: /send me a message/i });
    const emailLink = emailButton.closest('a');
    expect(emailLink).toHaveAttribute('href', '');
  });

  it('matches snapshot', () => {
    const { asFragment } = renderWithProviders(<ContactButtons email={mockEmail} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot with empty email', () => {
    const { asFragment } = renderWithProviders(<ContactButtons email="" />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('ContactButtons - Accessibility', () => {
  const mockEmail = 'accessible@test.com';

  it('provides proper accessibility attributes', () => {
    renderWithProviders(<ContactButtons email={mockEmail} />);

    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).not.toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('maintains proper focus management', () => {
    renderWithProviders(<ContactButtons email={mockEmail} />);

    const emailButton = screen.getByRole('button', { name: /send me a message/i });
    const homeButton = screen.getByRole('button', { name: /shire/i });

    expect(emailButton).not.toHaveAttribute('disabled');
    expect(homeButton).not.toHaveAttribute('disabled');
  });
});
