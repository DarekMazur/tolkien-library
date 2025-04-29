import { screen } from '@testing-library/react';
import Footer from './Footer';
import { renderWithProviders } from '@/lib/providers/renderWithProviders.tsx';

it('renders Footer component without crashing', () => {
  renderWithProviders(<Footer />);
  const footer = screen.getByLabelText(/footer/i);
  expect(footer).toBeInTheDocument();
});

it('displays FooterDecoration component', () => {
  renderWithProviders(<Footer />);
  const decoration = screen.getAllByTitle(/leaves/i);
  expect(decoration[0]).toBeInTheDocument();
});

it('displays both FooterDecoration components', () => {
  renderWithProviders(<Footer />);
  const decoration = screen.getAllByTitle(/leaves/i);
  expect(decoration.length).toBe(2);
});

it('displays FooterContent component', () => {
  renderWithProviders(<Footer />);
  const content = screen.getByText(/tolkienarium/i);
  expect(content).toBeInTheDocument();
});

it('applies correct styles to the root Box', () => {
  renderWithProviders(<Footer />);
  const footer = screen.getByLabelText(/footer/i);
  expect(footer).toHaveStyle({
    position: 'relative',
    height: '174px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  });
});

it('matches the snapshot', () => {
  const { asFragment } = renderWithProviders(<Footer />);
  expect(asFragment()).toMatchSnapshot();
});
