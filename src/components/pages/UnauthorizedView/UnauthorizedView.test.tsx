import { screen } from '@testing-library/react';
import UnauthorizedView from '@/components/pages/UnauthorizedView/UnauthorizedView';
import { renderWithProviders } from '@/lib/providers/renderWithProviders.tsx';

describe('UnauthorizedView', () => {
  it('should display Tolkien quote in title', () => {
    renderWithProviders(<UnauthorizedView />);

    const title = screen.getByText(/The dark fire will not avail you, Flame of Udûn!/i);
    expect(title).toBeInTheDocument();
  });

  it('should render return button with correct link and styles', () => {
    renderWithProviders(<UnauthorizedView />);

    const button = screen.getByRole('button', {
      name: /Go back/i,
    });
    const link = button.closest('a');

    expect(link).toHaveAttribute('href', '/');
  });

  it('should match snapshot', () => {
    const { container } = renderWithProviders(<UnauthorizedView />);
    expect(container).toMatchSnapshot();
  });
});
