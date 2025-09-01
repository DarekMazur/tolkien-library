import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { List } from '@mui/material';
import ActionItem from './ActionItem';
import { EBoardEnums } from '@/lib/utils/boardEnums';

const meta: Meta<typeof ActionItem> = {
  title: 'Components/Atoms/ActionItem',
  component: ActionItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A component representing a single action item in a list. It displays a list item with an icon and a button that triggers the action when clicked.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    action: {
      control: 'select',
      options: Object.values(EBoardEnums),
      description: 'The enum value of the stock that defines the type of stock',
    },
    onClick: {
      action: 'clicked',
      description:
        'Optional click handling function triggered by an action after clicking an element',
    },
  },
  decorators: [
    (Story) => (
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <Story />
      </List>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const News: Story = {
  args: {
    action: EBoardEnums.NEWS,
    onClick: action('news-clicked'),
  },
};

export const Book: Story = {
  args: {
    action: EBoardEnums.BOOK,
    onClick: action('book-clicked'),
  },
};

export const Publisher: Story = {
  args: {
    action: EBoardEnums.PUBLISHER,
    onClick: action('publisher-clicked'),
  },
};

export const Publication: Story = {
  args: {
    action: EBoardEnums.PUBLICATION,
    onClick: action('publication-clicked'),
  },
};

export const Fanzone: Story = {
  args: {
    action: EBoardEnums.FANZONE,
    onClick: action('fanzone-clicked'),
  },
};

export const Translator: Story = {
  args: {
    action: EBoardEnums.TRANSLATOR,
    onClick: action('translator-clicked'),
  },
};

export const WithoutOnClick: Story = {
  args: {
    action: EBoardEnums.NEWS,
  },
};

export const Interactive: Story = {
  args: {
    action: EBoardEnums.NEWS,
    onClick: (action: EBoardEnums) => {
      console.log(`Action clicked: ${action}`);
      alert(`The action was performed: ${action}`);
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive version of the component - click the button to see the action in the console and alert',
      },
    },
  },
};
