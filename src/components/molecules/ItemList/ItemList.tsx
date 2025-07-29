import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

/**
 * Props interface for the ItemList component.
 *
 * @template Item - The type of items in the list
 */
interface ItemListProps<Item> {
  /**
   * Array of items to display in the list. Can be null to indicate loading state.
   * @type {Item[] | null}
   */
  items: Item[] | null;
  /**
   * Function to extract the primary display text from each item.
   * @param {Item} item - The item to extract text from
   * @returns {string} The primary text to display for the item
   */
  getPrimaryText: (item: Item) => string;
  /**
   * Optional callback function called when an item is clicked.
   * @param {Item} item - The clicked item
   * @returns {void}
   * @optional
   */
  onClickItem?: (item: Item) => void;
  /**
   * Optional message to display when the items array is empty or null.
   * @type {string}
   * @default "No items found"
   * @optional
   */
  emptyMessage?: string;
}

/**
 * A generic reusable list component that displays items with Material-UI styling.
 *
 * Features:
 * - Generic type support for any object type
 * - Customizable text extraction via getPrimaryText function
 * - Optional click handlers for interactive behavior
 * - Empty state handling with customizable message
 * - Material-UI integration with consistent styling
 *
 * @template T - The type of objects in the items array, must extend object
 *
 * @param {ItemListProps<T>} props - The component props
 * @param {T[] | null} props.items - Array of items to display, null indicates loading/empty state
 * @param {(item: T) => string} props.getPrimaryText - Function to extract display text from each item
 * @param {(item: T) => void} [props.onClickItem] - Optional click handler for items
 * @param {string} [props.emptyMessage="No items found"] - Message shown when no items are available
 *
 * @returns {JSX.Element} A Material-UI List component or Typography component for empty state
 *
 * @example
 * ```
 * // Basic usage with string array
 * <ItemList
 *   items={['Item 1', 'Item 2', 'Item 3']}
 *   getPrimaryText={(item) => item}
 * />
 *
 * // Usage with custom object type
 * interface User {
 *   id: number;
 *   name: string;
 *   email: string;
 * }
 *
 * <ItemList<User>
 *   items={users}
 *   getPrimaryText={(user) => user.name}
 *   onClickItem={(user) => navigate(`/users/${user.id}`)}
 *   emptyMessage="No users available"
 * />
 *
 * // Loading state
 * <ItemList
 *   items={null}
 *   getPrimaryText={(item) => item.name}
 *   emptyMessage="Loading..."
 * />
 * ```
 *
 */
const ItemList = <T extends object>({
  items,
  getPrimaryText,
  onClickItem,
  emptyMessage = 'No items found',
}: ItemListProps<T>) => {
  if (!items || items.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary">
        {emptyMessage}
      </Typography>
    );
  }

  return (
    <Box>
      <List sx={{ width: 'fit-content' }}>
        {items.map((item, idx) => (
          <ListItem key={idx} disablePadding>
            <ListItemButton onClick={() => onClickItem?.(item)}>
              <ListItemIcon>
                <KeyboardArrowRightIcon />
              </ListItemIcon>
              <ListItemText
                primary={getPrimaryText(item)}
                slotProps={{
                  primary: { variant: 'body1', sx: { fontWeight: 'medium' } },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ItemList;
