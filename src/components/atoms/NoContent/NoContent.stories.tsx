import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import NoContent from './NoContent';

const meta = {
  title: 'Components/Atoms/NoContent',
  component: NoContent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A component that displays a centered message when no content is available. Commonly used for empty states in lists, tables, or filtered results.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    alert: {
      control: 'text',
      description: 'The message to display when no content is found',
    },
  },
} satisfies Meta<typeof NoContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default NoContent component with the standard "Nothing found..." message.',
      },
    },
  },
};

export const CustomMessage: Story = {
  args: {
    alert: 'No posts available',
  },
  parameters: {
    docs: {
      description: {
        story: 'NoContent component with a custom alert message.',
      },
    },
  },
};

export const EmptyMessage: Story = {
  args: {
    alert: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'NoContent component with an empty string message.',
      },
    },
  },
};

export const LongMessage: Story = {
  args: {
    alert:
      "We couldn't find any results matching your search criteria. Please try adjusting your filters or search terms.",
  },
  parameters: {
    docs: {
      description: {
        story: 'NoContent component with a longer, more descriptive message.',
      },
    },
  },
};

export const SpecialCharacters: Story = {
  args: {
    alert: 'No results found! Try again... 🔍',
  },
  parameters: {
    docs: {
      description: {
        story: 'NoContent component with special characters and emoji.',
      },
    },
  },
};

export const InContainer: Story = {
  args: {
    alert: 'No items to display',
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          width: 600,
          height: 400,
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          p: 2,
          backgroundColor: '#f5f5f5',
        }}
      >
        <Story />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'NoContent component displayed within a container to show how it looks in context.',
      },
    },
  },
};

export const SearchResults: Story = {
  args: {
    alert: 'No search results found',
  },
  parameters: {
    docs: {
      description: {
        story: 'NoContent component for empty search results.',
      },
    },
  },
};

export const BlogPosts: Story = {
  args: {
    alert: 'No blog posts yet',
  },
  parameters: {
    docs: {
      description: {
        story: 'NoContent component for empty blog posts list.',
      },
    },
  },
};

export const UserList: Story = {
  args: {
    alert: 'No users found',
  },
  parameters: {
    docs: {
      description: {
        story: 'NoContent component for empty user list.',
      },
    },
  },
};

export const FilteredResults: Story = {
  args: {
    alert: 'No results match your filters',
  },
  parameters: {
    docs: {
      description: {
        story: 'NoContent component for filtered results that return no items.',
      },
    },
  },
};
