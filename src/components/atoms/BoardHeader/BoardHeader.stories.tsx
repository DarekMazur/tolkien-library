import type { Meta, StoryObj } from '@storybook/react';
import BoardHeader from './BoardHeader';

const meta: Meta<typeof BoardHeader> = {
  title: 'Components/Atoms/BoardHeader',
  component: BoardHeader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    userRole: {
      control: 'text',
      description: 'Role of the currently logged-in user',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userRole: 'Administrator',
  },
};

export const Moderator: Story = {
  args: {
    userRole: 'Moderator',
  },
};

export const User: Story = {
  args: {
    userRole: 'User',
  },
};

export const EmptyRole: Story = {
  args: {
    userRole: '',
  },
};
