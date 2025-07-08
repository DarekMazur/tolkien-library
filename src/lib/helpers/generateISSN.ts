import { validateISSN } from '@/lib/helpers/validateISSN.ts';
import { calculateCheckDigit } from '@/lib/helpers/calculateCheckDigit.ts';

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
