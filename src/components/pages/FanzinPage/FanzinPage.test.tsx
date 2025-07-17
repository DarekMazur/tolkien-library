import { screen } from '@testing-library/react';
import FanzinPage from './FanzinPage';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';

const mockData = [
  {
    id: '1',
    title: 'Fanzin One',
    publisher: {
      id: '1',
      title: 'Publisher 1',
      description: '',
    },
    startDate: new Date('2025-01-01'),
    lastIssueDate: null,
  },
  {
    id: '2',
    title: 'Fanzin Two',
    publisher: {
      id: '1',
      title: 'Publisher 1',
      description: '',
    },
    startDate: new Date('2025-02-01'),
    lastIssueDate: null,
  },
];

describe('FanzinPage', () => {
  it('renders GenericTable with provided data and matches snapshot', () => {
    const { container } = renderWithProviders(<FanzinPage data={mockData} />);

    expect(screen.getByText('Fanzins')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('renders GenericTable with empty array and matches snapshot', () => {
    const { container } = renderWithProviders(<FanzinPage data={[]} />);

    expect(screen.getByText('Fanzins')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
