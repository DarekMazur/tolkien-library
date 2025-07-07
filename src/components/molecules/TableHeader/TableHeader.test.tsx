import { vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import TableHeader from '@/components/molecules/TableHeader/TableHeader.tsx';
import { renderWithProviders } from '@/lib/providers/renderWithProviders.tsx';
import { TOrder, TAllowedPaths } from '@/lib/types';

describe('TableHeader', () => {
  const headerTitles = [
    { displayTitle: 'Title A', key: 'originalTitle' as TAllowedPaths },
    { displayTitle: 'Title B', key: 'year' as TAllowedPaths },
  ];
  const defaultProps = {
    order: 'asc' as TOrder,
    orderBy: 'originalTitle' as TAllowedPaths,
    handleRequestSort: vi.fn(),
    headerTitles,
  };

  it('should match snapshot when rendered', () => {
    const { asFragment } = renderWithProviders(<TableHeader {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render all header titles', () => {
    renderWithProviders(<TableHeader {...defaultProps} />);
    expect(screen.getByText('Title A')).toBeInTheDocument();
    expect(screen.getByText('Title B')).toBeInTheDocument();
  });

  it('should set active sort label and correct direction', () => {
    // orderBy === 'originalTitle', order === 'asc'
    renderWithProviders(<TableHeader {...defaultProps} />);

    // Znajdujemy <th> z rolą columnheader i tekstem "Title A"
    const headerCell = screen.getByRole('columnheader', { name: 'Title A' });

    // Sprawdzamy, że atrybut aria-sort na <th> to 'ascending'
    expect(headerCell).toHaveAttribute('aria-sort', 'ascending');
  });

  it('should call handleRequestSort with correct key on click', () => {
    renderWithProviders(<TableHeader {...defaultProps} />);
    const labelB = screen.getByText('Title B');
    fireEvent.click(labelB);
    expect(defaultProps.handleRequestSort).toHaveBeenCalledWith('year');
  });

  it('should toggle sort direction when clicking active header', () => {
    const props = {
      ...defaultProps,
      order: 'desc' as TOrder,
      orderBy: 'originalTitle' as TAllowedPaths,
    };
    renderWithProviders(<TableHeader {...props} />);
    const labelA = screen.getByText('Title A');
    fireEvent.click(labelA);
    expect(props.handleRequestSort).toHaveBeenCalledWith('originalTitle');
  });
});
