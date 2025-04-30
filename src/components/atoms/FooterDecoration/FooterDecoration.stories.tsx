import type { Meta, StoryObj } from '@storybook/react';
import FooterDecoration from './FooterDecoration';

const meta: Meta<typeof FooterDecoration> = {
  title: 'Components/Atoms/FooterDecoration',
  component: FooterDecoration,
  argTypes: {
    side: {
      control: 'radio',
      options: ['left', 'right', undefined],
    },
  },
  args: {
    side: 'left',
  },
};
export default meta;

type Story = StoryObj<typeof FooterDecoration>;

export const Left: Story = {
  args: {
    side: 'left',
  },
};

export const Right: Story = {
  args: {
    side: 'right',
  },
};

export const DefaultSide: Story = {
  args: {},
};
