import type { Meta, StoryObj } from '@storybook/react';
import MenuButton from './MenuButton';

const meta: Meta<typeof MenuButton> = {
  title: 'Components/Atoms/MenuButton',
  component: MenuButton,
  argTypes: {
    isClose: {
      control: 'boolean',
    },
    toggleMenu: { action: 'toggleMenu' },
  },
  args: {
    isClose: false,
  },
};
export default meta;

type Story = StoryObj<typeof MenuButton>;

export const Default: Story = {
  args: {
    isClose: false,
  },
};

export const Close: Story = {
  args: {
    isClose: true,
  },
};
