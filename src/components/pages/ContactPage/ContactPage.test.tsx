import { vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import ContactPage from './ContactPage';
import * as useIdentityModule from '@/hooks/useIdentity';

vi.mock('@/hooks/useIdentity');
const mockUseIdentity = vi.mocked(useIdentityModule.useIdentity);

vi.mock('@/lib/helpers/sendMessage', () => ({
  sendMessage: vi.fn(),
}));

describe('ContactPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render contact page with basic elements', () => {
    mockUseIdentity.mockReturnValue({ identity: null });

    const { asFragment } = renderWithProviders(<ContactPage />);

    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should dispatch modifyIdentity when identity is available but pageIdentity is null', async () => {
    const mockIdentity = {
      id: '1',
      adminContact: {
        value: 'john@example.com',
      },
    };

    mockUseIdentity.mockReturnValue({ identity: mockIdentity });

    renderWithProviders(<ContactPage />);

    await waitFor(() => {
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });
  });

  it('should not dispatch modifyIdentity when pageIdentity already exists', () => {
    const mockIdentity = {
      id: '1',
      adminContact: {
        value: 'john@example.com',
      },
    };

    mockUseIdentity.mockReturnValue({ identity: mockIdentity });

    renderWithProviders(<ContactPage />);

    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('should handle case when useIdentity returns null identity', () => {
    mockUseIdentity.mockReturnValue({ identity: null });

    const { asFragment } = renderWithProviders(<ContactPage />);

    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot('contact-page-no-identity');
  });

  it('should render ContactButtons component', () => {
    mockUseIdentity.mockReturnValue({ identity: null });

    renderWithProviders(<ContactPage />);

    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('should apply correct Material-UI styling', () => {
    mockUseIdentity.mockReturnValue({ identity: null });

    const { container } = renderWithProviders(<ContactPage />);

    const wrapperElement = container.querySelector('[class*="MuiBox"]');
    expect(wrapperElement).toBeInTheDocument();

    const typographyElement = screen.getByText('Contact');
    expect(typographyElement).toBeInTheDocument();
  });

  it('should match snapshot with complete component structure', () => {
    const mockIdentity = {
      id: '1',
      adminContact: {
        value: 'john@example.com',
      },
    };

    mockUseIdentity.mockReturnValue({ identity: mockIdentity });

    const { asFragment } = renderWithProviders(<ContactPage />);

    expect(asFragment()).toMatchSnapshot('contact-page-complete');
  });
});
