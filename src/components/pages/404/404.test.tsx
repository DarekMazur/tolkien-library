import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PageNotFound from '@/components/pages/404/404';
import { MemoryRouter } from 'react-router';

vi.mock('@/assets/vector/ring.svg?react', () => ({
  default: () => <svg data-testid="ring-svg" />,
}));

describe('PageNotFound', () => {
  it('renders the main heading', () => {
    render(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { name: /404/i })).toBeInTheDocument();
  });

  it('renders the subtitle text', () => {
    render(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>,
    );
    expect(screen.getByText(/steps into wild lands/i)).toBeInTheDocument();
  });

  it('renders the Tolkien quote', () => {
    render(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Not all those who wander are lost/i)).toBeInTheDocument();
  });

  it('renders the Home button', () => {
    render(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>,
    );
    expect(screen.getByRole('button', { name: /Better go back Home/i })).toBeInTheDocument();
  });

  it('renders the ring SVG', () => {
    render(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>,
    );
    expect(screen.getByTestId('ring-svg')).toBeInTheDocument();
  });

  it('Home button is clickable', () => {
    render(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>,
    );
    const button = screen.getByRole('button', { name: /Better go back Home/i });
    fireEvent.click(button);
    expect(button).toBeEnabled();
  });
});
