export const calculateCheckDigit = (digits: number[]) => {
  const weights = [8, 7, 6, 5, 4, 3, 2];
  const sum = digits.reduce((acc, digit, idx) => acc + digit * weights[idx], 0);
  const remainder = sum % 11;

  if (remainder === 0) {
    return '0';
  }

  const check = 11 - remainder;
  return check === 10 ? 'X' : String(check);
};

export const validateISSN = (issn: string) => {
  const cleanISSN = issn.trim().toUpperCase();

  const issnPattern = /^[0-9]{4}-?[0-9]{3}[0-9X]$/;
  if (!issnPattern.test(cleanISSN)) {
    return false;
  }

  const digitsOnly = cleanISSN.replace('-', '');

  const firstSevenDigits = digitsOnly.substring(0, 7);
  const checkDigit = digitsOnly.substring(7, 8);

  const expectedCheckDigit = calculateCheckDigit(firstSevenDigits.split('').map(Number));

  return checkDigit === expectedCheckDigit;
};
