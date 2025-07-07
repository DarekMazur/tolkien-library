import { Meta, StoryObj } from '@storybook/react';
import Table from '@mui/material/Table';
import TableHeader from './TableHeader';
import { TAllowedPaths, TOrder } from '@/lib/types';

const headerTitles: { displayTitle: string; key: TAllowedPaths }[] = [
  { displayTitle: 'Original Title', key: 'originalTitle' },
  { displayTitle: 'Polish Title', key: 'polishTitle' },
  { displayTitle: 'Author', key: 'author' },
  { displayTitle: 'Year', key: 'year' },
  { displayTitle: 'Publisher', key: 'publisher' },
];

const meta: Meta<typeof TableHeader> = {
  title: 'Components/Molecules/TableHeader',
  component: TableHeader,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Renders table headers with sortable labels (MUI TableSortLabel).',
      },
    },
  },
  argTypes: {
    order: {
      control: { type: 'radio' },
      options: ['asc', 'desc'],
      description: 'Sort direction: `asc` or `desc`.',
    },
    orderBy: {
      control: { type: 'text' },
      description: 'Key of the column currently sorted.',
    },
    handleRequestSort: { action: 'sortRequested' },
  },
};

export default meta;

type Story = StoryObj<{
  order: TOrder;
  orderBy: TAllowedPaths;
}>;

const TableWrapper = (args: Story['args']) => (
  <Table>
    <TableHeader
      order={'asc'}
      orderBy={'originalTitle'}
      handleRequestSort={() => {}}
      {...args}
      headerTitles={headerTitles}
    />
  </Table>
);

export const Default: Story = {
  render: TableWrapper,
  name: 'Default (sort asc by year)',
  args: {
    order: 'asc',
    orderBy: 'year',
  },
};

export const SortedByPolishTitleDesc: Story = {
  render: TableWrapper,
  name: 'Sorted by Year (desc by polishTitle)',
  args: {
    order: 'desc',
    orderBy: 'polishTitle',
  },
};
