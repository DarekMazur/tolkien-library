import { Box, List } from '@mui/material';
import ActionItem from '@/components/atoms/ActionItem/ActionItem';
import { EBoardEnums } from '@/lib/utils/boardEnums';

const BOARD_ACTIONS = [
  EBoardEnums.NEWS,
  EBoardEnums.BOOK,
  EBoardEnums.PUBLISHER,
  EBoardEnums.PUBLICATION,
  EBoardEnums.FANZONE,
  EBoardEnums.TRANSLATOR,
] as const;

/**
 * ActionsList component renders a list of action items based on predefined board actions.
 *
 * This component uses Material-UI's Box and List components to layout the list,
 * and maps over a constant array of action enums to render individual ActionItem components.
 *
 * @component
 * @example
 * return (
 *   <ActionsList />
 * );
 *
 * @returns {JSX.Element} A styled list of action items corresponding to board actions.
 */

const ActionsList = () => {
  return (
    <Box>
      <List sx={{ width: 'fit-content', minWidth: 0 }}>
        {BOARD_ACTIONS.map((action) => (
          <ActionItem key={action} action={action} />
        ))}
      </List>
    </Box>
  );
};

export default ActionsList;
