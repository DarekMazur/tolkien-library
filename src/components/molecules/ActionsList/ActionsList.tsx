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
