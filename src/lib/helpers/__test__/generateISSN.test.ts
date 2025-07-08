import { vi } from 'vitest';
import { generateBaseDigits, generateISSN } from '@/lib/helpers/generateISSN.ts';
import { validateISSN } from '@/lib/helpers/validateISSN.ts';
import { calculateCheckDigit } from '@/lib/utils/calculateCheckDigit.ts';

vi.mock('@/lib/helpers/validateISSN.ts', () => ({
  validateISSN: vi.fn(),
}));

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

  it('throws an error when validateISSN returns false', () => {
    mockedValidateISSN.mockReturnValue(false);
    expect(() => generateISSN()).toThrow('Invalid ISSN');
  });
});
