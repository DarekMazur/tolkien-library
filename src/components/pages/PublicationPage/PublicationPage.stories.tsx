import { Meta, StoryObj } from '@storybook/react';
import PublicationPage from '@/components/pages/PublicationPage/PublicationPage';
import { IPublicationProps } from '@/lib/types';
import { publicationsHandler } from '../../../../.storybook/mswHandlers.ts';

type PublicationPageProps = {
  data: IPublicationProps[];
};

const meta: Meta<PublicationPageProps> = {
  title: 'Pages/PublicationPage',
  component: PublicationPage,
  parameters: {
    msw: {
      handlers: [publicationsHandler],
    },
    layout: 'padded',
    docs: {
      description: {
        component:
          'A page component that displays a catalog of publications about J.R.R. Tolkien in a table format.',
      },
    },
  },
  argTypes: {
    data: {
      description: 'Array of publications objects to display in the table',
      control: { type: 'object' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof PublicationPage>;

export const Default: Story = {
  loaders: [
    async () => {
      const data = await fetch('/api/publications').then((res) => res.json());
      return { data };
    },
  ],
  render: (_args, { loaded: { data } }) => {
    return <PublicationPage data={data} />;
  },
};

export const EmptyList: Story = {
  args: {
    data: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows how the component renders when no books are provided.',
      },
    },
  },
};

export const PartialOnly: Story = {
  loaders: [
    async () => {
      const data = await fetch('/api/publications').then((res) => res.json());
      return { data };
    },
  ],
  render: (_args, { loaded: { data } }) => {
    return (
      <PublicationPage data={data.filter((item: IPublicationProps) => item.type === 'partial')} />
    );
  },
};

export const IncludingOnly: Story = {
  loaders: [
    async () => {
      const data = await fetch('/api/publications').then((res) => res.json());
      return { data };
    },
  ],
  render: (_args, { loaded: { data } }) => {
    return (
      <PublicationPage data={data.filter((item: IPublicationProps) => item.type === 'including')} />
    );
  },
};

export const EpubOnly: Story = {
  loaders: [
    async () => {
      const data = await fetch('/api/publications').then((res) => res.json());
      return { data };
    },
  ],
  render: (_args, { loaded: { data } }) => {
    return (
      <PublicationPage data={data.filter((item: IPublicationProps) => item.type === 'epub')} />
    );
  },
};
