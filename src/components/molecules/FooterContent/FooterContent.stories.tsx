import type { Meta, StoryObj } from '@storybook/react';
import FooterContent from './FooterContent';

const meta: Meta<typeof FooterContent> = {
  title: 'Components/Molecules/FooterContent',
  component: FooterContent,
};
export default meta;

type Story = StoryObj<typeof FooterContent>;

export const Default: Story = {};
