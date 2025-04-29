import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import FooterDecoration from './FooterDecoration';

describe('FooterDecoration', () => {
  it('should render the Leaves SVG inside a Box', () => {
    renderWithProviders(<FooterDecoration />);
    expect(screen.getByTitle(/leaves/i)).toBeInTheDocument();
  });

  it('should use left positioning and mirrored transform when side is not provided', () => {
    renderWithProviders(<FooterDecoration />);
    const svg = screen.getByTitle(/leaves/i);
    const parent = svg.parentElement;
    expect(parent).toHaveStyle({
      left: '-2.5rem',
      right: 'unset',
      transform: 'scaleX(-1) rotate(30deg)',
    });
  });

  it('should use left positioning and mirrored transform when side is "left"', () => {
    renderWithProviders(<FooterDecoration side="left" />);
    const svg = screen.getByTitle(/leaves/i);
    const parent = svg.parentElement;
    expect(parent).toHaveStyle({
      left: '-2.5rem',
      right: 'unset',
      transform: 'scaleX(-1) rotate(30deg)',
    });
  });

  it('should use right positioning and normal transform when side is "right"', () => {
    renderWithProviders(<FooterDecoration side="right" />);
    const svg = screen.getByTitle(/leaves/i);
    const parent = svg.parentElement;
    expect(parent).toHaveStyle({
      left: 'unset',
      right: '-2.5rem',
      transform: 'rotate(30deg)',
    });
  });

  it('should match the snapshot', () => {
    const { asFragment } = renderWithProviders(<FooterDecoration />);
    expect(asFragment()).toMatchSnapshot();
  });
});
