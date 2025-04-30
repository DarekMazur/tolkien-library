import type { Meta, StoryObj } from '@storybook/react';
import IconSearch from './IconSearch';

const meta: Meta<typeof IconSearch> = {
  title: 'Components/Atoms/IconSearch',
  component: IconSearch,
};
export default meta;

type Story = StoryObj<typeof IconSearch>;

export const Default: Story = {
  render: () => <IconSearch />,
};
