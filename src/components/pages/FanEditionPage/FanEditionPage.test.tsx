import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import FanEditionPage from './FanEditionPage';
import { IFanEditionsProps, ETableType } from '@/lib/types';

interface MockGenericTableProps {
  data: IFanEditionsProps[];
  publicationType: ETableType;
  title: string;
  headerVariant: string;
}

vi.mock('@/components/organisms/GenericTable/GenericTable.tsx', () => ({
  default: ({ data, publicationType, title, headerVariant }: MockGenericTableProps) => (
    <div data-testid="generic-table">
      <h3>{title}</h3>
      <div>Publication Type: {publicationType}</div>
      <div>Header Variant: {headerVariant}</div>
      <div>Data Count: {data.length}</div>
    </div>
  ),
}));

describe('FanEditionPage', () => {
  const mockDataWithMumakil: IFanEditionsProps[] = [
    {
      id: '1',
      title: 'Mumakil Edition 1',
      isMumakil: true,
      year: 2023,
      description: 'Lorem ipsum',
    },
    {
      id: '2',
      title: 'Mumakil Edition 2',
      isMumakil: true,
      year: 2024,
    },
  ];

  const mockDataWithoutMumakil: IFanEditionsProps[] = [
    {
      id: '3',
      title: 'Other Edition 1',
      isMumakil: false,
      year: 2022,
    },
    {
      id: '4',
      title: 'Other Edition 2',
      isMumakil: false,
      year: 2023,
    },
  ];

  const mockMixedData: IFanEditionsProps[] = [...mockDataWithMumakil, ...mockDataWithoutMumakil];

  it('should render component correctly with mixed data', () => {
    const { container } = renderWithProviders(<FanEditionPage data={mockMixedData} />);

    expect(container).toMatchSnapshot();
  });

  it('should render main title correctly', () => {
    renderWithProviders(<FanEditionPage data={mockMixedData} />);

    const titles = screen.getAllByRole('heading', { level: 3 });
    expect(titles).toHaveLength(3);
    expect(titles[0]).toHaveTextContent("Fan's Editions");
  });

  it('should render divider element', () => {
    const { container } = renderWithProviders(<FanEditionPage data={mockMixedData} />);

    const divider = container.querySelector('hr');
    expect(divider).toBeInTheDocument();
  });

  it('should render two GenericTable components', () => {
    renderWithProviders(<FanEditionPage data={mockMixedData} />);

    const tables = screen.getAllByTestId('generic-table');
    expect(tables).toHaveLength(2);
  });

  it('should filter and display Mumakil data in first table', () => {
    renderWithProviders(<FanEditionPage data={mockMixedData} />);

    const tables = screen.getAllByTestId('generic-table');
    const mumakilTable = tables[0];

    expect(mumakilTable).toHaveTextContent('MumakiL Fandom PresSsss...');
    expect(mumakilTable).toHaveTextContent('Data Count: 2');
    expect(mumakilTable).toHaveTextContent(`Publication Type: ${ETableType.FANEDITION}`);
    expect(mumakilTable).toHaveTextContent('Header Variant: h3');
  });

  it('should filter and display non-Mumakil data in second table', () => {
    renderWithProviders(<FanEditionPage data={mockMixedData} />);

    const tables = screen.getAllByTestId('generic-table');
    const othersTable = tables[1];

    expect(othersTable).toHaveTextContent('Others');
    expect(othersTable).toHaveTextContent('Data Count: 2');
    expect(othersTable).toHaveTextContent(`Publication Type: ${ETableType.FANEDITION}`);
    expect(othersTable).toHaveTextContent('Header Variant: h3');
  });

  it('should handle empty data array', () => {
    renderWithProviders(<FanEditionPage data={[]} />);

    expect(screen.queryByText("Fan's Editions")).toBeInTheDocument();
    expect(screen.queryByTestId('generic-table')).not.toBeInTheDocument();
    expect(screen.queryByText('MumakiL Fandom PresSsss...')).not.toBeInTheDocument();
    expect(screen.queryByText('Others')).not.toBeInTheDocument();
  });

  it('should handle data with only Mumakil items', () => {
    renderWithProviders(<FanEditionPage data={mockDataWithMumakil} />);

    const tables = screen.getAllByTestId('generic-table');
    expect(tables).toHaveLength(1);
    const mumakilTable = tables[0];

    expect(mumakilTable).toHaveTextContent('Data Count: 2');
    expect(screen.queryByText('Others')).not.toBeInTheDocument();
  });

  it('should handle data with only non-Mumakil items', () => {
    renderWithProviders(<FanEditionPage data={mockDataWithoutMumakil} />);

    const tables = screen.getAllByTestId('generic-table');
    expect(tables).toHaveLength(1);
    const othersTable = tables[0];
    expect(screen.queryByText('MumakiL Fandom PresSsss...')).not.toBeInTheDocument();
    expect(othersTable).toHaveTextContent('Data Count: 2');
  });

  it('should maintain consistent table structure and styling', () => {
    const { container } = renderWithProviders(<FanEditionPage data={mockMixedData} />);

    const typography = container.querySelector('h3');
    expect(typography).toHaveClass('MuiTypography-h2');

    const divider = container.querySelector('hr');
    expect(divider).toHaveClass('MuiDivider-root');
  });

  it('should render with empty data snapshot', () => {
    const { container } = renderWithProviders(<FanEditionPage data={[]} />);
    expect(container).toMatchSnapshot();
  });

  it('should render with Mumakil-only data snapshot', () => {
    const { container } = renderWithProviders(<FanEditionPage data={mockDataWithMumakil} />);
    expect(container).toMatchSnapshot();
  });

  it('should render with non-Mumakil-only data snapshot', () => {
    const { container } = renderWithProviders(<FanEditionPage data={mockDataWithoutMumakil} />);
    expect(container).toMatchSnapshot();
  });
});
