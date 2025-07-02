import { ReactNode } from 'react';
import { screen } from '@testing-library/react';
import StyledTableRow from './StyledTableRow';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import { theme } from '@/lib/theme';

const TableWrapper = ({ children }: { children: ReactNode }) => (
  <table>
    <tbody>{children}</tbody>
  </table>
);

describe('StyledTableRow', () => {
  it('renders children correctly', () => {
    renderWithProviders(
      <TableWrapper>
        <StyledTableRow>
          <td>First cell</td>
          <td>Second cell</td>
        </StyledTableRow>
      </TableWrapper>,
    );

    const row = screen.getByRole('row');
    expect(row).toBeInTheDocument();
    expect(screen.getByText('First cell')).toBeInTheDocument();
    expect(screen.getByText('Second cell')).toBeInTheDocument();
  });

  it('matches snapshot including styles', () => {
    const { container } = renderWithProviders(
      <TableWrapper>
        <StyledTableRow>
          <td>Snapshot cell</td>
        </StyledTableRow>
      </TableWrapper>,
    );
    expect(container).toMatchSnapshot();
  });

  it('applies odd-row background color for nth-of-type(odd)', () => {
    renderWithProviders(
      <TableWrapper>
        <StyledTableRow>
          <td>Row 1</td>
        </StyledTableRow>
        <StyledTableRow>
          <td>Row 2</td>
        </StyledTableRow>
      </TableWrapper>,
    );

    const rows = screen.getAllByRole('row');
    expect(rows[0]).toHaveStyle({
      backgroundColor: theme.palette.action.hover,
    });
    expect(rows[1]).not.toHaveStyle({
      backgroundColor: theme.palette.action.hover,
    });
  });

  it('removes bottom border on last-child', () => {
    renderWithProviders(
      <TableWrapper>
        <StyledTableRow>
          <td>Not last</td>
        </StyledTableRow>
        <StyledTableRow>
          <td>Last cell</td>
        </StyledTableRow>
      </TableWrapper>,
    );

    const rows = screen.getAllByRole('row');
    const lastRowCells = rows[rows.length - 1].querySelectorAll('td, th');
    lastRowCells.forEach((cell) => {
      expect(cell).toHaveStyle({ border: '0px solid' });
    });
  });
});
