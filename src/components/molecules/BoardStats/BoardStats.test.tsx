import { vi } from 'vitest';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import BoardStats from './BoardStats';
import type { IPublisherProps, IUser } from '@/lib/types';
import { faker } from '@faker-js/faker';

vi.mock('@/components/atoms/NewestItem/NewestItem.tsx', () => {
  return {
    default: ({ type, content }: { type: 'user' | 'entry'; content?: IUser | IPublisherProps }) => {
      const text =
        type === 'user'
          ? ((content as IUser)?.userName ?? 'No User')
          : ((content as IPublisherProps)?.title ?? 'No Entry');
      return <div>{text}</div>;
    },
  };
});

describe('BoardStats Component', () => {
  const mockUser: IUser = {
    id: 'user123',
    userName: 'Jane Doe',
    email: 'jane.doe@example.com',
    createdAt: faker.date.past(),
    isBanned: false,
    role: {
      roleName: 'User',
      roleShorthand: 'user',
      id: '3',
      createdAt: faker.date.past(),
    },
    avatar: '',
    emailVerified: true,
  };

  const mockEntry: IPublisherProps = {
    title: 'Rebis',
    id: 'rebis',
    description: '',
    createdAt: faker.date.past(),
  };

  it('renders latest user and entry when props provided', () => {
    const { container, asFragment } = renderWithProviders(
      <BoardStats latestUser={mockUser} latestEntry={mockEntry} />,
    );

    expect(container).toHaveTextContent('Jane Doe');
    expect(container).toHaveTextContent('Rebis');

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders a container element even when no props provided', () => {
    const { container, asFragment } = renderWithProviders(<BoardStats />);

    expect(container.firstChild).toBeTruthy();

    expect(asFragment()).toMatchSnapshot();
  });
});
