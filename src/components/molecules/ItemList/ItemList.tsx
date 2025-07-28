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

interface ItemListProps<Item> {
  items: Item[] | null;
  getPrimaryText: (item: Item) => string;
  onClickItem?: (item: Item) => void;
  emptyMessage?: string;
  header?: string;
}

export const ItemList = <T extends object>({
  items,
  getPrimaryText,
  onClickItem,
  emptyMessage = 'No items found',
  header,
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
      {header && (
        <Typography variant="h3" component="h2" sx={{ pt: 4, pb: 2 }}>
          {header}
        </Typography>
      )}
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
