import { format, isToday, isYesterday } from 'date-fns';
import { pl } from 'date-fns/locale';

/**
 * Formats a given date as a string.
 * Returns 'today' if the date is today,
 * 'yesterday' if the date is yesterday,
 * otherwise returns the date formatted as 'd MMMM yyyy HH:mm' in Polish locale.
 *
 * @param {Date} date - The date object to format.
 * @returns {string} The formatted date string.
 */

export const formatDate = (date: Date): string => {
  if (isToday(date)) {
    return 'today';
  }

  if (isYesterday(date)) {
    return 'yesterday';
  }

  return format(date, 'd MMMM yyyy HH:mm', { locale: pl });
};
