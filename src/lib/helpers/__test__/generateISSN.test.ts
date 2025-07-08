import { vi } from 'vitest';
import {
  calculateCheckDigit,
  generateBaseDigits,
  generateISSN,
} from '@/lib/helpers/generateISSN.ts';
import { validateISSN } from '@/lib/helpers/validateISSN.ts';

vi.mock('@/lib/helpers/validateISSN.ts', () => ({
  validateISSN: vi.fn(),
}));

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

describe('generateBaseDigits', () => {
  it('should return an array of length 7', () => {
    const digits = generateBaseDigits();
    expect(Array.isArray(digits)).toBe(true);
    expect(digits).toHaveLength(7);
  });

  it('should generate only integers between 0 and 9 inclusive', () => {
    const digits = generateBaseDigits();
    digits.forEach((d) => {
      expect(Number.isInteger(d)).toBe(true);
      expect(d).toBeGreaterThanOrEqual(0);
      expect(d).toBeLessThanOrEqual(9);
    });
  });

  it('should generate expected digits sequence when Math.random is mocked', () => {
    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0.0)
      .mockReturnValueOnce(0.1)
      .mockReturnValueOnce(0.2)
      .mockReturnValueOnce(0.3)
      .mockReturnValueOnce(0.4)
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.9);

    const digits = generateBaseDigits();
    expect(digits).toEqual([0, 1, 2, 3, 4, 5, 9]);

    vi.restoreAllMocks();
  });

  it('should return a new array instance on each call', () => {
    const a = generateBaseDigits();
    const b = generateBaseDigits();
    expect(a).not.toBe(b);
  });
});

describe('generateISSN', () => {
  const mockedValidateISSN = vi.mocked(validateISSN);

  beforeEach(() => {
    vi.mocked(validateISSN).mockReturnValue(true);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should generate an ISSN matching pattern "####-###C"', () => {
    const issn = generateISSN();
    expect(issn).toMatch(/^[0-9]{4}-[0-9]{3}[0-9X]$/);
    expect(issn).toHaveLength(9);
  });

  it('should have a valid check digit as per calculateCheckDigit', () => {
    const issn = generateISSN();
    const digits = issn
      .replace('-', '')
      .split('')
      .slice(0, 7)
      .map((ch) => parseInt(ch, 10));
    const expectedCheck = calculateCheckDigit(digits);
    const actualCheck = issn.charAt(issn.length - 1);
    expect(actualCheck).toBe(expectedCheck);
  });

  it('should generate unique ISSNs on multiple calls', () => {
    const set = new Set<string>();
    for (let i = 0; i < 100; i++) {
      set.add(generateISSN());
    }
    expect(set.size).toBeGreaterThan(1);
  });

  it('always passes validateISSN', () => {
    const issn = generateISSN();
    expect(mockedValidateISSN).toHaveBeenCalledWith(issn);
    expect(mockedValidateISSN(issn)).toBe(true);
  });

  it('throws an error when validateISBN returns false', () => {
    mockedValidateISSN.mockReturnValue(false);
    expect(() => generateISSN()).toThrow('Invalid ISSN');
  });
});
