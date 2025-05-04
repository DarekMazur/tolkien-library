import type { Meta, StoryObj } from '@storybook/react';
import LoginForm from './LoginForm';

const meta: Meta<typeof LoginForm> = {
  title: 'Components/Molecules/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A login form with username and password fields, login button, and go back button.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
  args: {},
};
