import type { Meta, StoryObj } from '@storybook/react';
import ContactPage from './ContactPage';
import { http, HttpResponse } from 'msw';
import { identityHandler } from '../../../../.storybook/mswHandlers.ts';

const meta: Meta<typeof ContactPage> = {
  title: 'Pages/ContactPage',
  component: ContactPage,
  parameters: {
    msw: {
      handlers: [identityHandler],
    },
    layout: 'padded',
  },
};
export default meta;

type Story = StoryObj<typeof ContactPage>;

export const Default: Story = {
  render: () => <ContactPage />,
};

export const Loading: Story = {
  parameters: {
    docs: { disable: true },
    msw: {
      handlers: [http.get(`${import.meta.env.VITE_API_URL}/identity`, () => new Promise(() => {}))],
    },
  },
};

export const ErrorState: Story = {
  parameters: {
    docs: { disable: true },
    msw: {
      handlers: [http.get(`${import.meta.env.VITE_API_URL}/identity`, () => HttpResponse.error())],
    },
  },
};
