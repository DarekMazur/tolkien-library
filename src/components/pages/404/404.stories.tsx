import type { Meta, StoryObj } from '@storybook/react';
import PageNotFound from './404';

const meta: Meta<typeof PageNotFound> = {
  title: 'Pages/404',
  component: PageNotFound,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof PageNotFound>;

export const Default: Story = {
  render: () => <PageNotFound />,
};
