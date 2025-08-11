import { vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import ActionItem from './ActionItem';
import { EBoardEnums } from '@/lib/utils/boardEnums';

describe('ActionItem Component', () => {
  const defaultProps = {
    action: EBoardEnums.BOOK,
  };

  it('renders correctly and matches snapshot', () => {
    const { asFragment } = renderWithProviders(<ActionItem {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('displays the correct text based on action prop', () => {
    renderWithProviders(<ActionItem {...defaultProps} />);
    expect(screen.getByText(`Add ${EBoardEnums.BOOK}`)).toBeInTheDocument();
  });

  it('calls onClick handler with correct action when clicked', () => {
    const onClickMock = vi.fn();
    renderWithProviders(<ActionItem {...defaultProps} onClick={onClickMock} />);

    const button = screen.getByRole('button', { name: `Add ${EBoardEnums.BOOK}` });
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
    expect(onClickMock).toHaveBeenCalledWith(EBoardEnums.BOOK);
  });

  it('has the correct MUI styles applied', () => {
    const { container } = renderWithProviders(<ActionItem {...defaultProps} />);
    const listItem = container.querySelector('.MuiListItem-root');
    const listButton = container.querySelector('.MuiListItemButton-root');
    const icon = container.querySelector('.MuiListItemIcon-root');

    expect(listItem).toHaveClass('MuiListItem-root');
    expect(listButton).toHaveClass('MuiListItemButton-root');
    expect(icon).toHaveClass('MuiListItemIcon-root');
  });
});
