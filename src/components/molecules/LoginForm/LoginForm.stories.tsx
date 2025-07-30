import { Meta, StoryObj } from '@storybook/react';
import { Auth0Provider } from '@/lib/providers/MockedAuth0Provider.tsx';
import LoginForm from './LoginForm';
import { ComponentProps } from 'react';

type LoginFormProps = ComponentProps<typeof LoginForm>;

type StoryArgs = LoginFormProps & {
  auth0: {
    isAuthenticated: boolean;
    isLoading: boolean;
    loginWithRedirect: () => void;
    logout: () => void;
  };
};

const meta: Meta<StoryArgs> = {
  title: 'Components/Organisms/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'padded',
  },
  args: {
    auth0: {
      isAuthenticated: true,
      isLoading: false,
      loginWithRedirect: () => {},
      logout: () => {},
    },
  },
  argTypes: {
    auth0: { control: 'object' },
  },
  decorators: [
    (Story, context) => (
      <Auth0Provider value={context.args.auth0}>
        <Story />
      </Auth0Provider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {};

export const Loading: Story = {
  parameters: {
    docs: { disable: true },
  },
  args: {
    auth0: {
      isAuthenticated: false,
      isLoading: true,
      loginWithRedirect: () => {},
      logout: () => {},
    },
  },
};
