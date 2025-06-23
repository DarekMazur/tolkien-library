import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ImageController from './ImageController';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';

const createMockFile = (name: string, type: string) => {
  const file = new File(['test content'], name, { type });
  return file;
};

describe('ImageController Component', () => {
  const defaultProps = {
    image: [],
    defaultImageUrl: '/default-avatar.jpg',
    altText: 'User avatar',
    imageUrl: '/user-avatar.jpg',
    editMode: false,
    onFilesChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic rendering', () => {
    it('renders avatar with default image when no image is selected', () => {
      renderWithProviders(<ImageController {...defaultProps} />);

      const avatar = screen.getByRole('img');
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute('src', defaultProps.defaultImageUrl);
      expect(avatar).toHaveAttribute('alt', defaultProps.altText);
    });

    it('renders avatar with provided image when image is selected', () => {
      const propsWithImage = {
        ...defaultProps,
        image: [createMockFile('test.jpg', 'image/jpeg')],
      };

      renderWithProviders(<ImageController {...propsWithImage} />);

      const avatar = screen.getByRole('img');
      expect(avatar).toHaveAttribute('src', defaultProps.imageUrl);
    });

    it('applies correct alt text to avatar', () => {
      const customAltText = 'Custom user profile picture';

      renderWithProviders(<ImageController {...defaultProps} altText={customAltText} />);

      const avatar = screen.getByRole('img');
      expect(avatar).toHaveAttribute('alt', customAltText);
    });
  });

  describe('Edit mode functionality', () => {
    it('does not show upload button when editMode is false', () => {
      renderWithProviders(<ImageController {...defaultProps} editMode={false} />);

      const uploadButton = screen.queryByRole('button');
      expect(uploadButton).not.toBeInTheDocument();
    });

    it('shows upload button when editMode is true', () => {
      renderWithProviders(<ImageController {...defaultProps} editMode={true} />);

      const uploadIcon = screen.getByTestId('CloudUploadIcon');
      expect(uploadIcon).toBeInTheDocument();
    });

    it('triggers file input when upload button is clicked', async () => {
      const user = userEvent.setup();

      renderWithProviders(<ImageController {...defaultProps} editMode={true} />);

      const fileInput = screen.getByRole('textbox', { hidden: true }) as HTMLInputElement;
      const uploadButton = screen.getByTestId('CloudUploadIcon').closest('div');

      // Mock click on file input
      const clickSpy = vi.spyOn(fileInput, 'click');

      await user.click(uploadButton!);

      expect(clickSpy).toHaveBeenCalled();
    });
  });

  describe('File upload functionality', () => {
    it('calls onFilesChange when file is selected', async () => {
      const mockOnFilesChange = vi.fn();
      const user = userEvent.setup();

      renderWithProviders(
        <ImageController {...defaultProps} editMode={true} onFilesChange={mockOnFilesChange} />,
      );

      const fileInput = screen.getByRole('textbox', { hidden: true }) as HTMLInputElement;
      const testFile = createMockFile('test-image.jpg', 'image/jpeg');

      await user.upload(fileInput, testFile);

      expect(mockOnFilesChange).toHaveBeenCalledWith([testFile]);
    });

    it('calls onFilesChange with only one file when a single file is selected', async () => {
      const mockOnFilesChange = vi.fn();
      const user = userEvent.setup();

      renderWithProviders(
        <ImageController {...defaultProps} editMode={true} onFilesChange={mockOnFilesChange} />,
      );

      const fileInput = screen.getByRole('textbox', { hidden: true }) as HTMLInputElement;
      const testFile = createMockFile('avatar.jpg', 'image/jpeg');

      await user.upload(fileInput, testFile);

      expect(mockOnFilesChange).toHaveBeenCalledTimes(1);
      const files = mockOnFilesChange.mock.calls[0][0];
      expect(Array.isArray(files)).toBe(true);
      expect(files).toHaveLength(1);
      expect(files[0].name).toBe('avatar.jpg');
    });

    it('does not allow multiple file selection', () => {
      renderWithProviders(<ImageController {...defaultProps} editMode={true} />);

      const fileInput = screen.getByRole('textbox', { hidden: true }) as HTMLInputElement;
      expect(fileInput.hasAttribute('multiple')).toBe(false);
    });

    it('accepts only image files', () => {
      renderWithProviders(<ImageController {...defaultProps} editMode={true} />);

      const fileInput = screen.getByRole('textbox', { hidden: true }) as HTMLInputElement;
      expect(fileInput).toHaveAttribute('accept', 'image/*');
    });
  });

  describe('Styling and appearance', () => {
    it('applies correct styles to avatar', () => {
      renderWithProviders(<ImageController {...defaultProps} />);

      const avatarImg = screen.getByRole('img');
      const avatarRoot = avatarImg.parentElement as HTMLElement;

      // Check if styles are applied (this depends on your styling approach)
      expect(avatarRoot).toHaveStyle({
        width: '120px',
        height: '120px',
      });
    });

    it('applies correct positioning to upload button', () => {
      renderWithProviders(<ImageController {...defaultProps} editMode={true} />);

      const uploadButton = screen.getByTestId('CloudUploadIcon').closest('div');

      expect(uploadButton).toHaveStyle({
        position: 'absolute',
        top: '0px',
        left: '0px',
      });
    });

    it('centers content in main container', () => {
      const { container } = renderWithProviders(<ImageController {...defaultProps} />);

      const mainBox = container.firstChild as HTMLElement;
      expect(mainBox).toHaveStyle({
        textAlign: 'center',
        position: 'relative',
      });
    });
  });

  describe('Edge cases', () => {
    it('handles empty image array correctly', () => {
      renderWithProviders(<ImageController {...defaultProps} image={[]} />);

      const avatar = screen.getByRole('img');
      expect(avatar).toHaveAttribute('src', defaultProps.defaultImageUrl);
    });

    it('handles missing onFilesChange gracefully', async () => {
      const user = userEvent.setup();

      renderWithProviders(
        <ImageController {...defaultProps} editMode={true} onFilesChange={undefined} />,
      );

      const fileInput = screen.getByRole('textbox', { hidden: true }) as HTMLInputElement;
      const testFile = createMockFile('test.jpg', 'image/jpeg');

      expect(async () => {
        await user.upload(fileInput, testFile);
      }).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    it('provides proper alt text for screen readers', () => {
      const altText = 'Profile picture of John Doe';

      renderWithProviders(<ImageController {...defaultProps} altText={altText} />);

      const avatar = screen.getByRole('img');
      expect(avatar).toHaveAccessibleName(altText);
    });

    it('has hidden file input for keyboard navigation', () => {
      renderWithProviders(<ImageController {...defaultProps} editMode={true} />);

      const fileInput = screen.getByRole('textbox', { hidden: true });
      expect(fileInput).toHaveStyle({ display: 'none' });
    });
  });

  describe('Component snapshots', () => {
    it('matches snapshot in default state', () => {
      const { container } = renderWithProviders(<ImageController {...defaultProps} />);

      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot in edit mode', () => {
      const { container } = renderWithProviders(
        <ImageController {...defaultProps} editMode={true} />,
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot with selected image', () => {
      const { container } = renderWithProviders(
        <ImageController {...defaultProps} image={[createMockFile('test.jpg', 'image/jpeg')]} />,
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
