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
 * const digits = [0, 3, 1, 7, 8, 4, 7];
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
