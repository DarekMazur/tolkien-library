import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '@/lib/providers/renderWithProviders'; // named export

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

import Error, { ErrorProps } from './Error';
import { MemoryRouter } from 'react-router';

describe('Error component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders default title, message and button snapshot', () => {
    const { container } = renderWithProviders(
      <MemoryRouter>
        <Error />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders custom errorMessage and errorCode', () => {
    renderWithProviders(
      <MemoryRouter>
        <Error errorMessage="Failed to fetch data" errorCode={500} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Something went wrong...');
    expect(screen.getByText('Failed to fetch data')).toBeInTheDocument();
    expect(screen.getByText('Code: 500')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /go home/i })).toBeInTheDocument();
  });

  it('calls onReset callback when provided', () => {
    const onReset = vi.fn();
    renderWithProviders(
      <MemoryRouter>
        <Error onReset={onReset} resetButtonText="Retry" />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole('button', { name: /retry/i }));
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('navigates home when onReset is not provided', () => {
    renderWithProviders(
      <MemoryRouter>
        <Error />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByRole('button', { name: /go home/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
  });

  it('snapshot with custom styles and texts', () => {
    const props: Partial<ErrorProps> = {
      errorMessage: 'Custom error',
      errorCode: 'XYZ',
      resetButtonText: 'Back',
    };
    const { container } = renderWithProviders(
      <MemoryRouter>
        <Error {...props} />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
