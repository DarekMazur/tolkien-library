import UserProfile from './UserProfile';
import { Auth0Provider } from '@/lib/providers/MockedAuth0Provider.tsx';
import { MockedUseMeProvider } from '@/lib/providers/MockedUseMeProvider.tsx';

export default {
  title: 'Pages/UserProfile',
  component: UserProfile,
  decorators: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    (Story, context) => {
      const user = context.args.auth0?.user ?? {
        email: 'test@example.com',
        nickname: 'tester',
        picture: 'https://randomuser.me/api/portraits/men/1.jpg',
      };

      const providerValue = {
        user: {
          id: '1',
          avatar: user.picture,
          email: user.email,
          emailVerified: true,
          userName: user.nickname,
          isBanned: false,
          role: { id: '2', roleName: 'User', roleShorthand: 'user' },
        },
        isLoading: context.args.auth0?.isLoading ?? false,
        isAuthenticated: context.args.auth0?.isAuthenticated ?? true,
      };

      return (
        <Auth0Provider
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          isAuthenticated={context.args.auth0?.isAuthenticated ?? true}
          isLoading={context.args.auth0?.isLoading ?? false}
          user={user}
          logout={context.args.auth0?.logout ?? (() => {})}
          loginWithRedirect={context.args.auth0?.loginWithRedirect ?? (() => {})}
        >
          <MockedUseMeProvider value={providerValue}>
            <Story />
          </MockedUseMeProvider>
        </Auth0Provider>
      );
    },
  ],
  argTypes: {
    auth0: { control: 'object' },
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
