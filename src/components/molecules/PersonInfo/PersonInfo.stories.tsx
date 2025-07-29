import type { Meta, StoryObj } from '@storybook/react';
import PersonInfo from './PersonInfo';

const meta: Meta<typeof PersonInfo> = {
  title: 'Components/Molecules/PersonInfo',
  component: PersonInfo,
  parameters: {
    docs: {
      description: {
        component: 'Displays full name, role and optional description.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof PersonInfo>;

export const Default: Story = {
  args: {
    fullName: 'Aragorn son of Arathorn',
    roleLabel: 'King of Gondor',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows only the full name and role when no description is provided.',
      },
    },
  },
};

export const WithDescription: Story = {
  args: {
    fullName: 'Éowyn of Rohan',
    roleLabel: 'Shieldmaiden',
    description: 'I am no man! I will protect my people and fight for freedom.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Includes a divider and descriptive paragraph when `description` is passed.',
      },
    },
  },
};

export const LongDescription: Story = {
  args: {
    fullName: 'Gandalf the White',
    roleLabel: 'Wizard',
    description:
      'Reborn from Gandalf the Grey, he leads the Fellowship and offers counsel to all free peoples. ' +
      'His wisdom guides the fight against Sauron and helps restore peace to Middle-earth.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Handles multi-sentence descriptions gracefully, wrapping text in a body paragraph.',
      },
    },
  },
};
