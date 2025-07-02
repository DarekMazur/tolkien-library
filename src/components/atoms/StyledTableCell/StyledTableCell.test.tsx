import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import StyledTableCell from './StyledTableCell';
import { theme } from '@/lib/theme.tsx';
import { Table, TableBody, TableHead, TableRow } from '@mui/material';

describe('StyledTableCell Component', () => {
  it('renders its children', () => {
    renderWithProviders(
      <Table>
        <TableBody>
          <TableRow>
            <StyledTableCell>Sample Text</StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(screen.getByText('Sample Text')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = renderWithProviders(
      <Table>
        <TableBody>
          <TableRow>
            <StyledTableCell>Snapshot Test</StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('applies head cell styles when head class is applied', () => {
    renderWithProviders(
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Head Cell</StyledTableCell>
          </TableRow>
        </TableHead>
      </Table>,
    );
    const cell = screen.getByText('Head Cell');

    expect(cell).toHaveStyle(`background-color: ${theme.palette.primary.main}`);
    expect(cell).toHaveStyle(`color: ${theme.palette.background.default}`);
  });
});
