import { format, isToday, isYesterday } from 'date-fns';
import { pl } from 'date-fns/locale';

export const formatDate = (date: Date): string => {
  if (isToday(date)) {
    return 'today';
  }

  if (isYesterday(date)) {
    return 'yesterday';
  }

  return format(date, 'd MMMM yyyy HH:mm', { locale: pl });
};
