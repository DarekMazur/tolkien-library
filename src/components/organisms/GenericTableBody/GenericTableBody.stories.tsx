import { Meta, StoryObj } from '@storybook/react';
import { booksHandler } from '../../../../.storybook/mswHandlers.ts';
import GenericTableBody from '@/components/organisms/GenericTableBody/GenericTableBody.tsx';
import { IBookProps, ICommonId, IHeaderDefinition, TAllowedPaths, TPathValue } from '@/lib/types';

const meta: Meta<typeof GenericTableBody> = {
  title: 'Components/Organisms/GenericTableBody',
  component: GenericTableBody,
  parameters: {
    msw: {
      handlers: [booksHandler],
    },
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A body component that displays catalog books in a table format.',
      },
    },
  },
  argTypes: {
    data: { control: { type: 'object' } },
    order: { control: { type: 'radio' }, options: ['asc', 'desc'] },
    orderBy: { control: { type: 'object' } },
  },
};

export default meta;
type Story = StoryObj<typeof GenericTableBody>;

const headers: IHeaderDefinition<IBookProps>[] = [
  { key: 'originalTitle', displayTitle: 'Original Title' },
  { key: 'polishTitle', displayTitle: 'Polish Title' },
  { key: 'translator', displayTitle: 'Translator' },
  { key: 'publisher', displayTitle: 'Publisher' },
  { key: 'year', displayTitle: 'Year' },
  { key: 'publicationNumber', displayTitle: 'Pub. no' },
  { key: 'cover', displayTitle: 'Cover' },
  { key: 'series', displayTitle: 'Series' },
  { key: 'isbn', displayTitle: 'ISBN' },
];

const getDisplayValue = <P extends TAllowedPaths<IBookProps>>(
  item: IBookProps,
  key: P,
): TPathValue<IBookProps, P> | null => {
  const value = item[key as keyof typeof item];
  if (key === 'translator' && typeof value === 'object' && value !== null) {
    const translator = value as { firstName?: string; lastName?: string };
    return (
      ([translator.firstName, translator.lastName].filter(Boolean).join(' ') as TPathValue<
        IBookProps,
        P
      >) || null
    );
  }
  if (key === 'publisher' && typeof value === 'object' && value !== null) {
    const publisher = value as { title?: string };
    return (publisher.title as TPathValue<IBookProps, P>) || null;
  }
  return (value as TPathValue<IBookProps, P>) ?? null;
};

export const Default: Story = {
  loaders: [
    async () => {
      const books = await fetch('/api/books').then((res) => res.json());
      return { books };
    },
  ],
  render: (_args, { loaded: { books } }) => (
    <table>
      <GenericTableBody
        data={books}
        order="asc"
        orderBy={'year' as TAllowedPaths<ICommonId>}
        headers={headers}
        getDisplayValue={getDisplayValue}
      />
    </table>
  ),
};

export const AscendingByPolishTitle: Story = {
  loaders: [
    async () => {
      const books = await fetch('/api/books').then((res) => res.json());
      return { books };
    },
  ],
  render: (_args, { loaded: { books } }) => (
    <table>
      <GenericTableBody
        data={books}
        order="asc"
        orderBy={'polishTitle' as TAllowedPaths<ICommonId>}
        headers={headers}
        getDisplayValue={getDisplayValue}
      />
    </table>
  ),
};

export const DescendingByYear: Story = {
  loaders: [
    async () => {
      const books = await fetch('/api/books').then((res) => res.json());
      return { books };
    },
  ],
  render: (_args, { loaded: { books } }) => (
    <table>
      <GenericTableBody
        data={books}
        order="desc"
        orderBy={'year' as TAllowedPaths<ICommonId>}
        headers={headers}
        getDisplayValue={getDisplayValue}
      />
    </table>
  ),
};
