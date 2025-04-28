import { screen } from '@testing-library/react';
import IconSearch from './IconSearch';
import { renderWithProviders } from '@/lib/providers/renderWithProviders.tsx';

describe('IconSearch', () => {
  it('renders search icon', () => {
    renderWithProviders(<IconSearch />);
    const icon = screen.getByTestId('SearchIcon');
    expect(icon).toBeInTheDocument();
  });

  it('has declared styles', () => {
    renderWithProviders(<IconSearch />);
    const icon = screen.getByTestId('SearchIcon');
    expect(icon).toHaveStyle({
      position: 'absolute',
      left: '0.5rem',
    });
  });

  it('should match snapshot', () => {
    const snapshot = renderWithProviders(<IconSearch />);
    expect(snapshot).toMatchSnapshot();
  });
});
