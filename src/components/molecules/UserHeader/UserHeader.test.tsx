import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import UserHeader from './UserHeader';
import { faker } from '@faker-js/faker';

describe('UserHeader Component', () => {
  const mockSetEditMode = vi.fn();

  const defaultProps = {
    editMode: false,
    setEditMode: mockSetEditMode,
    user: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: faker.image.avatar(),
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('should render user header with user information', () => {
      renderWithProviders(<UserHeader {...defaultProps} />);

      expect(screen.getByText('Your profile')).toBeInTheDocument();
      expect(screen.getByText('Manage your data')).toBeInTheDocument();
    });

    it('should display edit button when not in edit mode', () => {
      renderWithProviders(<UserHeader {...defaultProps} />);

      const editButton = screen.getByRole('button');
      expect(editButton).toBeInTheDocument();
      expect(editButton).toHaveAttribute('type', 'button');
    });

    it('should not display edit button when in edit mode', () => {
      const editModeProps = { ...defaultProps, editMode: true };
      renderWithProviders(<UserHeader {...editModeProps} />);

      const editButtons = screen.queryAllByRole('button');
      expect(editButtons).toHaveLength(0);
    });
  });

  describe('User Interactions', () => {
    it('should call setEditMode when edit button is clicked', () => {
      renderWithProviders(<UserHeader {...defaultProps} />);

      const editButton = screen.getByRole('button');
      fireEvent.click(editButton);

      expect(mockSetEditMode).toHaveBeenCalledTimes(1);
      expect(mockSetEditMode).toHaveBeenCalledWith(true);
    });

    it('should handle multiple clicks on edit button', () => {
      renderWithProviders(<UserHeader {...defaultProps} />);

      const editButton = screen.getByRole('button');
      fireEvent.click(editButton);
      fireEvent.click(editButton);

      expect(mockSetEditMode).toHaveBeenCalledTimes(2);
    });
  });

  describe('Props Validation', () => {
    it('should handle missing optional props gracefully', () => {
      const minimalProps = {
        editMode: false,
        setEditMode: mockSetEditMode,
      };

      expect(() => {
        renderWithProviders(<UserHeader {...minimalProps} />);
      }).not.toThrow();
    });

    it('should render correctly with different editMode values', () => {
      const { rerender } = renderWithProviders(<UserHeader {...defaultProps} />);
      expect(screen.getByRole('button')).toBeInTheDocument();

      rerender(<UserHeader {...defaultProps} editMode={true} />);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      renderWithProviders(<UserHeader {...defaultProps} />);

      const editButton = screen.getByRole('button');
      expect(editButton).toHaveAttribute('type', 'button');
    });

    it('should be keyboard accessible', () => {
      renderWithProviders(<UserHeader {...defaultProps} />);

      const editButton = screen.getByRole('button');
      editButton.focus();

      expect(document.activeElement).toBe(editButton);
    });
  });

  describe('Snapshot Testing', () => {
    it('should match snapshot in default state', () => {
      const { container } = renderWithProviders(<UserHeader {...defaultProps} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot in edit mode', () => {
      const editModeProps = { ...defaultProps, editMode: true };
      const { container } = renderWithProviders(<UserHeader {...editModeProps} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot with minimal props', () => {
      const minimalProps = {
        editMode: false,
        setEditMode: mockSetEditMode,
      };
      const { container } = renderWithProviders(<UserHeader {...minimalProps} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('MUI Styling', () => {
    it('should apply correct sx styles to Paper component', () => {
      const { container } = renderWithProviders(<UserHeader {...defaultProps} />);

      const paperElement = container.querySelector('[class*="MuiPaper"]');
      expect(paperElement).toBeInTheDocument();
    });

    it('should render Typography components with correct hierarchy', () => {
      renderWithProviders(<UserHeader {...defaultProps} />);

      const profileHeading = screen.getByText('Your profile');
      const subtitleText = screen.getByText('Manage your data');

      expect(profileHeading).toBeInTheDocument();
      expect(subtitleText).toBeInTheDocument();
    });

    it('should apply IconButton positioning correctly', () => {
      renderWithProviders(<UserHeader {...defaultProps} />);

      const iconButton = screen.getByRole('button', { name: /edit/i });
      expect(iconButton).toBeInTheDocument();

      expect(iconButton).toHaveClass('MuiIconButton-root');
    });
  });
});
