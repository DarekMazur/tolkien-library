import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ComponentType } from 'react';
import EntityPage from './EntityPage';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import { MemoryRouter } from 'react-router';
import { screen } from '@testing-library/react';

const MockInfoComponent: ComponentType<{ entity: TestEntity }> = ({ entity }) => (
  <div data-testid="info-component">
    <h1>{entity.name}</h1>
    <p>{entity.description}</p>
  </div>
);

const MockItemsComponent: ComponentType<{ items: TestItem[] | null }> = ({ items }) => (
  <div data-testid="items-component">
    {items ? (
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    ) : (
      <p>No items available</p>
    )}
  </div>
);

interface TestEntity {
  id: string;
  name: string;
  description: string;
}

interface TestItem {
  id: string;
  title: string;
}

const mockEntity: TestEntity = {
  id: '1',
  name: 'Test Entity',
  description: 'Test entity description',
};

const mockItems: TestItem[] = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
];

describe('EntityPage', () => {
  let mockUseData: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockUseData = vi.fn();
  });

  it('should render loader when loading', () => {
    mockUseData.mockReturnValue({
      entity: null,
      books: null,
      isLoading: true,
      hasError: false,
      errorMessage: null,
    });

    const { container } = renderWithProviders(
      <MemoryRouter>
        <EntityPage
          useData={mockUseData}
          InfoComponent={MockInfoComponent}
          ItemsComponent={MockItemsComponent}
        />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
    expect(screen.getByLabelText(/loader/i)).toBeInTheDocument();
  });

  it('should render error component when hasError is true', () => {
    const errorMessage = 'Something went wrong';
    mockUseData.mockReturnValue({
      entity: null,
      books: null,
      isLoading: false,
      hasError: true,
      errorMessage,
    });

    const { container, getByText } = renderWithProviders(
      <MemoryRouter>
        <EntityPage
          useData={mockUseData}
          InfoComponent={MockInfoComponent}
          ItemsComponent={MockItemsComponent}
        />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
    expect(getByText(errorMessage)).toBeTruthy();
  });

  it('should render error with default message when errorMessage is null', () => {
    mockUseData.mockReturnValue({
      entity: null,
      books: null,
      isLoading: false,
      hasError: true,
      errorMessage: null,
    });

    const { container, getByText } = renderWithProviders(
      <MemoryRouter>
        <EntityPage
          useData={mockUseData}
          InfoComponent={MockInfoComponent}
          ItemsComponent={MockItemsComponent}
        />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
    expect(getByText('Unknown error')).toBeTruthy();
  });

  it('should render NoContent when entity is null', () => {
    mockUseData.mockReturnValue({
      entity: null,
      books: null,
      isLoading: false,
      hasError: false,
      errorMessage: null,
    });

    const { container } = renderWithProviders(
      <MemoryRouter>
        <EntityPage
          useData={mockUseData}
          InfoComponent={MockInfoComponent}
          ItemsComponent={MockItemsComponent}
        />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
    expect(screen.getByText(/nothing found/i)).toBeInTheDocument();
  });

  it('should render entity info when entity is provided', () => {
    mockUseData.mockReturnValue({
      entity: mockEntity,
      books: null,
      isLoading: false,
      hasError: false,
      errorMessage: null,
    });

    const { container, getByText } = renderWithProviders(
      <MemoryRouter>
        <EntityPage
          useData={mockUseData}
          InfoComponent={MockInfoComponent}
          ItemsComponent={MockItemsComponent}
        />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
    expect(getByText('Test Entity')).toBeTruthy();
    expect(getByText('Test entity description')).toBeTruthy();
  });

  it('should render entity info with items section when ItemsComponent is provided', () => {
    mockUseData.mockReturnValue({
      entity: mockEntity,
      books: mockItems,
      isLoading: false,
      hasError: false,
      errorMessage: null,
    });

    const { container, getByText } = renderWithProviders(
      <MemoryRouter>
        <EntityPage
          useData={mockUseData}
          InfoComponent={MockInfoComponent}
          ItemsComponent={MockItemsComponent}
        />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
    expect(getByText('Test Entity')).toBeTruthy();
    expect(getByText('Items:')).toBeTruthy();
    expect(getByText('Item 1')).toBeTruthy();
    expect(getByText('Item 2')).toBeTruthy();
  });

  it('should render with custom items section title', () => {
    const customTitle = 'Related Books:';
    mockUseData.mockReturnValue({
      entity: mockEntity,
      books: mockItems,
      isLoading: false,
      hasError: false,
      errorMessage: null,
    });

    const { container, getByText } = renderWithProviders(
      <MemoryRouter>
        <EntityPage
          useData={mockUseData}
          InfoComponent={MockInfoComponent}
          ItemsComponent={MockItemsComponent}
          itemsSectionTitle={customTitle}
        />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
    expect(getByText(customTitle)).toBeTruthy();
  });

  it('should render without items section when ItemsComponent is not provided', () => {
    mockUseData.mockReturnValue({
      entity: mockEntity,
      books: mockItems,
      isLoading: false,
      hasError: false,
      errorMessage: null,
    });

    const { container, queryByText } = renderWithProviders(
      <MemoryRouter>
        <EntityPage useData={mockUseData} InfoComponent={MockInfoComponent} />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
    expect(queryByText('Items:')).toBeFalsy();
    expect(container.querySelector('[data-testid="items-component"]')).toBeFalsy();
  });

  it('should handle empty items array', () => {
    mockUseData.mockReturnValue({
      entity: mockEntity,
      books: [],
      isLoading: false,
      hasError: false,
      errorMessage: null,
    });

    const { container, getByText } = renderWithProviders(
      <MemoryRouter>
        <EntityPage
          useData={mockUseData}
          InfoComponent={MockInfoComponent}
          ItemsComponent={MockItemsComponent}
        />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
    expect(getByText('Items:')).toBeTruthy();
    expect(container.querySelector('ul')).toBeTruthy();
    expect(container.querySelectorAll('li')).toHaveLength(0);
  });

  it('should apply correct styling to items section', () => {
    mockUseData.mockReturnValue({
      entity: mockEntity,
      books: mockItems,
      isLoading: false,
      hasError: false,
      errorMessage: null,
    });

    const { container } = renderWithProviders(
      <MemoryRouter>
        <EntityPage
          useData={mockUseData}
          InfoComponent={MockInfoComponent}
          ItemsComponent={MockItemsComponent}
        />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();

    const itemsBox = container.querySelector('[data-testid="items-component"]')?.parentElement;
    expect(itemsBox).toBeTruthy();

    const titleElement = container.querySelector('h2');
    expect(titleElement).toBeTruthy();
    expect(titleElement?.textContent).toBe('Items:');
  });

  it('should call useData hook correctly', () => {
    mockUseData.mockReturnValue({
      entity: mockEntity,
      books: mockItems,
      isLoading: false,
      hasError: false,
      errorMessage: null,
    });

    renderWithProviders(
      <MemoryRouter>
        <EntityPage
          useData={mockUseData}
          InfoComponent={MockInfoComponent}
          ItemsComponent={MockItemsComponent}
        />
      </MemoryRouter>,
    );

    expect(mockUseData).toHaveBeenCalledTimes(1);
    expect(mockUseData).toHaveBeenCalledWith();
  });
});
