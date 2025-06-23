import type { Meta, StoryObj } from '@storybook/react';
import UserForm from './UserForm';
import type { IUser } from '@/lib/types';
import { faker } from '@faker-js/faker';

const mockUser: IUser = {
  id: '1',
  userName: 'aragorn',
  avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  role: {
    id: '2',
    roleName: 'User',
    roleShorthand: 'user',
  },
  email: faker.internet.email(),
  isBanned: false,
  emailVerified: true,
};

const meta: Meta<typeof UserForm> = {
  title: 'Components/Molecules/UserForm',
  component: UserForm,
  argTypes: {
    user: { control: 'object' },
    editMode: { control: 'boolean' },
    setEditMode: { action: 'setEditMode' },
    setNotification: { action: 'setNotification' },
  },
};

export default meta;
type Story = StoryObj<typeof UserForm>;

export const ReadOnly: Story = {
  args: {
    user: mockUser,
    editMode: false,
    setEditMode: () => {},
    setNotification: () => {},
  },
};

export const NotVerified: Story = {
  args: {
    user: { ...mockUser, emailVerified: false },
    editMode: false,
    setEditMode: () => {},
    setNotification: () => {},
  },
};

export const AdminUser: Story = {
  args: {
    user: {
      ...mockUser,
      role: {
        id: '1',
        roleName: 'Administrator',
        roleShorthand: 'admin',
      },
    },
    editMode: false,
    setEditMode: () => {},
    setNotification: () => {},
  },
};

export const EditMode: Story = {
  args: {
    user: mockUser,
    editMode: true,
    setEditMode: () => {},
    setNotification: () => {},
  },
};

export const CustomUser: Story = {
  args: {
    user: {
      id: '2',
      userName: 'galadriel',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      isBanned: false,
      role: {
        id: '2',
        roleName: 'User',
        roleShorthand: 'user',
      },
      email: faker.internet.email(),
      emailVerified: true,
    },
    editMode: false,
    setEditMode: () => {},
    setNotification: () => {},
  },
};
