import { Auth0Provider } from '@/lib/providers/MockedAuth0Provider.tsx';
import LoginPage from './LoginPage';

export default {
  title: 'Components/Pages/LoginPage',
  component: LoginPage,
  decorators: [
    (Story, context) => (
      <Auth0Provider value={context.args.auth0}>
        <Story />
      </Auth0Provider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
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
