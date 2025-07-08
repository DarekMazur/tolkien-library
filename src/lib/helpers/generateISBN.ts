import { validateISBN } from '@/lib/helpers/validateISBN.ts';

export const calculateISBN13Checksum = (isbn12: string) => {
  const digits = isbn12.split('').map(Number);
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    sum += digits[i] * (i % 2 === 0 ? 1 : 3);
  }
  return (10 - (sum % 10)) % 10;
};

export const generateRandomISBN13 = () => {
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
