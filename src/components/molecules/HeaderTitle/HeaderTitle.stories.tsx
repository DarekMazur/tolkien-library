import type { Meta, StoryObj } from '@storybook/react';
import HeaderTitle from './HeaderTitle';

const meta: Meta<typeof HeaderTitle> = {
  title: 'Components/Molecules/HeaderTitle',
  component: HeaderTitle,
};
export default meta;

type Story = StoryObj<typeof HeaderTitle>;

export const Default: Story = {};
