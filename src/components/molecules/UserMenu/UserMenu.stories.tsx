import { createMemoryRouter, RouterProvider } from 'react-router';
import { Auth0Provider } from '@/lib/providers/MockedAuth0Provider.tsx';
import UserMenu from './UserMenu';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '@/lib/theme';
import { MockedUseMeProvider } from '@/lib/providers/MockedUseMeProvider.tsx';

export default {
  title: 'Components/Molecules/UserMenu',
  component: UserMenu,
  parameters: {
    noMemoryRouter: true,
  },
  decorators: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    (Story, context) => {
      const user = context.args.auth0?.user ?? {
        email: 'test@example.com',
        nickname: 'tester',
        picture: 'https://randomuser.me/api/portraits/men/1.jpg',
      };

      const router = createMemoryRouter([{ path: '/', element: <Story /> }]);

      const providerValue = {
        user: {
          id: '1',
          avatar: user.picture,
          email: user.email,
          emailVerified: true,
          userName: user.nickname,
          isBanned: false,
          role: { id: '2', roleName: 'user', roleShorthand: 'user' },
        },
        isLoading: context.args.auth0?.isLoading ?? false,
        isAuthenticated: context.args.auth0?.isAuthenticated ?? true,
      };

      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
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
              <RouterProvider router={router} />
            </MockedUseMeProvider>
          </Auth0Provider>
        </ThemeProvider>
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
      user: {
        email: 'frodo@shire.com',
        nickname: 'frodo',
        picture:
          'https://scale.coolshop-cdn.com/product-media.coolshop-cdn.com/23K6JD/4e00b64a4d934f6c9849ceaa382fa35f.jpg/f/lord-of-rings-tubbz-boxed-frodo-baggins.jpg',
      },
      logout: () => {},
      loginWithRedirect: () => {},
    },
  },
};
