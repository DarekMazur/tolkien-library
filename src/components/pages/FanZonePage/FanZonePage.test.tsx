import { screen } from '@testing-library/react';
import FanZonePage from './FanZonePage.tsx';
import { renderWithProviders } from '@/lib/providers/renderWithProviders.tsx';

describe('FanZonePage component', () => {
  it('renders heading and divider correctly', () => {
    renderWithProviders(<FanZonePage />);
    const heading = screen.getByRole('heading', { level: 1, name: 'FanZone' });
    expect(heading).toBeInTheDocument();
    const divider = screen.getByRole('separator');
    expect(divider).toBeInTheDocument();
  });

  it('renders links with correct hrefs and text', () => {
    renderWithProviders(<FanZonePage />);
    const fanzinsLink = screen.getByText('Fanzins').closest('a');
    const fanEditionsLink = screen.getByText("Fan's Editions").closest('a');

    expect(fanzinsLink).toHaveAttribute('href', '/library/fanzin');
    expect(fanEditionsLink).toHaveAttribute('href', '/library/fanedition');

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
  });

  it('matches the snapshot', () => {
    const { container } = renderWithProviders(<FanZonePage />);
    expect(container).toMatchSnapshot();
  });
});
