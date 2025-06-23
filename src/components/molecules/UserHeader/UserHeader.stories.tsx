import type { Meta, StoryObj } from '@storybook/react';
import UserHeader from './UserHeader';

const meta: Meta<typeof UserHeader> = {
  title: 'Components/Molecules/UserHeader',
  component: UserHeader,
  args: {
    editMode: false,
    setEditMode: () => {},
  },
  argTypes: {
    editMode: { control: 'boolean' },
    setEditMode: { action: 'setEditMode' },
  },
};
export default meta;

type Story = StoryObj<typeof UserHeader>;

export const Default: Story = {
  args: {},
};

export const EditMode: Story = {
  args: {
    editMode: true,
  },
};
