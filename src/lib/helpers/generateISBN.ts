import { validateISBN } from '@/lib/helpers/validateISBN.ts';

/**
 * Calculates the ISBN-13 checksum digit for a 12-digit ISBN prefix.
 *
 * This function applies the ISBN-13 weighting algorithm:
 * - Digits in odd positions (0-based index even) are multiplied by 1.
 * - Digits in even positions (0-based index odd) are multiplied by 3.
 * The checksum is the number that, when added to the weighted sum, makes it
 * a multiple of 10. If the weighted sum modulo 10 is 0, the checksum is 0.
 *
 * @param {string} isbn12
 *   A string of exactly 12 numeric characters representing the first
 *   twelve digits of an ISBN-13 code (e.g., "978030640615").
 * @returns {number}
 *   The computed checksum digit (0–9).
 * @throws {Error}
 *   Throws if `isbn12` contains non-digit characters or is not length 12.
 *
 * @example
 * calculateISBN13Checksum('978030640615'); // => 7
 */

export const calculateISBN13Checksum = (isbn12: string): number => {
  const digits = isbn12.split('').map(Number);
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    sum += digits[i] * (i % 2 === 0 ? 1 : 3);
  }
  return (10 - (sum % 10)) % 10;
};

/**
 * Generates a valid random ISBN-13 string.
 *
 * This function constructs a 13-digit ISBN by:
 * 1. Randomly choosing a prefix of "978" or "979".
 * 2. Appending nine random digits (0–9).
 * 3. Calculating the checksum digit via `calculateISBN13Checksum`.
 * 4. Concatenating the checksum and validating the final ISBN string.
 *
 * @returns {string}
 *   A valid ISBN-13 string of length 13, e.g., "9781234567897".
 * @throws {Error}
 *   Throws if the generated ISBN fails validation by `validateISBN`.
 *
 * @example
 * // Might return "9790123456784"
 * const isbn = generateRandomISBN13();
 * console.log(isbn); // => "979XXXXXXXXXX"
 */

export const generateRandomISBN13 = (): string => {
  let isbn = Math.random() < 0.5 ? '978' : '979';

  for (let i = 0; i < 9; i++) {
    isbn += Math.floor(Math.random() * 10);
  }

  const checksum = calculateISBN13Checksum(isbn);

  const finalISBN = isbn + checksum;

  if (!validateISBN(finalISBN)) {
    throw new Error('Invalid ISBN');
  }

  return finalISBN;
};
