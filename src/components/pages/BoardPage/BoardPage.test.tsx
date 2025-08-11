import { vi } from 'vitest';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import BoardPage from './BoardPage';
import { useBoardData } from '@/hooks/useBoardData';
import { IPublisherProps, IUser } from '@/lib/types';
import { faker } from '@faker-js/faker';
import { MemoryRouter } from 'react-router';

vi.mock('@/hooks/useBoardData');
const mockedUseBoardData = vi.mocked(useBoardData);

describe('BoardPage Component', () => {
  it('renders loading state correctly and matches snapshot', () => {
    mockedUseBoardData.mockReturnValue({
      user: null,
      latestUser: undefined,
      latestEntry: undefined,
      isLoading: true,
      hasError: false,
    });

    const { asFragment, getByLabelText } = renderWithProviders(<BoardPage />);

    expect(getByLabelText('Loader')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders error state correctly and matches snapshot', () => {
    mockedUseBoardData.mockReturnValue({
      user: null,
      latestUser: undefined,
      latestEntry: undefined,
      isLoading: false,
      hasError: true,
    });

    const { asFragment, getByRole, getByText } = renderWithProviders(
      <MemoryRouter>
        <BoardPage />
      </MemoryRouter>,
    );

    expect(getByRole('alert')).toBeInTheDocument();
    expect(getByText('Something went wrong...')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders board content correctly when data is loaded and matches snapshot', () => {
    const fakeUser: IUser = {
      role: { roleName: 'Admin', roleShorthand: '', id: '', createdAt: faker.date.past() },
      id: '',
      createdAt: faker.date.past(),
      isBanned: false,
      avatar: '',
      email: '',
      emailVerified: true,
      userName: 'fakeUser',
    };
    const fakeLatestUser: IUser = {
      userName: 'John Doe',
      id: 'u123',
      createdAt: faker.date.past(),
      isBanned: false,
      role: { roleName: '', roleShorthand: '', id: '', createdAt: faker.date.past() },
      avatar: '',
      email: '',
      emailVerified: true,
    };
    const fakeLatestEntry: IPublisherProps = {
      title: 'Entry Title',
      id: 'e456',
      description: '',
      createdAt: faker.date.past(),
    };

    mockedUseBoardData.mockReturnValue({
      user: fakeUser,
      latestUser: fakeLatestUser,
      latestEntry: fakeLatestEntry,
      isLoading: false,
      hasError: false,
    });

    const { asFragment, getAllByText, getByRole } = renderWithProviders(
      <MemoryRouter>
        <BoardPage />
      </MemoryRouter>,
    );

    const adminHeadings = getAllByText(/admin/i);
    expect(adminHeadings.length).toBeGreaterThan(1);
    expect(getByRole('list')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
