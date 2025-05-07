import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { UnauthorizedIcon } from './UnauthorizedIcon';
import { renderWithProviders } from '@/lib/providers/renderWithProviders.tsx';
import { theme } from '@/lib/theme.tsx';

describe('UnauthorizedIcon component', () => {
  it('renders without crashing', () => {
    renderWithProviders(<UnauthorizedIcon />);
    expect(screen.getByAltText(/you shall not pass/i)).toBeInTheDocument();
  });

  it('renders AnimatedFlames component', () => {
    renderWithProviders(<UnauthorizedIcon />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('applies correct wrapper styles', () => {
    renderWithProviders(<UnauthorizedIcon />);
    const wrapper = screen.getByRole('img').parentElement;
    expect(wrapper).toHaveStyle({
      position: 'relative',
      backgroundColor: theme.palette.primary.main,
    });
  });

  it('applies correct image styles', () => {
    renderWithProviders(<UnauthorizedIcon />);
    const image = screen.getByAltText(/you shall not pass/i);
    expect(image).toHaveStyle({
      zIndex: 5,
      maxWidth: '350px',
      maxHeight: '350px',
      borderRadius: '0.5rem',
    });
  });

  it('matches snapshot', () => {
    const { asFragment } = renderWithProviders(<UnauthorizedIcon />);
    expect(asFragment()).toMatchSnapshot();
  });
});
