import { screen } from '@testing-library/react';
import BoardHeader from './BoardHeader';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';

describe('BoardHeader', () => {
  it('should render main titles correctly', () => {
    renderWithProviders(<BoardHeader userRole="Admin" />);

    const mainHeading = screen.getByRole('heading', { level: 2, name: 'Admin Panel' });
    expect(mainHeading).toBeInTheDocument();

    const subHeading = screen.getByRole('heading', { level: 3, name: "You're logged in as Admin" });
    expect(subHeading).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { asFragment } = renderWithProviders(<BoardHeader userRole="Moderator" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
