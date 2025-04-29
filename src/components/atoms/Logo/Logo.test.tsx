import { screen } from '@testing-library/react';
import Logo from './Logo';
import { renderWithProviders } from '@/lib/providers/renderWithProviders.tsx';

describe('<Logo />', () => {
  it('renders without crashing', () => {
    renderWithProviders(<Logo />);
    const svgElement = screen.getByTitle('logo');
    expect(svgElement).toBeInTheDocument();
  });

  it('applies correct styles to the logo container', () => {
    renderWithProviders(<Logo />);
    const svgElement = screen.getByTitle('logo');
    expect(svgElement).toHaveStyle({
      maxHeight: '130px',
      maxWidth: '130px',
    });
  });

  it('matches the snapshot', () => {
    const { container } = renderWithProviders(<Logo />);
    expect(container).toMatchSnapshot();
  });
});
