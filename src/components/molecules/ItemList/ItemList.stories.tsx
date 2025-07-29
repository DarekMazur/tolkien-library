import type { Meta, StoryObj } from '@storybook/react';
import ItemList from './ItemList';
import { booksHandler } from '../../../../.storybook/mswHandlers.ts';
import { IBookProps } from '@/lib/types';

const meta: Meta<typeof ItemList> = {
  title: 'Components/Molecules/ItemList',
  component: ItemList,
  parameters: {
    msw: {
      handlers: [booksHandler],
    },
    layout: 'padded',
  },
  argTypes: {
    onClickItem: { action: 'clicked' },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  loaders: [
    async () => {
      const books = await fetch('/api/books').then((res) => res.json());
      return { books };
    },
  ],
  render: (_args, { loaded: { books } }) => {
    return (
      <ItemList<IBookProps> items={books} getPrimaryText={(item: IBookProps) => item.polishTitle} />
    );
  },
};

export const Empty: Story = {
  args: {
    items: [],
    getPrimaryText: (item: string) => item,
    emptyMessage: 'No records found',
  },
  name: 'Empty state',
};

export const LongList: Story = {
  args: {
    items: Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`),
    getPrimaryText: (item: string) => item,
  },
  name: 'Long list (50 items)',
};
