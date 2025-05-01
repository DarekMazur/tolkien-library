import type { Meta, StoryObj } from '@storybook/react';
import ArticleCard from './ArticleCard';

const meta: Meta<typeof ArticleCard> = {
  title: 'Components/Molecules/ArticleCard',
  component: ArticleCard,
  tags: ['autodocs'],
  argTypes: {
    item: {
      control: 'object',
      description: 'Article object containing id, date, category and content (markdown)',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ArticleCard>;

export const Default: Story = {
  args: {
    item: {
      id: '1',
      date: new Date('2024-05-01T12:00:00'),
      category: 'News',
      content: `
This is **example** article with _markdown_.

- Enumeration list
- second item

> Blockquote

[Google link](https://google.com)
      `,
    },
  },
};

export const WithoutCategory: Story = {
  args: {
    item: {
      id: '2',
      date: new Date('2024-04-15T10:30:00'),
      content: `
## Article without category

Content with no category.  
You can use code: \`const x = 42\`
      `,
    },
  },
};

export const WithTable: Story = {
  args: {
    item: {
      id: '3',
      date: new Date('2023-12-24T18:00:00'),
      category: 'Testy',
      content: `
### Table example

| Name    | Value   |
| ------- | ------- |
| A       | 123     |
| B       | 456     |
      `,
    },
  },
};
