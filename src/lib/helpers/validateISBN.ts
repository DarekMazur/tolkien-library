const ISBN_UNIVERSAL = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d\s-]+$/;

export const validateISBN = (isbn: string): boolean => {
  if (!ISBN_UNIVERSAL.test(isbn)) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(isbn[i]) * (i % 2 === 0 ? 1 : 3);
  }

  const checksum = (10 - (sum % 10)) % 10;
  return checksum === parseInt(isbn[12]);
};
