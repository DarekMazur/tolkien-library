import type { Meta, StoryObj } from '@storybook/react';
import FanzinPage from './FanzinPage';
import { fanzinHandler } from '../../../../.storybook/mswHandlers.ts';
import { IFanzinProps } from '@/lib/types';

type FanzinPageProps = {
  data: IFanzinProps[];
};

const meta: Meta<FanzinPageProps> = {
  title: 'Pages/FanzinPage',
  component: FanzinPage,
  parameters: {
    msw: {
      handlers: [fanzinHandler],
    },
    layout: 'padded',
    docs: {
      description: {
        component:
          "A page component that displays a catalog of J.R.R. Tolkien' fan magazines in a table format.",
      },
    },
  },
  argTypes: {
    data: {
      description: 'Array of magazines objects to display in the table',
      control: { type: 'object' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FanzinPage>;

export const Default: Story = {
  loaders: [
    async () => {
      const data = await fetch('/api/fanzin').then((res) => res.json());
      return { data };
    },
  ],
  parameters: {
    docs: {
      description: {
        story: 'Default story showing a page of sample fanzines.',
      },
    },
  },
  render: (_args, { loaded: { data } }) => {
    return <FanzinPage data={data} />;
  },
};

export const Empty: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Blank list - for the state without available fanzines.',
      },
    },
  },
  render: () => <FanzinPage data={[]} />,
};
