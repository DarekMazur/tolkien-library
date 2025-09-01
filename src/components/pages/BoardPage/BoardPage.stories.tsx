import type { Meta, StoryObj } from '@storybook/react';
import BoardPage from './BoardPage';

const meta: Meta<typeof BoardPage> = {
  title: 'Pages/BoardPage',
  component: BoardPage,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
The main component of the dashboard displaying the board page with user statistics and available actions.

The component supports three main states:
- **Loading**: Shows a loader while data is being fetched
- **Error**: Displays an error component when data fetching fails
- **Success**: Renders the full board interface with header, statistics, and actions

Data is retrieved using the \`useBoardData\` hook, which consolidates information about users, 
latest posts, and the current user.

Translated with DeepL.com (free version)
        `,
      },
    },
  },
  argTypes: {},
} satisfies Meta<typeof BoardPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: `
The default state of the component with successfully loaded data. Displays:
- Table header with user role
- Statistics with the latest user and entry
- List of available actions
        `,
      },
    },
  },
};
