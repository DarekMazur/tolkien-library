const ISBN_UNIVERSAL = /^(?:(?:\d[-\s]?){9}[\dX]|(?:97[89])(?:[-\s]?\d){10})$/i;

export const validateISBN = (isbn: string): boolean => {
  if (!ISBN_UNIVERSAL.test(isbn)) {
    return false;
  }

  const cleanISBN = isbn.replace(/[^\dX]/g, '').toUpperCase();

  let sum = 0;
  const versionISBN = cleanISBN.length;

  if (versionISBN === 10) {
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanISBN[i]) * (10 - i);
    }

    const lastChar = cleanISBN[9];
    const checksum = lastChar === 'X' ? 10 : parseInt(lastChar);
    sum += checksum;

    return sum % 11 === 0;
  }

  for (let i = 0; i < versionISBN - 1; i++) {
    sum += parseInt(cleanISBN[i]) * (i % 2 === 0 ? 1 : 3);
  }

  const checksum = (10 - (sum % 10)) % 10;
  return checksum === parseInt(cleanISBN[12]);
};
