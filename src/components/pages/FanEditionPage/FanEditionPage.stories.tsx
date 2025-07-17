import type { Meta, StoryObj } from '@storybook/react';
import FanEditionPage from './FanEditionPage';
import { faneditionHandler } from '../../../../.storybook/mswHandlers.ts';
import { IFanEditionsProps } from '@/lib/types';

const meta: Meta<typeof FanEditionPage> = {
  title: 'Pages/FanEditionPage',
  component: FanEditionPage,
  parameters: {
    msw: {
      handlers: [faneditionHandler],
    },
    layout: 'padded',
    docs: {
      description: {
        component:
          'Page component displaying fan editions divided into Mumakil and other publications.',
      },
    },
  },
  argTypes: {
    data: {
      description: 'Array of fan edition items',
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FanEditionPage>;

export const Default: Story = {
  loaders: [
    async () => {
      const data = await fetch('/api/faneditions').then((res) => res.json());
      return { data };
    },
  ],
  parameters: {
    docs: {
      description: {
        story: 'Default view with mixed fan editions data (Mumakil and other publications).',
      },
    },
  },
  render: (_args, { loaded: { data } }) => {
    return <FanEditionPage data={data} />;
  },
};

export const EmptyData: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Page with empty data array - shows how component handles no data.',
      },
    },
  },
  render: () => <FanEditionPage data={[]} />,
};

export const OnlyMumakilEditions: Story = {
  loaders: [
    async () => {
      const data = await fetch('/api/faneditions').then((res) => res.json());
      return { data };
    },
  ],
  parameters: {
    docs: {
      description: {
        story: 'Page showing only Mumakil fan editions with empty "Others" section.',
      },
    },
  },
  render: (_args, { loaded: { data } }) => {
    return <FanEditionPage data={data.filter((item: IFanEditionsProps) => item.isMumakil)} />;
  },
};

export const OnlyOtherEditions: Story = {
  loaders: [
    async () => {
      const data = await fetch('/api/faneditions').then((res) => res.json());
      return { data };
    },
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Page showing only non-Mumakil editions with empty "MumakiL Fandom" section.Page with a large dataset to test performance and table rendering with many items.',
      },
    },
  },
  render: (_args, { loaded: { data } }) => {
    return <FanEditionPage data={data.filter((item: IFanEditionsProps) => !item.isMumakil)} />;
  },
};

export const LargeDataset: Story = {
  loaders: [
    async () => {
      const data = await fetch('/api/faneditions').then((res) => res.json());
      return { data };
    },
  ],
  parameters: {
    docs: {
      description: {
        story: 'Page with a large dataset to test performance and table rendering with many items.',
      },
    },
  },
  render: (_args, { loaded: { data } }) => {
    return (
      <FanEditionPage
        data={[
          ...data,
          ...Array.from({ length: 15 }, (_, index) => ({
            id: `generated-${index}`,
            title: `Fan Edition ${index + 1}`,
            isMumakil: index % 3 === 0,
            year: 2000 + index,
            description: `Generated description for fan edition ${index + 1}`,
          })),
        ]}
      />
    );
  },
};

export const MixedWithMissingDescriptions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Page with items that have missing or empty descriptions.',
      },
    },
  },
  render: () => (
    <FanEditionPage
      data={[
        {
          id: '1',
          title: 'No description Mumakil',
          isMumakil: true,
          year: 2010,
          description: '',
        },
        {
          id: '2',
          title: 'Other with no description',
          year: 2015,
          description: '',
        },
      ]}
    />
  ),
};
