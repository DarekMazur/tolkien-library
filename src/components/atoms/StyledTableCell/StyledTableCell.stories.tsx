import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableHead, TableBody, TableRow } from '@mui/material';
import StyledTableCell from './StyledTableCell';

const meta: Meta<typeof StyledTableCell> = {
  title: 'Components/Atoms/StyledTableCell',
  component: StyledTableCell,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Custom MUI TableCell with theme-based styles for head cells.',
      },
    },
  },
  args: {
    children: 'Sample Cell',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content of the cell',
      table: {
        defaultValue: { summary: 'Sample Cell' },
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof StyledTableCell>;

export const HeadCell: Story = {
  args: {
    children: 'Header Cell',
  },
  render: (args) => (
    <Table>
      <TableHead>
        <TableRow>
          <StyledTableCell {...args} />
        </TableRow>
      </TableHead>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Table header cell (`<th>`) with applied styles from the theme.',
      },
    },
  },
};

export const BodyCell: Story = {
  args: {
    children: 'Body Cell',
  },
  render: (args) => (
    <Table>
      <TableBody>
        <TableRow>
          <StyledTableCell {...args} />
        </TableRow>
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Plain table cell (`<td>`), without header styles.',
      },
    },
  },
};
