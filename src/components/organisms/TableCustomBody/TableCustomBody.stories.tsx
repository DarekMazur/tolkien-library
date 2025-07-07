import { Meta, StoryObj } from '@storybook/react';
import TableCustomBody from './TableCustomBody';
import { booksHandler } from '../../../../.storybook/mswHandlers.ts';

const meta: Meta<typeof TableCustomBody> = {
  title: 'Components/Organisms/TableCustomBody',
  component: TableCustomBody,
  parameters: {
    msw: {
      handlers: [booksHandler],
    },
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A body component that displays a catalog books in a table format.',
      },
    },
  },
  argTypes: {
    books: {
      description: 'Array of book objects to display in the table',
      control: { type: 'object' },
    },
    order: {
      description: 'Sorting parameter',
    },
    orderBy: {
      description: 'The parameter by which the table is sorted',
      control: { type: 'object' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TableCustomBody>;

export const Default: Story = {
  loaders: [
    async () => {
      const books = await fetch('/api/books').then((res) => res.json());
      return { books };
    },
  ],
  render: (_args, { loaded: { books } }) => {
    return <TableCustomBody books={books} order={'asc'} orderBy={'year'} />;
  },
};

export const AscendingByPolishTitle: Story = {
  loaders: [
    async () => {
      const books = await fetch('/api/books').then((res) => res.json());
      return { books };
    },
  ],
  render: (_args, { loaded: { books } }) => {
    return <TableCustomBody books={books} order={'asc'} orderBy={'polishTitle'} />;
  },
};

export const DescendingByYear: Story = {
  loaders: [
    async () => {
      const books = await fetch('/api/books').then((res) => res.json());
      return { books };
    },
  ],
  render: (_args, { loaded: { books } }) => {
    return <TableCustomBody books={books} order={'desc'} orderBy={'year'} />;
  },
};
