import { Meta, StoryObj } from '@storybook/react';
import Error from './Error';

const meta: Meta<typeof Error> = {
  title: 'Components/Atoms/Error',
  component: Error,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    errorMessage: {
      control: 'text',
      description: 'Error message content',
    },
    errorCode: {
      control: 'text',
      description: 'Error code (HTTP or custom)',
    },
    resetButtonText: {
      control: 'text',
      description: 'Reset/navigation button text',
    },
    onReset: {
      action: 'onReset',
      description: 'Function called when the button is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomProps: Story = {
  args: {
    errorMessage: 'Data not found',
    errorCode: 404,
    resetButtonText: 'Go back',
  },
};

export const NoErrorMessage: Story = {
  args: {
    errorCode: 404,
    resetButtonText: 'Go back',
  },
};

export const NoErrorCode: Story = {
  args: {
    errorMessage: 'Data not found',
    resetButtonText: 'Go back',
  },
};

export const NoButtonText: Story = {
  args: {
    errorMessage: 'Data not found',
    errorCode: 404,
  },
};
