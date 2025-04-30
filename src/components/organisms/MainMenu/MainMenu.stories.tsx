import type { Meta, StoryObj } from '@storybook/react';
import MainMenu from './MainMenu';
import { http, HttpResponse } from 'msw';

const defaultNavigation = [
  { id: '1', title: 'Strona główna', link: '/', isDivider: false },
  { id: '2', title: 'Produkty', link: '/products', isDivider: false },
  { id: '3', isDivider: true },
  { id: '4', title: 'O nas', link: '/about', isDivider: false },
  { id: '5', title: 'Kontakt', link: '/contact', isDivider: false },
];

const meta: Meta<typeof MainMenu> = {
  title: 'Components/Organisms/MainMenu',
  component: MainMenu,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isMenuOpen: { control: 'boolean' },
    toggleMenu: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof MainMenu>;

export const Default: Story = {
  args: {
    isMenuOpen: false,
    toggleMenu: () => console.log('Menu toggled'),
  },
  parameters: {
    msw: {
      handlers: [
        http.get(`${import.meta.env.VITE_API_URL}/navigation`, () => {
          return HttpResponse.json(defaultNavigation);
        }),
      ],
    },
  },
};

export const Open: Story = {
  args: {
    isMenuOpen: true,
    toggleMenu: () => console.log('Menu toggled'),
  },
  parameters: {
    msw: {
      handlers: [
        http.get(`${import.meta.env.VITE_API_URL}/navigation`, () => {
          return HttpResponse.json(defaultNavigation);
        }),
      ],
    },
  },
};
