import type { Meta, StoryObj } from '@storybook/react';
import UnauthorizedView from './UnauthorizedView';

const meta: Meta<typeof UnauthorizedView> = {
  title: 'Pages/UnauthorizedView',
  component: UnauthorizedView,
  parameters: {
    docs: {
      description: {
        component:
          'Displays an unauthorized access message with Tolkien-inspired styling and a return button.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof UnauthorizedView>;

export const Default: Story = {
  render: () => <UnauthorizedView />,
  parameters: {
    docs: {
      description: {
        story: 'Standard unauthorized view with Tolkien quote, icon, and "Go back" button.',
      },
    },
  },
};

export const WithCustomBackground: Story = {
  name: 'With custom background',
  render: () => (
    <div style={{ background: '#222', padding: 32 }}>
      <UnauthorizedView />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'UnauthorizedView displayed on a dark background for contrast testing.',
      },
    },
  },
};

export const LargeFont: Story = {
  name: 'Large font',
  render: () => (
    <div style={{ fontSize: '2.5rem' }}>
      <UnauthorizedView />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'UnauthorizedView with increased font size to check accessibility and style resilience.',
      },
    },
  },
};
