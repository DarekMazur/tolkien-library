import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import ActionsList from './ActionsList';
import { EBoardEnums } from '@/lib/utils/boardEnums';

const BOARD_ACTIONS = [
  EBoardEnums.NEWS,
  EBoardEnums.BOOK,
  EBoardEnums.PUBLISHER,
  EBoardEnums.PUBLICATION,
  EBoardEnums.FANZONE,
  EBoardEnums.TRANSLATOR,
] as const;

describe('ActionsList Component', () => {
  it('should render all action items', () => {
    const { getByRole, queryAllByRole } = renderWithProviders(<ActionsList />);

    const list = getByRole('list');
    expect(list).toBeInTheDocument();

    const items = queryAllByRole('listitem');
    expect(items).toHaveLength(BOARD_ACTIONS.length);
  });

  it('should display each action label correctly', () => {
    const { getByText } = renderWithProviders(<ActionsList />);

    BOARD_ACTIONS.forEach((action) => {
      expect(getByText(`Add ${action}`)).toBeInTheDocument();
    });
  });

  it('should match the snapshot including styles', () => {
    const { container } = renderWithProviders(<ActionsList />);
    expect(container).toMatchSnapshot();
  });
});
