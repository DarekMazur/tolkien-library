import { screen } from '@testing-library/react';
import NoContent from './NoContent';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';

describe('NoContent Component', () => {
  it('renders with default message', () => {
    renderWithProviders(<NoContent />);

    const messageElement = screen.getByText('Nothing found...');
    expect(messageElement).toBeInTheDocument();
  });

  it('renders with custom alert message', () => {
    const customMessage = 'No posts yet';
    renderWithProviders(<NoContent alert={customMessage} />);

    const messageElement = screen.getByText(customMessage);
    expect(messageElement).toBeInTheDocument();
  });

  it('applies correct semantic structure', () => {
    renderWithProviders(<NoContent />);

    const headingElement = screen.getByRole('heading', { level: 3 });
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent('Nothing found...');
  });

  it('applies correct MUI Typography variant', () => {
    renderWithProviders(<NoContent />);

    const messageElement = screen.getByText('Nothing found...');

    expect(messageElement).toHaveClass('MuiTypography-h2');
  });

  it('applies correct flexbox styling for centering', () => {
    renderWithProviders(<NoContent />);

    const messageElement = screen.getByText('Nothing found...');

    expect(messageElement).toHaveStyle({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    });
  });

  it('applies correct Box styling with margin', () => {
    renderWithProviders(<NoContent />);

    const messageElement = screen.getByText('Nothing found...');
    const boxElement = messageElement.closest('div');

    expect(boxElement).toHaveStyle({
      marginTop: '24px', // MUI default for my: 3
      marginBottom: '24px',
    });
  });

  it('handles empty string alert prop', () => {
    renderWithProviders(<NoContent alert="" />);

    const messageElement = screen.getByRole('heading', { level: 3 });
    expect(messageElement).toHaveTextContent('');
  });

  it('handles special characters in alert prop', () => {
    const specialMessage = 'No results found! Try again...';
    renderWithProviders(<NoContent alert={specialMessage} />);

    const messageElement = screen.getByText(specialMessage);
    expect(messageElement).toBeInTheDocument();
  });

  it('matches snapshot with default props', () => {
    const { container } = renderWithProviders(<NoContent />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot with custom alert', () => {
    const { container } = renderWithProviders(<NoContent alert="Custom no content message" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
