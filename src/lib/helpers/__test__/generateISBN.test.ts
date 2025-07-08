import { vi } from 'vitest';
import { calculateISBN13Checksum, generateRandomISBN13 } from '@/lib/helpers/generateISBN.ts';
import { validateISBN } from '@/lib/helpers/validateISBN.ts';

vi.mock('@/lib/helpers/validateISBN.ts', () => ({
  validateISBN: vi.fn(),
}));

describe('generateRandomISBN13', () => {
  const mockedValidateISBN = vi.mocked(validateISBN);

  beforeEach(() => {
    vi.mocked(validateISBN).mockReturnValue(true);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns a string of length 13 digits', () => {
    const isbn = generateRandomISBN13();
    expect(isbn).toMatch(/^\d{13}$/);
    expect(isbn).toHaveLength(13);
  });

  it('begins with 978 or 979', () => {
    for (let i = 0; i < 50; i++) {
      const isbn = generateRandomISBN13();
      expect(isbn.startsWith('978') || isbn.startsWith('979')).toBe(true);
      expect(() => generateRandomISBN13()).not.toThrow();
    }
  });

  it('always passes validateISBN', () => {
    const isbn = generateRandomISBN13();
    expect(mockedValidateISBN).toHaveBeenCalledWith(isbn);
    expect(mockedValidateISBN(isbn)).toBe(true);
  });

  it('throws an error when isbn12 length is different than 12', () => {
    const tooShort = `12345678901`;
    const tooLong = '1234567890123';
    expect(() => calculateISBN13Checksum(tooShort)).toThrow(
      'Invalid digits length: expected 12, got 11',
    );
    expect(() => calculateISBN13Checksum(tooLong)).toThrow(
      'Invalid digits length: expected 12, got 13',
    );
  });

  it('throws an error when validateISBN returns false', () => {
    mockedValidateISBN.mockReturnValue(false);
    expect(() => generateRandomISBN13()).toThrow('Invalid ISBN');
  });

  it('correctly calculates the checksum for the example ISBN-12', async () => {
    const { calculateISBN13Checksum } = await import('@/lib/helpers/generateISBN.ts');
    const isbn12 = '978030640615';
    const checksum = calculateISBN13Checksum(isbn12);
    expect(checksum).toBe(7);
  });
});
