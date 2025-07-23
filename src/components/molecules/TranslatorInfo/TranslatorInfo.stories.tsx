import type { Meta, StoryObj } from '@storybook/react';
import TranslatorInfo from '@/components/molecules/TranslatorInfo/TranslatorInfo';
import { ITranslatorProps } from '@/lib/types';

const meta: Meta<typeof TranslatorInfo> = {
  title: 'Components/Molecules/TranslatorInfo',
  component: TranslatorInfo,
};

export default meta;
type Story = StoryObj<typeof TranslatorInfo>;

export const Default: Story = {
  args: {
    translator: {
      firstName: 'Jane',
      lastName: 'Doe',
      description:
        'John has translated dozens of novels over 15 years of experience in literary translation.',
    } as ITranslatorProps,
  },
};

export const WithoutDescription: Story = {
  args: {
    translator: {
      firstName: 'John',
      lastName: 'Smith',
    } as ITranslatorProps,
  },
};
