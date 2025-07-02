import { validateISBN } from '../validateISBN';

const validIsbns13 = ['9780596528126', '9781788399081', '9791302341083', '978-0-596-52812-6'];

const invalidChecksum13 = ['9780596528120', '9781788399083'];

const validIsbns10 = ['0596528124', '0140449116', '0-306-40615-2'];

const invalidChecksum10 = ['9780596528', '1257561033', '1-56619-909-9'];

const edgeCases: [string, boolean][] = [
  ['ABCDEF', false], //letters
  ['', false], //empty string
  ['973-0-596-52812-6', false], //invalid checksum
  ['978-1-56619-909-4 2', false], //additional chars
  ['9711234567894', false], //invalid format - incorrect prefix 971
];

describe('validateISBN – valid ISBN-13 data', () => {
  it.each(validIsbns13)('valid ISBN-13 %s', (isbn) => {
    expect(validateISBN(isbn)).toBe(true);
  });
});

describe('validateISBN – valid ISBN-10 data', () => {
  it.each(validIsbns10)('valid ISBN-10 %s', (isbn) => {
    expect(validateISBN(isbn)).toBe(true);
  });
});

describe('validateISBN – incorrect ISBN-13 checksum', () => {
  it.each(invalidChecksum13)('invalid ISBN-13 %s', (isbn) => {
    expect(validateISBN(isbn)).toBe(false);
  });
});

describe('validateISBN – incorrect ISBN-10 checksum', () => {
  it.each(invalidChecksum10)('invalid ISBN-10 %s', (isbn) => {
    expect(validateISBN(isbn)).toBe(false);
  });
});

describe('validateISBN – edge and format cases', () => {
  it.each(edgeCases)('ISBN %s → %s', (isbn, expected) => {
    expect(validateISBN(isbn)).toBe(expected);
  });
});
