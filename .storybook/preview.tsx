import type { Preview } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import AppProviders from '../src/lib/providers/AppProviders';
import { handlers } from './mswHandlers';
import { MemoryRouter } from 'react-router';

initialize({
  onUnhandledRequest: 'bypass',
});

const preview: Preview = {
  loaders: [mswLoader],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <AppProviders>
          <Story />
        </AppProviders>
      </MemoryRouter>
    ),
  ],
  parameters: {
    msw: {
      handlers: handlers,
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
