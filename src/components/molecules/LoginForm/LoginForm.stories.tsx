import { Auth0Provider } from '@/lib/providers/MockedAuth0Provider.tsx';
import LoginForm from './LoginForm';

export default {
  title: 'Components/Molecules/LoginForm',
  component: LoginForm,
  decorators: [
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

export const Loading = {
  args: {
    auth0: {
      isAuthenticated: false,
      isLoading: true,
      loginWithRedirect: () => {},
      logout: () => {},
    },
  },
};

export const Authenticated = {
  args: {
    auth0: {
      isAuthenticated: true,
      isLoading: false,
      loginWithRedirect: () => {},
      logout: () => {},
    },
  },
};
