import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import FooterContent from './FooterContent';

describe('FooterContent', () => {
  it('renders copyright text with the current year', () => {
    renderWithProviders(<FooterContent />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`Tolkienarium © ${currentYear}`)).toBeInTheDocument();
  });

  it('renders developer credit text', () => {
    renderWithProviders(<FooterContent />);
    expect(screen.getByText(/Proudly created by/i)).toBeInTheDocument();
    expect(screen.getByText(/Nerdistry/i)).toBeInTheDocument();
  });

  it('renders developer link with correct href', () => {
    renderWithProviders(<FooterContent />);
    const link = screen.getByRole('link', { name: /Nerdistry/i });
    expect(link).toHaveAttribute('href', 'https://nerdistry.pl');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('matches snapshot', () => {
    const { container } = renderWithProviders(<FooterContent />);
    expect(container).toMatchSnapshot();
  });
});
