import type { Meta, StoryObj } from '@storybook/react';
import ActionsList from './ActionsList';

const meta = {
  title: 'Components/Molecules/ActionsList',
  component: ActionsList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A component that renders a list of actions based on predefined array enumerators. It uses Material-UI Box and List components for layout and maps a constant array of action enums to render individual ActionItem components.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ActionsList>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
