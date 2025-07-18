import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import MenuListItem from './MenuListItem';
import type { IMainMenuList } from '@/lib/types';
import { faker } from '@faker-js/faker';
import { MemoryRouter } from 'react-router';

const createMenuItem = (props: Partial<IMainMenuList> = {}): IMainMenuList => ({
  id: faker.string.uuid(),
  isDivider: false,
  ...props,
});

describe('MenuListItem', () => {
  it('renders home item with FiberNewIcon', () => {
    const item: IMainMenuList = createMenuItem({ title: 'Home', link: '/' });

    renderWithProviders(
      <MemoryRouter>
        <MenuListItem
          item={item}
          toggleMenu={(): void => {
            alert('ToggleMenu.');
          }}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByTestId('FiberNewIcon')).toBeInTheDocument();
  });

  it('renders articles item with AttachFileIcon', () => {
    const item: IMainMenuList = createMenuItem({ title: 'Articles', link: '/articles' });
    renderWithProviders(
      <MemoryRouter>
        <MenuListItem
          item={item}
          toggleMenu={(): void => {
            alert('ToggleMenu.');
          }}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText('Articles')).toBeInTheDocument();
    expect(screen.getByTestId('AttachFileIcon')).toBeInTheDocument();
  });

  it('renders contact item with ContactMailIcon', () => {
    const item: IMainMenuList = createMenuItem({ title: 'Contact', link: '/contact' });
    renderWithProviders(
      <MemoryRouter>
        <MenuListItem
          item={item}
          toggleMenu={(): void => {
            alert('ToggleMenu.');
          }}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByTestId('ContactMailIcon')).toBeInTheDocument();
  });

  it('renders other item with DoubleArrowIcon', () => {
    const item: IMainMenuList = createMenuItem({ title: 'Other', link: '/other' });
    renderWithProviders(
      <MemoryRouter>
        <MenuListItem
          item={item}
          toggleMenu={(): void => {
            alert('ToggleMenu.');
          }}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText('Other')).toBeInTheDocument();
    expect(screen.getByTestId('DoubleArrowIcon')).toBeInTheDocument();
  });

  it('renders correct text and link for any item', () => {
    const item: IMainMenuList = createMenuItem({ title: 'Custom', link: '/custom' });
    renderWithProviders(
      <MemoryRouter>
        <MenuListItem
          item={item}
          toggleMenu={(): void => {
            alert('ToggleMenu.');
          }}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText('Custom')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/custom');
  });

  it('matches snapshot', () => {
    const item: IMainMenuList = createMenuItem({ title: 'Snapshot', link: '/snapshot' });
    const { asFragment } = renderWithProviders(
      <MemoryRouter>
        <MenuListItem
          item={item}
          toggleMenu={(): void => {
            alert('ToggleMenu.');
          }}
        />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
