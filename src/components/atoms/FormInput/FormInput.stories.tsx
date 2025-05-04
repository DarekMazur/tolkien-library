import { Meta, StoryObj } from '@storybook/react';
import FormInput from './FormInput';
import { ComponentProps } from 'react';

const meta: Meta<typeof FormInput> = {
  title: 'Components/Atoms/FormInput',
  component: FormInput,
  argTypes: {
    label: { control: 'text' },
    type: { control: 'text' },
    isRequired: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    id: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof FormInput>;

const Template = (args: ComponentProps<typeof FormInput>) => {
  return <FormInput {...args} onChange={() => {}} />;
};

export const Default: Story = {
  render: (args) => <Template {...args} />,
  args: {
    label: 'First Name',
  },
};

export const EmailInput: Story = {
  render: (args) => <Template {...args} />,
  args: {
    label: 'Email',
    type: 'email',
  },
};

export const Required: Story = {
  render: (args) => <Template {...args} />,
  args: {
    label: 'Username',
    isRequired: true,
  },
};

export const Disabled: Story = {
  render: (args) => <Template {...args} />,
  args: {
    label: 'Disabled field',
    isDisabled: true,
  },
};

export const WithCustomId: Story = {
  render: (args) => <Template {...args} />,
  args: {
    label: 'Custom ID',
    id: 'custom-input-id',
  },
};
