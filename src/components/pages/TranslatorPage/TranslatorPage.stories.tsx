import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router';
import TranslatorPage from './TranslatorPage';
import { handlers as globalHandlers } from '../../../../.storybook/mswHandlers.ts';
import AppProviders from '@/lib/providers/AppProviders';

const meta: Meta<typeof TranslatorPage> = {
  title: 'Pages/TranslatorPage',
  component: TranslatorPage,
  decorators: [
    (Story, context) => {
      const initialRoute: string = context.parameters.initialRoute ?? '/';
      return (
        <MemoryRouter initialEntries={[initialRoute]}>
          <AppProviders>
            <Routes>
              <Route path="/library/translator/:slug" element={<Story />} />
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

type Story = StoryObj<typeof TranslatorPage>;

export const Default: Story = {
  parameters: {
    initialRoute: '/library/translator/maria-skibniewska',
  },
};

export const NotFound: Story = {
  parameters: {
    docs: { disable: true },
    initialRoute: '/library/translator/non-existent-slug',
    msw: {
      handlers: [http.get('/api/translators/:slug', () => new HttpResponse(null, { status: 404 }))],
    },
  },
};
