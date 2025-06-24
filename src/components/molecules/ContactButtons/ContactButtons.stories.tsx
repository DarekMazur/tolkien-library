import type { Meta, StoryObj } from '@storybook/react';
import ContactButtons from './ContactButtons';

const meta: Meta<typeof ContactButtons> = {
  title: 'Components/Molecules/ContactButtons',
  component: ContactButtons,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Contact buttons component with email and home navigation options. Features Material-UI styling with Email and Cottage icons.',
      },
    },
  },
  argTypes: {
    email: {
      control: 'text',
      description: 'Email address for the contact button link',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'test@example.com' },
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ContactButtons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    email: 'contact@example.com',
  },
};

export const LongEmail: Story = {
  args: {
    email: 'very.long.email.address@organization.domain.com',
  },
};

export const EmptyEmail: Story = {
  args: {
    email: '',
  },
};

export const PersonalEmail: Story = {
  args: {
    email: 'john.doe@gmail.com',
  },
};

export const BusinessEmail: Story = {
  args: {
    email: 'support@company.business',
  },
};

export const MailtoExample: Story = {
  args: {
    email: 'mailto:hello@example.com',
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing email with mailto: prefix already included',
      },
    },
  },
};
