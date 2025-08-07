import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { EBoardEnums } from '@/lib/utils/boardEnums';

interface ActionItemProps {
  action: EBoardEnums;
  onClick?: (action: EBoardEnums) => void;
}

const ActionItem = ({ action, onClick }: ActionItemProps) => {
  const handleClick = () => {
    onClick?.(action);
  };

  return (
    <ListItem key={action}>
      <ListItemIcon>
        <AddCircleIcon />
      </ListItemIcon>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={`Add ${action}`} />
      </ListItemButton>
    </ListItem>
  );
};

export default ActionItem;
