import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import PublicationPage from './PublicationPage';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import { EPublicationType, IPublicationProps } from '@/lib/types';

vi.mock('@/components/organisms/GenericTable/GenericTable.tsx', () => ({
  default: vi.fn(({ data, publicationType, title }) => (
    <div data-testid="generic-table">
      <h3>{title}</h3>
      <div>Data count: {data.length}</div>
      <div>Publication type: {publicationType}</div>
    </div>
  )),
}));

describe('PublicationPage', () => {
  const mockPublicationsData: IPublicationProps[] = [
    {
      id: '1',
      title: 'Partial Tolkien Article',
      type: 'partial',
      author: 'Bilbo Baggins',
      publisher: {
        title: 'Rebis',
        description: '',
        id: 'reb',
      },
      year: '2001',
      description: '',
    },
    {
      id: '2',
      title: 'Including Tolkien Content',
      type: 'including',
      author: 'Bilbo Baggins',
      publisher: {
        title: 'Rebis',
        description: '',
        id: 'reb',
      },
      year: '1999',
      description: '',
    },
    {
      id: '3',
      title: 'E-publication Example',
      type: 'epub',
      author: 'Bilbo Baggins',
      publisher: {
        title: 'Rebis',
        description: '',
        id: 'reb',
      },
      year: '2011',
      description: '',
    },
  ];

  it('renders the main heading correctly', () => {
    renderWithProviders(<PublicationPage data={mockPublicationsData} />);

    expect(screen.getByRole('heading', { name: /fragmentarium/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /fragmentarium/i })).toHaveProperty('tagName', 'H3');
  });

  it('renders divider separator', () => {
    renderWithProviders(<PublicationPage data={mockPublicationsData} />);

    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('renders GenericTable for partial publications when data exists', () => {
    const partialData = mockPublicationsData.filter((item) => item.type === 'partial');
    renderWithProviders(<PublicationPage data={partialData} />);

    expect(screen.getByText('Items partly related to Tolkien')).toBeInTheDocument();
    expect(screen.getByText('Data count: 1')).toBeInTheDocument();
    expect(screen.getByText(`Publication type: ${EPublicationType.ARTICLE}`)).toBeInTheDocument();
  });

  it('renders GenericTable for including publications when data exists', () => {
    const includingData = mockPublicationsData.filter((item) => item.type === 'including');
    renderWithProviders(<PublicationPage data={includingData} />);

    expect(
      screen.getByText(
        "Items that contain Tolkien articles or are partially devoted to Tolkien's works",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('Data count: 1')).toBeInTheDocument();
    expect(screen.getByText(`Publication type: ${EPublicationType.ARTICLE}`)).toBeInTheDocument();
  });

  it('renders GenericTable for epub publications when data exists', () => {
    const epubData = mockPublicationsData.filter((item) => item.type === 'epub');
    renderWithProviders(<PublicationPage data={epubData} />);

    expect(screen.getByText('E-publications')).toBeInTheDocument();
    expect(screen.getByText('Data count: 1')).toBeInTheDocument();
    expect(screen.getByText(`Publication type: ${EPublicationType.ARTICLE}`)).toBeInTheDocument();
  });

  it('does not render GenericTable when no partial publications exist', () => {
    const nonPartialData = mockPublicationsData.filter((item) => item.type !== 'partial');
    renderWithProviders(<PublicationPage data={nonPartialData} />);

    expect(screen.queryByText('Items partly related to Tolkien')).not.toBeInTheDocument();
  });

  it('does not render GenericTable when no including publications exist', () => {
    const nonIncludingData = mockPublicationsData.filter((item) => item.type !== 'including');
    renderWithProviders(<PublicationPage data={nonIncludingData} />);

    expect(
      screen.queryByText(
        "Items that contain Tolkien articles or are partially devoted to Tolkien's works",
      ),
    ).not.toBeInTheDocument();
  });

  it('does not render GenericTable when no epub publications exist', () => {
    const nonEpubData = mockPublicationsData.filter((item) => item.type !== 'epub');
    renderWithProviders(<PublicationPage data={nonEpubData} />);

    expect(screen.queryByText('E-publications')).not.toBeInTheDocument();
  });

  it('renders all three GenericTable components when all publication types exist', () => {
    renderWithProviders(<PublicationPage data={mockPublicationsData} />);

    expect(screen.getByText('Items partly related to Tolkien')).toBeInTheDocument();
    expect(
      screen.getByText(
        "Items that contain Tolkien articles or are partially devoted to Tolkien's works",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('E-publications')).toBeInTheDocument();
    expect(screen.getAllByTestId('generic-table')).toHaveLength(3);
  });

  it('renders no GenericTable components when data array is empty', () => {
    renderWithProviders(<PublicationPage data={[]} />);

    expect(screen.queryByText('Items partly related to Tolkien')).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        "Items that contain Tolkien articles or are partially devoted to Tolkien's works",
      ),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('E-publications')).not.toBeInTheDocument();
    expect(screen.queryByTestId('generic-table')).not.toBeInTheDocument();
    expect(screen.queryByText('No publications found')).toBeInTheDocument();
  });

  it('filters data correctly for each publication type', () => {
    const mixedData: IPublicationProps[] = [
      {
        id: '1',
        title: 'Partial 1',
        type: 'partial',
        author: 'Bilbo Baggins',
        publisher: {
          title: 'Rebis',
          description: '',
          id: 'reb',
        },
        year: '2002',
        description: '',
      },
      {
        id: '2',
        title: 'Including 1',
        type: 'including',
        author: 'Bilbo Baggins',
        publisher: {
          title: 'Rebis',
          description: '',
          id: 'reb',
        },
        year: '2002',
        description: '',
      },
      {
        id: '3',
        title: 'Partial 2',
        type: 'partial',
        author: 'Bilbo Baggins',
        publisher: {
          title: 'Rebis',
          description: '',
          id: 'reb',
        },
        year: '1999',
        description: '',
      },
      {
        id: '4',
        title: 'Epub 1',
        type: 'epub',
        author: 'Bilbo Baggins',
        publisher: {
          title: 'Rebis',
          description: '',
          id: 'reb',
        },
        year: '2012',
        description: '',
      },
      {
        id: '5',
        title: 'Including 2',
        type: 'including',
        author: 'Bilbo Baggins',
        publisher: {
          title: 'Rebis',
          description: '',
          id: 'reb',
        },
        year: '2018',
        description: '',
      },
      {
        id: '6',
        title: 'Including 3',
        type: 'including',
        author: 'Bilbo Baggins',
        publisher: {
          title: 'Rebis',
          description: '',
          id: 'reb',
        },
        year: '2019',
        description: '',
      },
    ];

    renderWithProviders(<PublicationPage data={mixedData} />);

    const genericTables = screen.getAllByTestId('generic-table');
    expect(genericTables).toHaveLength(3);

    expect(screen.getByText('Data count: 2')).toBeInTheDocument(); // partial publications
    expect(screen.getByText('Data count: 3')).toBeInTheDocument(); // including publications
    expect(screen.getByText('Data count: 1')).toBeInTheDocument(); // epub publications
  });

  it('matches snapshot', () => {
    const { container } = renderWithProviders(<PublicationPage data={mockPublicationsData} />);
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot with empty data', () => {
    const { container } = renderWithProviders(<PublicationPage data={[]} />);
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot with single publication type', () => {
    const partialOnlyData = mockPublicationsData.filter((item) => item.type === 'partial');
    const { container } = renderWithProviders(<PublicationPage data={partialOnlyData} />);
    expect(container).toMatchSnapshot();
  });
});
