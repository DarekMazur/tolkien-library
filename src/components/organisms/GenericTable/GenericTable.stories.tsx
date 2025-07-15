import { Meta, StoryObj } from '@storybook/react';
import { ETableType } from '@/lib/types';
import GenericTable from './GenericTable';
import { booksHandler } from '../../../../.storybook/mswHandlers.ts';

export default {
  title: 'Components/Organisms/GenericTable',
  component: GenericTable,
  parameters: {
    msw: {
      handlers: [booksHandler],
    },
    layout: 'padded',
  },
} as Meta<typeof GenericTable>;

type Story = StoryObj<typeof GenericTable>;

export const Default: Story = {
  args: {
    publicationType: ETableType.BOOK,
    title: 'Lista publikacji',
    subtitle: 'Wybrane publikacje J.R.R. Tolkiena',
  },
  loaders: [
    async () => {
      const books = await fetch('/api/books').then((res) => res.json());
      return { books };
    },
  ],
  render: (args, { loaded: { books } }) => <GenericTable {...args} data={books} />,
};

export const WithoutSubtitle: Story = {
  args: {
    ...Default.args,
    subtitle: undefined,
  },
  loaders: [
    async () => {
      const books = await fetch('/api/books').then((res) => res.json());
      return { books };
    },
  ],
  render: (args, { loaded: { books } }) => <GenericTable {...args} data={books} />,
};

export const EmptyData: Story = {
  args: {
    ...Default.args,
    data: [],
  },
};

export const ManyRows: Story = {
  args: {
    ...Default.args,
  },
  loaders: [
    async () => {
      const books = await fetch('/api/books').then((res) => res.json());
      return { books };
    },
  ],
  render: (args, { loaded: { books } }) => (
    <GenericTable {...args} data={[...books, ...books, ...books]} />
  ),
};
