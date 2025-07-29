import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import PersonInfo from './PersonInfo';

describe('PersonInfo Component', () => {
  const mockProps = {
    fullName: 'Éowyn of Rohan',
    roleLabel: 'Shieldmaiden',
    description: 'I am no man!',
  };

  describe('Basic rendering', () => {
    it('should render full name as main heading', () => {
      renderWithProviders(
        <PersonInfo fullName={mockProps.fullName} roleLabel={mockProps.roleLabel} />,
      );

      const nameHeading = screen.getByRole('heading', { level: 1 });
      expect(nameHeading).toBeInTheDocument();
      expect(nameHeading).toHaveTextContent(mockProps.fullName);
    });

    it('should render role label as secondary heading', () => {
      renderWithProviders(
        <PersonInfo fullName={mockProps.fullName} roleLabel={mockProps.roleLabel} />,
      );

      const roleHeading = screen.getByRole('heading', { level: 2 });
      expect(roleHeading).toBeInTheDocument();
      expect(roleHeading).toHaveTextContent(mockProps.roleLabel);
    });

    it('should apply correct Typography variants', () => {
      renderWithProviders(
        <PersonInfo fullName={mockProps.fullName} roleLabel={mockProps.roleLabel} />,
      );

      const nameElement = screen.getByRole('heading', { level: 1 });
      const roleElement = screen.getByRole('heading', { level: 2 });

      expect(nameElement.closest('.MuiTypography-h2')).toBeInTheDocument();
      expect(roleElement.closest('.MuiTypography-h3')).toBeInTheDocument();
    });
  });

  describe('Description rendering', () => {
    it('should render description when provided', () => {
      renderWithProviders(
        <PersonInfo
          fullName={mockProps.fullName}
          roleLabel={mockProps.roleLabel}
          description={mockProps.description}
        />,
      );

      const description = screen.getByText(mockProps.description);
      expect(description).toBeInTheDocument();
    });

    it('should render divider when description is provided', () => {
      const { container } = renderWithProviders(
        <PersonInfo
          fullName={mockProps.fullName}
          roleLabel={mockProps.roleLabel}
          description={mockProps.description}
        />,
      );

      const divider = container.querySelector('.MuiDivider-root');
      expect(divider).toBeInTheDocument();
    });

    it('should not render description or divider when description is not provided', () => {
      const { container } = renderWithProviders(
        <PersonInfo fullName={mockProps.fullName} roleLabel={mockProps.roleLabel} />,
      );

      const divider = container.querySelector('.MuiDivider-root');
      expect(divider).not.toBeInTheDocument();
      expect(screen.queryByText(mockProps.description)).not.toBeInTheDocument();
    });

    it('should not render description when empty string is provided', () => {
      const { container } = renderWithProviders(
        <PersonInfo fullName={mockProps.fullName} roleLabel={mockProps.roleLabel} description="" />,
      );

      const divider = container.querySelector('.MuiDivider-root');
      expect(divider).not.toBeInTheDocument();
    });
  });

  describe('Styling and structure', () => {
    it('should wrap content in Box component', () => {
      const { container } = renderWithProviders(
        <PersonInfo fullName={mockProps.fullName} roleLabel={mockProps.roleLabel} />,
      );

      const boxElement = container.querySelector('.MuiBox-root');
      expect(boxElement).toBeInTheDocument();
    });

    it('should apply correct margin to divider', () => {
      const { container } = renderWithProviders(
        <PersonInfo
          fullName={mockProps.fullName}
          roleLabel={mockProps.roleLabel}
          description={mockProps.description}
        />,
      );

      const divider = container.querySelector('.MuiDivider-root');
      expect(divider).toHaveStyle({
        marginTop: '32px',
        marginBottom: '32px',
      });
    });
  });

  describe('Edge cases', () => {
    it('should handle special characters in full name', () => {
      const specialName = 'Éowyn Mûmakil-Rider & Dragon-Slayer';
      renderWithProviders(<PersonInfo fullName={specialName} roleLabel={mockProps.roleLabel} />);

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(specialName);
    });

    it('should handle long description text', () => {
      const longDescription =
        'A very long description that spans multiple lines and contains various characters, numbers 123, and symbols @#$%^&*()';
      renderWithProviders(
        <PersonInfo
          fullName={mockProps.fullName}
          roleLabel={mockProps.roleLabel}
          description={longDescription}
        />,
      );

      expect(screen.getByText(longDescription)).toBeInTheDocument();
    });

    it('should handle multiline description', () => {
      const multilineDescription = 'First line\nSecond line\nThird line';
      renderWithProviders(
        <PersonInfo
          fullName={mockProps.fullName}
          roleLabel={mockProps.roleLabel}
          description={multilineDescription}
        />,
      );

      expect(screen.getByText(/First line\s+Second line\s+Third line/)).toBeInTheDocument();
    });
  });

  describe('Snapshot tests', () => {
    it('should match snapshot without description', () => {
      const { container } = renderWithProviders(
        <PersonInfo fullName={mockProps.fullName} roleLabel={mockProps.roleLabel} />,
      );

      expect(container.firstChild).toMatchSnapshot('person-info-without-description');
    });

    it('should match snapshot with description', () => {
      const { container } = renderWithProviders(
        <PersonInfo
          fullName={mockProps.fullName}
          roleLabel={mockProps.roleLabel}
          description={mockProps.description}
        />,
      );

      expect(container.firstChild).toMatchSnapshot('person-info-with-description');
    });

    it('should match snapshot with long content', () => {
      const { container } = renderWithProviders(
        <PersonInfo
          fullName="Very Long Name With Multiple Words And Special Characters Éowyn"
          roleLabel="Very Long Role Label That Might Wrap To Multiple Lines"
          description="This is a very long description that contains multiple sentences and should test how the component handles extensive content. It includes various punctuation marks, numbers like 123, and special characters such as @#$%."
        />,
      );

      expect(container.firstChild).toMatchSnapshot('person-info-with-long-content');
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      renderWithProviders(
        <PersonInfo
          fullName={mockProps.fullName}
          roleLabel={mockProps.roleLabel}
          description={mockProps.description}
        />,
      );

      const headings = screen.getAllByRole('heading');
      expect(headings).toHaveLength(2);
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    it('should be accessible via screen reader', () => {
      renderWithProviders(
        <PersonInfo
          fullName={mockProps.fullName}
          roleLabel={mockProps.roleLabel}
          description={mockProps.description}
        />,
      );

      expect(
        screen.getByRole('heading', { level: 1, name: mockProps.fullName }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { level: 2, name: mockProps.roleLabel }),
      ).toBeInTheDocument();
      expect(screen.getByText(mockProps.description)).toBeInTheDocument();
    });
  });
});
