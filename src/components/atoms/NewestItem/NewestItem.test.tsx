import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import NewestItem from './NewestItem';
import { useNewestItemData } from '@/hooks/useNewestItemData';
import { IUser } from '@/lib/types';
import { ReactNode } from 'react';

vi.mock('@/hooks/useNewestItemData');

const mockedUseNewestItemData = useNewestItemData as jest.MockedFunction<typeof useNewestItemData>;

const renderWithRouter = (component: ReactNode) => {
  return renderWithProviders(<MemoryRouter>{component}</MemoryRouter>);
};

describe('NewestItem Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render nothing while loading', () => {
    mockedUseNewestItemData.mockReturnValue({
      itemData: { displayText: '', link: '' },
      isLoading: true,
    });

    const { container } = renderWithRouter(<NewestItem type="user" />);

    expect(container.firstChild).toBeNull();
  });

  it('should display newest user with link', () => {
    mockedUseNewestItemData.mockReturnValue({
      itemData: { displayText: 'John Doe', link: '/users/123' },
      isLoading: false,
    });

    const { asFragment } = renderWithRouter(<NewestItem type="user" />);

    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('Newest User');
    const link = screen.getByRole('link', { name: 'John Doe' });
    expect(link).toHaveAttribute('href', '/users/123');

    expect(asFragment()).toMatchSnapshot();
  });

  it('should display newest entry without link', () => {
    mockedUseNewestItemData.mockReturnValue({
      itemData: { displayText: 'Understanding React', link: '' },
      isLoading: false,
    });

    const { asFragment } = renderWithRouter(<NewestItem type="entry" />);

    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('Newest Entry');
    expect(screen.getByText('Understanding React')).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });

  it('should display newest user without link', () => {
    mockedUseNewestItemData.mockReturnValue({
      itemData: { displayText: 'Jane Smith', link: '' },
      isLoading: false,
    });

    const { asFragment } = renderWithRouter(<NewestItem type="user" />);

    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('Newest User');
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.queryByRole('link')).toBeNull();

    expect(asFragment()).toMatchSnapshot();
  });

  it('should call hook with correct parameters', () => {
    const mockContent: IUser = {
      id: '1',
      userName: 'Test',
      role: {
        roleName: 'User',
        roleShorthand: 'user',
        id: '3',
        createdAt: new Date('2025-08-08T21:00:00Z'),
      },
      createdAt: new Date('2025-08-08T21:00:00Z'),
      isBanned: false,
      avatar: '',
      email: 'e@mail.com',
      emailVerified: true,
    };
    mockedUseNewestItemData.mockReturnValue({
      itemData: { displayText: 'Test', link: '' },
      isLoading: false,
    });

    renderWithRouter(<NewestItem type="user" content={mockContent} />);

    expect(mockedUseNewestItemData).toHaveBeenCalledWith('user', mockContent);
  });
});
