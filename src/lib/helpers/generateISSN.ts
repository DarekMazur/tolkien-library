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

export const generateBaseDigits = () => {
  const digits = [];
  for (let i = 0; i < 7; i++) {
    digits.push(Math.floor(Math.random() * 10));
  }
  return digits;
};

export const generateISSN = () => {
  const baseDigits = generateBaseDigits();
  const checkDigit = calculateCheckDigit(baseDigits);
  const formattedBase = baseDigits.join('').replace(/^(\d{4})(\d{3})$/, '$1-$2');
  return `${formattedBase}${checkDigit}`;
};
