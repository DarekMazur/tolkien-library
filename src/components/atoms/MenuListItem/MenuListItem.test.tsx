import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import MenuListItem from './MenuListItem';
import type { IMainMenuList } from '@/lib/types.ts';
import { faker } from '@faker-js/faker';

// Helper to create typed menu item
const createMenuItem = (props: Partial<IMainMenuList> = {}): IMainMenuList => ({
  id: faker.string.uuid(),
  isDivider: false,
  ...props,
});

describe('MenuListItem', () => {
  it('renders home item with FiberNewIcon', () => {
    // Arrange
    const item: IMainMenuList = createMenuItem({ title: 'Home', link: '/' });

    // Act
    renderWithProviders(<MenuListItem item={item} />);

    // Assert
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByTestId('FiberNewIcon')).toBeInTheDocument();
  });

  it('renders articles item with AttachFileIcon', () => {
    const item: IMainMenuList = createMenuItem({ title: 'Articles', link: '/articles' });
    renderWithProviders(<MenuListItem item={item} />);
    expect(screen.getByText('Articles')).toBeInTheDocument();
    expect(screen.getByTestId('AttachFileIcon')).toBeInTheDocument();
  });

  it('renders contact item with ContactMailIcon', () => {
    const item: IMainMenuList = createMenuItem({ title: 'Contact', link: '/contact' });
    renderWithProviders(<MenuListItem item={item} />);
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByTestId('ContactMailIcon')).toBeInTheDocument();
  });

  it('renders other item with DoubleArrowIcon', () => {
    const item: IMainMenuList = createMenuItem({ title: 'Other', link: '/other' });
    renderWithProviders(<MenuListItem item={item} />);
    expect(screen.getByText('Other')).toBeInTheDocument();
    expect(screen.getByTestId('DoubleArrowIcon')).toBeInTheDocument();
  });

  it('renders correct text and link for any item', () => {
    const item: IMainMenuList = createMenuItem({ title: 'Custom', link: '/custom' });
    renderWithProviders(<MenuListItem item={item} />);
    expect(screen.getByText('Custom')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/custom');
  });

  it('matches snapshot', () => {
    const item: IMainMenuList = createMenuItem({ title: 'Snapshot', link: '/snapshot' });
    const { asFragment } = renderWithProviders(<MenuListItem item={item} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
