import { Auth0Provider } from '@/lib/providers/MockedAuth0Provider.tsx';
import LoginForm from './LoginForm';

export default {
  title: 'Components/Molecules/LoginForm',
  component: LoginForm,
  decorators: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    (Story, context) => (
      <Auth0Provider value={context.args.auth0}>
        <Story />
      </Auth0Provider>
    ),
  ],
  argTypes: {
    auth0: { control: 'object' },
  },
};

export const Default = {
  args: {
    auth0: {
      isAuthenticated: true,
      isLoading: false,
      loginWithRedirect: () => {},
      logout: () => {},
    },
  },
};

export const Loading = {
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
