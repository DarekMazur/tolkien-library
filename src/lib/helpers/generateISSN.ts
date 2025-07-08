import { validateISSN } from '@/lib/helpers/validateISSN.ts';

/**
 * Calculates the check digit for the ISSN according to the ISO 3297 standard.
 *
 * The algorithm uses weights [8, 7, 6, 5, 4, 3, 2] for the first seven digits,
 * and then calculates the check digit based on the remainder of dividing by 11.
 *
 * @param digits - An array of seven digits of the ISSN (without check digit).
 * @returns Check a digit as a string (‘0’-'9' or ‘X’ for a value of 10).
 *
 * @example
 * ```
 * const digits = [1];
 * const checkDigit = calculateCheckDigit(digits);
 * console.log(checkDigit); // => ‘1’
 * ```
 *
 * @throws {Error} When the array does not contain exactly 7 elements.
 */

export const calculateCheckDigit = (digits: number[]): string => {
  if (digits.length !== 7) {
    throw new Error(`Invalid digits length: expected 7, got ${digits.length}`);
  }

  const weights = [8, 7, 6, 5, 4, 3, 2];
  const sum = digits.reduce((acc, digit, idx) => acc + digit * weights[idx], 0);
  const remainder = sum % 11;

  if (remainder === 0) {
    return '0';
  }

  const check = 11 - remainder;
  return check === 10 ? 'X' : String(check);
};

/**
 * Generate the first seven digits of ISSN
 *
 * @returns array of numbers with length === 7
 *
 * @example
 * ```
 * const digits = generateBaseDigits()
 * console.log(digits) // => [0, 1, 2, 3, 4, 5, 6, 7]
 * ```
 */

export const generateBaseDigits = () => {
  const digits: number[] = [];
  for (let i = 0; i < 7; i++) {
    digits.push(Math.floor(Math.random() * 10));
  }
  return digits;
};

/**
 * Generate the ISSN according to the ISO 3297 standard.
 *
 * Use generateBaseDigits() to get ISSN prefix.
 * Calculate checksum using calculateCheckDigit()
 * Reformat results to format XXXX-XXXC.
 *
 * @example
 * ```
 * const issn = generateISSN()
 * console.log(issn) // => '0317-8471'
 * ```
 *
 * @throws {Error}
 * Throws if the generated ISBN fails validation by `validateISSN`.
 */

export const generateISSN = () => {
  const baseDigits = generateBaseDigits();
  const checkDigit = calculateCheckDigit(baseDigits);
  const formattedBase = baseDigits.join('').replace(/\d{4}(?=\d{3}$)/, '$&-');

  const issn = `${formattedBase}${checkDigit}`;

  if (!validateISSN(issn)) {
    throw new Error('Invalid ISSN format or checksum');
  }
  return issn;
};
