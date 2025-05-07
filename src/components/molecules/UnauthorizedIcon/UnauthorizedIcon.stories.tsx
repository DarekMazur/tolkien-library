import type { Meta, StoryObj } from '@storybook/react';
import { UnauthorizedIcon } from './UnauthorizedIcon';

const meta: Meta<typeof UnauthorizedIcon> = {
  title: 'Molecules/UnauthorizedIcon',
  component: UnauthorizedIcon,
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#222831' },
        { name: 'primary', value: '#1976d2' },
      ],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof UnauthorizedIcon>;

export const Default: Story = {
  name: 'Default',
  render: () => (
    <div
      style={{
        background: '#222831',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
      }}
    >
      <UnauthorizedIcon />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default UnauthorizedIcon with default styles and AnimatedFlames.',
      },
    },
  },
};
