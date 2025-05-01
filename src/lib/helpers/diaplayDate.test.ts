import { describe, it, expect } from 'vitest';
import { displayDate } from './displayDate';

describe('displayDate', () => {
  it('formats correctly date with one and two digit months', () => {
    expect(displayDate(new Date(2024, 0, 3))).toBe('3.01.2024');
    expect(displayDate(new Date(2024, 9, 13))).toBe('13.10.2024');
  });

  it('adds zero to single-digit months', () => {
    expect(displayDate(new Date(2024, 1, 5))).toBe('5.02.2024');
  });

  it('does not add zero to two-digit months', () => {
    expect(displayDate(new Date(2024, 10, 15))).toBe('15.11.2024');
  });

  it('handles correctly different years', () => {
    expect(displayDate(new Date(1999, 2, 1))).toBe('1.03.1999');
    expect(displayDate(new Date(2025, 11, 31))).toBe('31.12.2025');
  });

  it('works correctly for a Date object passed as a string', () => {
    expect(displayDate(new Date('2022-07-07'))).toBe('7.07.2022');
  });

  it('Returns “NaN.NaN.NaN” for an invalid date', () => {
    expect(displayDate(new Date('invalid-date'))).toBe('NaN.NaN.NaN');
  });
});
