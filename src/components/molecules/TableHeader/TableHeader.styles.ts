import { theme } from '@/lib/theme.tsx';

export const styledSort = {
  color: theme.palette.secondary.main,
  '& .MuiTableSortLabel-icon': {
    color: `${theme.palette.secondary.main} !important`,
  },
  '&:hover': {
    color: `${theme.palette.secondary.main} !important`,
    opacity: '0.7',
  },
  '&.Mui-active': {
    color: `${theme.palette.secondary.main} !important`,
  },
};
