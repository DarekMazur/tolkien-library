import { calculateCheckDigit, validateISSN } from '../validateISSN.ts';

const validISSN = ['0317-8471', '03178471', '2434-561X'];

const invalidISSN = [
  '2434-561x', // incorrect lowercase X
  '123-4567', // invalid - too short - format
  'ABCD-EFGH', // invalid characters
  '0317-8472', // invalid checksum
  12345678, // param is not string
];

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
});

describe('validateISSN – valid ISSN data', () => {
  it.each(validISSN)('valid ISSN %s', (issn) => {
    expect(validateISSN(issn)).toBe(true);
  });
});

describe('validateISSN – invalid ISSN data', () => {
  it.each(invalidISSN)('invalid ISSN %s', (issn) => {
    if (typeof issn === 'string') {
      expect(validateISSN(issn)).toBe(false);
    }
  });
});
