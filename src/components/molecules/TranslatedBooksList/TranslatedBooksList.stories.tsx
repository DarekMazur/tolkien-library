import type { Meta, StoryObj } from '@storybook/react';
import { http } from 'msw';
import TranslatedBooksList from './TranslatedBooksList';
import { booksHandler } from '../../../../.storybook/mswHandlers.ts';

const meta: Meta<typeof TranslatedBooksList> = {
  title: 'Components/Molecules/TranslatedBooksList',
  component: TranslatedBooksList,
  parameters: {
    msw: {
      handlers: [booksHandler],
    },
    layout: 'padded',
  },
};

export default meta;

export const Default: StoryObj<typeof TranslatedBooksList> = {
  loaders: [
    async () => {
      const books = await fetch('/api/books').then((res) => res.json());
      return { books };
    },
  ],
  render: (_args, { loaded: { books } }) => <TranslatedBooksList books={books} />,
};

export const EmptyList: StoryObj<typeof TranslatedBooksList> = {
  name: 'Empty state (no books)',
  args: {
    books: [],
  },
};

const longBooksList = Array.from({ length: 20 }).map((_, idx) => ({
  id: String(idx + 1),
  originalTitle: `Original Title ${idx + 1}`,
  polishTitle: `Tytuł polski ${idx + 1}`,
  author: 'J.R.R. Tolkien',
  translator: {
    firstName: 'Marek',
    lastName: 'Oramus',
    id: 'marekormus',
    description: '',
  },
  publisher: {
    title: 'Rebis',
    id: 'rebis',
    description: '',
  },
  year: 2000 + idx,
  publicationNumber: idx + 1,
  cover: idx % 2 === 0 ? 'Miękka' : 'Twarda',
  series: 'Middle-earth',
  isbn: `97812345678${idx}0`,
}));

export const LongList: StoryObj<typeof TranslatedBooksList> = {
  loaders: [
    async () => {
      const books = await fetch('/api/books').then((res) => res.json());
      return { books };
    },
  ],
  render: (_args, { loaded: { books } }) => (
    <TranslatedBooksList books={[...books, ...longBooksList]} />
  ),
};

export const ApiError: StoryObj<typeof TranslatedBooksList> = {
  name: 'API error (books not loaded)',
  args: {},
  parameters: {
    docs: { disable: true },
    msw: {
      handlers: [http.get('/api/books', () => new Response(null, { status: 500 }))],
    },
  },
  render: () => <TranslatedBooksList books={null} />,
};
