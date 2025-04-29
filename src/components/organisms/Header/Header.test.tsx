import { vi } from 'vitest';

import Header from '@/components/organisms/Header/Header';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';

const mockToggleMenu = vi.fn();

describe('Header', () => {
  const renderComponent = () => {
    return renderWithProviders(<Header toggleMenu={mockToggleMenu} />);
  };

  it('renders header title', () => {
    renderComponent();
    expect(screen.getByText(/biblioteka tolkienisty/i)).toBeInTheDocument();
  });

  it('renders menu button', () => {
    renderComponent();
    expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument();
  });

  it('calls toggleMenu on click', async () => {
    renderComponent();
    const menuButton = screen.getByRole('button', { name: /menu/i });
    menuButton.click();
    expect(mockToggleMenu).toHaveBeenCalled();
  });

  it('renders search field', () => {
    renderComponent();
    expect(screen.getByLabelText(/szukaj/i)).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const snapshot = renderWithProviders(<Header toggleMenu={mockToggleMenu} />);
    expect(snapshot).toMatchSnapshot();
  });
});
