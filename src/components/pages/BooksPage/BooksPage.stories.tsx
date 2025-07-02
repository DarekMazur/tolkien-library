import type { Meta, StoryObj } from '@storybook/react';
import BooksPage from './BooksPage';
import { booksHandler } from '../../../../.storybook/mswHandlers.ts';

const meta: Meta<typeof BooksPage> = {
  title: 'Pages/BooksPage',
  component: BooksPage,
  parameters: {
    msw: {
      handlers: [booksHandler],
    },
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A page component that displays a catalog of J.R.R. Tolkien books in a table format.',
      },
    },
  },
  argTypes: {
    books: {
      description: 'Array of book objects to display in the table',
      control: { type: 'object' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BooksPage>;

export const Default: Story = {
  loaders: [
    async () => {
      const books = await fetch('/api/books').then((res) => res.json());
      return { books };
    },
  ],
  render: (_args, { loaded: { books } }) => {
    return <BooksPage books={books} />;
  },
};

export const EmptyList: Story = {
  args: {
    books: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows how the component renders when no books are provided.',
      },
    },
  },
};

export const SingleBook: Story = {
  loaders: [
    async () => {
      const books = await fetch('/api/books').then((res) => res.json());
      return { books };
    },
  ],
  render: (_args, { loaded: { books } }) => {
    return <BooksPage books={[books[0]]} />;
  },
};
