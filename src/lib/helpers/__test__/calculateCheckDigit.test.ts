import { calculateCheckDigit } from '@/lib/helpers/calculateCheckDigit.ts';

describe('calculateCheckDigit', () => {
  it('should return “0” when weighted sum % 11 === 0', () => {
    expect(calculateCheckDigit([0, 0, 0, 0, 0, 0, 0])).toBe('0');
  });

  it('should return a check digit 1-9 for r ∈ 1..10 and 11-r < 10', () => {
    expect(calculateCheckDigit([0, 3, 1, 7, 8, 4, 7])).toBe('1');
  });

  it('should return “X” when 11-r === 10', () => {
    expect(calculateCheckDigit([0, 0, 0, 0, 0, 0, 6])).toBe('X');
  });

  it('should handle max digits with max weights', () => {
    expect(calculateCheckDigit([9, 9, 9, 9, 9, 9, 9])).toBe('4');
  });

  it('should throw if digits array length is not 7', () => {
    expect(() => calculateCheckDigit([1, 2, 3, 4, 5, 6])).toThrow();
    expect(() => calculateCheckDigit([1, 2, 3, 4, 5, 6, 7, 8])).toThrow();
  });
});
