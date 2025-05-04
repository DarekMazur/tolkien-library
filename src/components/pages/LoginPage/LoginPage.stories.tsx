import type { Meta, StoryObj } from '@storybook/react';
import LoginPage from './LoginPage';

const meta: Meta<typeof LoginPage> = {
  title: 'Components/Pages/LoginPage',
  component: LoginPage,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const Default: StoryObj<typeof LoginPage> = {
  name: 'Default',
  render: () => <LoginPage />,
};
