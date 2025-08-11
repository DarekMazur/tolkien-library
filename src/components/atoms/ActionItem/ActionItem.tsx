import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { EBoardEnums } from '@/lib/utils/boardEnums';

/**
 * Component representing a single action item in a list.
 *
 * Displays a list item with an icon and a button that triggers an action when clicked.
 *
 * @param {Object} props - Component props
 * @param {EBoardEnums} props.action - The action enum value that defines the type of action.
 * @param {(action: EBoardEnums) => void} [props.onClick] - Optional click handler called with the action when the item is clicked.
 *
 * @returns {JSX.Element} A material UI ListItem with an icon and a clickable text button.
 *
 * @example
 * <ActionItem action={EBoardEnums.AddCard} onClick={(action) => console.log(action)} />
 */

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
