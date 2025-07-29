import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router';
import PublisherPage from './PublisherPage';
import { handlers as globalHandlers } from '../../../../.storybook/mswHandlers.ts';
import AppProviders from '@/lib/providers/AppProviders';

const meta: Meta<typeof PublisherPage> = {
  title: 'Pages/PublisherPage',
  component: PublisherPage,
  decorators: [
    (Story, context) => {
      const initialRoute: string = context.parameters.initialRoute ?? '/';
      return (
        <MemoryRouter initialEntries={[initialRoute]}>
          <AppProviders>
            <Routes>
              <Route path="/library/publisher/:slug" element={<Story />} />
            </Routes>
          </AppProviders>
        </MemoryRouter>
      );
    },
  ],
  parameters: {
    msw: {
      handlers: globalHandlers,
    },
    noMemoryRouter: true,
  },
};
export default meta;

type Story = StoryObj<typeof PublisherPage>;

export const Default: Story = {
  parameters: {
    initialRoute: '/library/publisher/rebis',
  },
};

export const NotFound: Story = {
  parameters: {
    docs: { disable: true },
    initialRoute: '/library/publisher/non-existent-slug',
    msw: {
      handlers: [http.get('/api/publishers/:slug', () => new HttpResponse(null, { status: 404 }))],
    },
  },
};
