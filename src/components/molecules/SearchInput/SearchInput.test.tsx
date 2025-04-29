import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchInput from './SearchInput';
import { renderWithProviders } from '@/lib/providers/renderWithProviders.tsx';

it('renders the component with default provider state', () => {
  renderWithProviders(<SearchInput />);
  expect(screen.getByRole('textbox')).toBeInTheDocument();
});

it('renders the search icon inside the input', () => {
  renderWithProviders(<SearchInput />);
  expect(screen.getByTestId('SearchIcon')).toBeInTheDocument();
});

it('allows user to type into the input field', async () => {
  renderWithProviders(<SearchInput />);
  const input = screen.getByRole('textbox');
  await userEvent.type(input, 'React');
  expect(input).toHaveValue('React');
});

it('applies custom styles to the Box and TextField', () => {
  renderWithProviders(<SearchInput />);
  const box = screen.getByLabelText(/searchbar/i);
  const input = screen.getByLabelText(/szukaj.../i);
  expect(box).toHaveStyle({
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    right: '1rem',
    top: '1rem',
    zIndex: 5,
  });
  expect(input).toHaveClass('MuiOutlinedInput-input');
});

it('matches the snapshot', () => {
  const { asFragment } = renderWithProviders(<SearchInput />);
  expect(asFragment()).toMatchSnapshot();
});
