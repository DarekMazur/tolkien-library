import Home from './Home';
import { http, HttpResponse } from 'msw';
import type { Meta, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';

const defaultArticles = [
  {
    id: '1',
    date: new Date('2024-05-01T10:00:00Z'),
    category: 'Tech',
    content: `${faker.lorem.paragraphs(faker.number.int({ min: 1, max: 3 }))}- ${Array.from({ length: 3 }, () => faker.lorem.word()).join('\n- ')}`,
  },
  {
    id: '2',
    date: new Date('2024-04-18T10:00:00Z'),
    category: 'Edu',
    content: `${faker.lorem.paragraphs(faker.number.int({ min: 1, max: 3 }))}1. ${Array.from({ length: 3 }, () => faker.lorem.word()).join('\n1. ')}`,
  },
  {
    id: '3',
    date: new Date('2024-04-12T10:00:00Z'),
    category: null,
    content: `${faker.lorem.paragraphs(faker.number.int({ min: 1, max: 3 }))}\n> ${faker.lorem.sentence()}`,
  },
  {
    id: '4',
    date: new Date('2024-04-09T10:00:00Z'),
    category: 'Edu',
    content: `${faker.lorem.paragraphs(faker.number.int({ min: 1, max: 3 }))}\n| Name    | Value   |
| ------- | ------- |
| A       | 123     |
| B       | 456     |`,
  },
  {
    id: '5',
    date: new Date('2024-04-01T10:00:00Z'),
    category: 'Tech',
    content: `${faker.lorem.paragraphs(faker.number.int({ min: 1, max: 3 }))}\n<div class='info'>${faker.lorem.paragraph()}</div>`,
  },
  {
    id: '6',
    date: new Date('2024-03-28T10:00:00Z'),
    category: 'Edu',
    content: `${faker.lorem.paragraphs(faker.number.int({ min: 1, max: 3 }))}\n<div class='warning'>${faker.lorem.paragraph()}</div>`,
  },
];

const meta: Meta<typeof Home> = {
  title: 'Components/Pages/Home',
  component: Home,
};

export default meta;

type Story = StoryObj<typeof Home>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${import.meta.env.VITE_API_URL}/articles`, () => {
          return HttpResponse.json(defaultArticles);
        }),
      ],
    },
  },
};
