import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse, delay } from 'msw';
import LibraryPage from './LibraryPage';

const defaultPage = (slug: string) => {
  return {
    id: 'default',
    title: 'Default Storybook Page',
    slug,
    content: '# Default Content\n\nThis is the default content.',
  };
};

const meta: Meta<typeof LibraryPage> = {
  title: 'Pages/LibraryPage',
  component: LibraryPage,
  tags: ['!autodocs'],
  decorators: [(Story) => <Story />],
  parameters: {
    msw: {
      handlers: [
        http.get(`${import.meta.env.VITE_API_URL}/pages/:slug`, ({ params }) => {
          const { slug } = params;
          return HttpResponse.json(defaultPage(slug as string), { status: 200 });
        }),
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof LibraryPage>;

export const Default: Story = {};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${import.meta.env.VITE_API_URL}/pages/:slug`, async () => {
          await delay('infinite');
        }),
      ],
    },
  },
};

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${import.meta.env.VITE_API_URL}/pages/:slug`, () => {
          return HttpResponse.json('Page not found', { status: 404 });
        }),
      ],
    },
  },
};
