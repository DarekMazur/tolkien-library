import { calculateCheckDigit } from '@/lib/utils/calculateCheckDigit.ts';

export const validateISSN = (issn: string) => {
  const issnPattern = /^[0-9]{4}-[0-9]{3}[0-9X]$/;
  if (!issnPattern.test(issn.trim())) {
    return false;
  }

  const cleanISSN = issn.trim().toUpperCase();

  const digitsOnly = cleanISSN.replace(/-/g, '');

  const firstSevenDigits = digitsOnly.substring(0, 7);
  const checkDigit = digitsOnly.substring(7, 8);

  const expectedCheckDigit = calculateCheckDigit(firstSevenDigits.split('').map(Number));

  return checkDigit === expectedCheckDigit;
};
