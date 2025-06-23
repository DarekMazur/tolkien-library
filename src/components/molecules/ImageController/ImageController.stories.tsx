import type { Meta, StoryObj } from '@storybook/react';
import ImageController from './ImageController';
import { faker } from '@faker-js/faker';

const defaultImageUrl = faker.image.avatar();
const userImageUrl = faker.image.avatar();
const createMockFile = (name: string, type: string) => {
  const file = new File(['test content'], name, { type });
  return file;
};

const mockFile = createMockFile('test-image.jpg', 'image/jpeg');

const meta: Meta<typeof ImageController> = {
  title: 'Components/Molecules/ImageController',
  component: ImageController,
  args: {
    image: [],
    defaultImageUrl,
    altText: 'User avatar',
    imageUrl: undefined,
    editMode: false,
    onFilesChange: () => {},
  },
  argTypes: {
    image: { control: false },
    onFilesChange: { action: 'onFilesChange' },
    editMode: { control: 'boolean' },
    defaultImageUrl: { control: 'text' },
    imageUrl: { control: 'text' },
    altText: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof ImageController>;

export const Default: Story = {};

export const WithUserAvatar: Story = {
  args: {
    image: [mockFile],
    imageUrl: userImageUrl,
  },
};

export const WithNoAvatar: Story = {
  args: {
    defaultImageUrl: undefined,
  },
};

export const EditMode: Story = {
  args: {
    editMode: true,
  },
};

export const CustomAltText: Story = {
  args: {
    altText: 'Profil użytkownika - Tolkienista',
  },
};
