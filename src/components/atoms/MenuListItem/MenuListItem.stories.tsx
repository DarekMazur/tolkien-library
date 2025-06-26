import type { Meta, StoryObj } from '@storybook/react';
import MenuListItem from './MenuListItem';
import type { IMainMenuList } from '@/lib/types';
import { faker } from '@faker-js/faker';

const meta: Meta<typeof MenuListItem> = {
  title: 'Components/Atoms/MenuListItem',
  component: MenuListItem,
};

export default meta;

type Story = StoryObj<typeof MenuListItem>;

const exampleItems: IMainMenuList[] = [
  { id: faker.string.uuid(), title: 'Strona główna', link: '/', isDivider: false },
  { id: faker.string.uuid(), title: 'Przypięte Artykuły', link: '/articles', isDivider: false },
  { id: faker.string.uuid(), title: 'Kontakt', link: '/contact', isDivider: false },
  { id: faker.string.uuid(), title: 'Link', link: '/default', isDivider: false },
  { id: faker.string.uuid(), title: 'Biblioteka', link: '/library', isDivider: false },
];

export const Default: Story = {
  args: {
    item: exampleItems[3],
  },
};

export const Home: Story = {
  args: {
    item: exampleItems[0],
  },
};

export const AttachedArticles: Story = {
  args: {
    item: exampleItems[1],
  },
};

export const Library: Story = {
  args: {
    item: exampleItems[4],
  },
};

export const Contact: Story = {
  args: {
    item: exampleItems[2],
  },
};
