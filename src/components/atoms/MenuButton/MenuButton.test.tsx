import { screen, fireEvent } from '@testing-library/react';
import MenuButton from './MenuButton';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import { vi } from 'vitest';

const mockToggleMenu = vi.fn();

describe('MenuButton', () => {
  it('renders MenuIcon when isClose is false', () => {
    renderWithProviders(<MenuButton toggleMenu={mockToggleMenu} isClose={false} />);
    expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument();
  });

  it('renders MenuIcon when isClose is undefined', () => {
    renderWithProviders(<MenuButton toggleMenu={mockToggleMenu} />);
    expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument();
  });

  it('renders CloseIcon when isClose is true', () => {
    renderWithProviders(<MenuButton toggleMenu={mockToggleMenu} isClose={true} />);
    expect(screen.getByLabelText(/close menu/i)).toBeInTheDocument();
  });

  it('calls toggleMenu when button is clicked', () => {
    const toggleMenuMock = mockToggleMenu;
    renderWithProviders(<MenuButton toggleMenu={toggleMenuMock} />);
    fireEvent.click(screen.getByRole('button', { name: /menu/i }));
    expect(toggleMenuMock).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot', () => {
    const { asFragment } = renderWithProviders(<MenuButton toggleMenu={mockToggleMenu} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
