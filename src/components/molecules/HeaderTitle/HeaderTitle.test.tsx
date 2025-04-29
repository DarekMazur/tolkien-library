import { screen } from '@testing-library/react';
import HeaderTitle from './HeaderTitle';
import { renderWithProviders } from '@/lib/providers/renderWithProviders.tsx';

test('renders HeaderTitle component without crashing', () => {
  renderWithProviders(<HeaderTitle />);
});

test('displays the correct title text', () => {
  renderWithProviders(<HeaderTitle />);
  expect(screen.getByText(/biblioteka tolkienisty/i)).toBeInTheDocument();
});

test('renders the Logo component', () => {
  renderWithProviders(<HeaderTitle />);
  expect(screen.getByTitle('logo')).toBeInTheDocument();
});

test('renders Box and Typography components', () => {
  renderWithProviders(<HeaderTitle />);
  expect(screen.getByText(/biblioteka tolkienisty/i).tagName).toBe('H1');
});

test('matches the snapshot', () => {
  const { container } = renderWithProviders(<HeaderTitle />);
  expect(container).toMatchSnapshot();
});
