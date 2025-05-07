import type { Meta, StoryObj } from '@storybook/react';
import AnimatedFlames from './AnimatedFlames';

const meta: Meta<typeof AnimatedFlames> = {
  title: 'Components/Atoms/AnimatedFlames',
  component: AnimatedFlames,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'AnimatedFlames displays animated SVG flames with CSS-in-JS effects.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof AnimatedFlames>;

export const Default: Story = {
  render: () => <AnimatedFlames />,
  parameters: {
    docs: {
      storyDescription: 'Default animated flames as used in the application.',
    },
  },
};
