import { vi } from 'vitest';
import { formatDate } from '../formatDate';

describe('formatDate', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2025, 7, 8, 16, 11, 0, 0));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('when the date is today', () => {
    it('should return “today” for the current date and time', () => {
      const today = new Date(2025, 7, 8, 16, 11);
      expect(formatDate(today)).toBe('today');
    });

    it('should return “today” for the start of today', () => {
      const startOfToday = new Date(2025, 7, 8, 0, 0);
      expect(formatDate(startOfToday)).toBe('today');
    });

    it('should return “today” for the end of today', () => {
      const endOfToday = new Date(2025, 7, 8, 23, 59, 59, 999);
      expect(formatDate(endOfToday)).toBe('today');
    });
  });

  describe('when the date is yesterday', () => {
    it("should return “yesterday” for yesterday's date", () => {
      const yesterday = new Date(2025, 7, 7, 12, 30);
      expect(formatDate(yesterday)).toBe('yesterday');
    });

    it('should return “yesterday” for the beginning of yesterday', () => {
      const startOfYesterday = new Date(2025, 7, 7, 0, 0);
      expect(formatDate(startOfYesterday)).toBe('yesterday');
    });

    it('should return “yesterday” for the end of yesterday', () => {
      const endOfYesterday = new Date(2025, 7, 7, 23, 59, 59, 999);
      expect(formatDate(endOfYesterday)).toBe('yesterday');
    });
  });

  describe('when the date is different days', () => {
    it('should return a formatted date for a future date', () => {
      const futureDate = new Date(2025, 7, 10, 14, 30);
      expect(formatDate(futureDate)).toBe('10 sierpnia 2025 14:30');
    });

    it('should return the formatted date for a date from a few days ago', () => {
      const pastDate = new Date(2025, 7, 5, 9, 15);
      expect(formatDate(pastDate)).toBe('5 sierpnia 2025 09:15');
    });

    it('should return a formatted date for a date from another month', () => {
      const differentMonth = new Date(2025, 6, 15, 18, 45);
      expect(formatDate(differentMonth)).toBe('15 lipca 2025 18:45');
    });

    it('should return the formatted date for the date from another year', () => {
      const differentYear = new Date(2024, 11, 25, 12, 0);
      expect(formatDate(differentYear)).toBe('25 grudnia 2024 12:00');
    });

    it('should correctly format the date with single digits for the day and time', () => {
      const singleDigitDate = new Date(2025, 2, 5, 8, 5);
      expect(formatDate(singleDigitDate)).toBe('5 marca 2025 08:05');
    });
  });

  describe('edge cases', () => {
    it('should handle the date at the beginning of the year', () => {
      const newYear = new Date(2025, 0, 1, 0, 0);
      expect(formatDate(newYear)).toBe('1 stycznia 2025 00:00');
    });

    it('should handle the date at the end of the year', () => {
      const endOfYear = new Date(2024, 11, 31, 23, 59);
      expect(formatDate(endOfYear)).toBe('31 grudnia 2024 23:59');
    });

    it('should handle leap years', () => {
      const leapYear = new Date(2024, 1, 29, 12, 0);
      expect(formatDate(leapYear)).toBe('29 lutego 2024 12:00');
    });
  });

  describe('parameter type validation', () => {
    it('should correctly handle the Date object', () => {
      const validDate = new Date(2025, 7, 1, 10, 30);
      expect(() => formatDate(validDate)).not.toThrow();
      expect(formatDate(validDate)).toBe('1 sierpnia 2025 10:30');
    });
  });
});
