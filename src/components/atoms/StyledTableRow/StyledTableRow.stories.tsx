import { ReactNode } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import StyledTableRow from './StyledTableRow';

const TableWrapper = ({ children }: { children: ReactNode }) => (
  <table style={{ borderCollapse: 'collapse', width: '100%' }}>
    <tbody>{children}</tbody>
  </table>
);

const meta: Meta<typeof StyledTableRow> = {
  title: 'Components/Atoms/StyledTableRow',
  component: StyledTableRow,
  decorators: [
    (Story) => (
      <TableWrapper>
        <Story />
      </TableWrapper>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof StyledTableRow>;

export const SingleRow: Story = {
  args: {
    children: (
      <>
        <td style={{ padding: '8px' }}>Cell 1</td>
        <td style={{ padding: '8px' }}>Cell 2</td>
        <td style={{ padding: '8px' }}>Cell 3</td>
      </>
    ),
  },
};

export const MultipleRows: Story = {
  render: () => (
    <>
      <StyledTableRow>
        <td style={{ padding: '8px' }}>Row 1 – Cell A</td>
        <td style={{ padding: '8px' }}>Row 1 – Cell B</td>
      </StyledTableRow>
      <StyledTableRow>
        <td style={{ padding: '8px' }}>Row 2 – Cell A</td>
        <td style={{ padding: '8px' }}>Row 2 – Cell B</td>
      </StyledTableRow>
      <StyledTableRow>
        <td style={{ padding: '8px' }}>Row 3 – Cell A</td>
        <td style={{ padding: '8px' }}>Row 3 – Cell B</td>
      </StyledTableRow>
    </>
  ),
};
