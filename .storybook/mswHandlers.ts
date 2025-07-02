import { http, HttpResponse } from 'msw';

const navigationMock = [
  { id: '1', title: 'Strona główna', link: '/', isDivider: false },
  { id: '2', title: 'Produkty', link: '/products', isDivider: false },
  { id: '3', isDivider: true },
  { id: '4', title: 'O nas', link: '/about', isDivider: false },
  { id: '5', title: 'Kontakt', link: '/contact', isDivider: false },
];

const pageMock = [
  {
    id: 'default',
    title: 'Default Storybook Page',
    slug: 'default',
    content: '# Default Content\n\nThis is the default content.',
  },
];

const booksMock = [
  {
    id: '1',
    originalTitle: 'The Hobbit',
    polishTitle: 'Hobbit, czyli tam i z powrotem',
    author: 'J.R.R. Tolkien',
    translator: {
      firstName: 'Marek',
      lastName: 'Oramus',
      id: 'marekormus',
      description: '',
    },
    publisher: {
      title: 'Rebis',
      id: 'rebis',
      description: '',
    },
    year: 2020,
    publicationNumber: 5,
    cover: 'Miękka',
    series: 'Middle-earth',
    isbn: '9781234567897',
  },
  {
    id: '2',
    originalTitle: 'The Lord of the Rings',
    polishTitle: 'Władca Pierścieni',
    author: 'J.R.R. Tolkien',
    translator: {
      firstName: 'Marek',
      lastName: 'Oramus',
      id: 'marekormus',
      description: '',
    },
    publisher: {
      title: 'Rebis',
      id: 'rebis',
      description: '',
    },
    year: 2019,
    publicationNumber: 3,
    cover: 'Twarda',
    series: 'Middle-earth',
    isbn: '9781234567890',
  },
  {
    id: '3',
    originalTitle: 'Unfinished Tales',
    polishTitle: 'Niedokończone opowieści',
    author: 'J.R.R. Tolkien',
    translator: {
      firstName: 'Marek',
      lastName: 'Oramus',
      id: 'marekormus',
      description: '',
    },
    publisher: {
      title: 'Rebis',
      id: 'rebis',
      description: '',
    },
    year: 2021,
    publicationNumber: 2,
    cover: 'Miękka',
    series: null,
    isbn: '123INVALID',
  },
  {
    id: '4',
    originalTitle: 'The Silmarillion',
    polishTitle: 'Silmarillion',
    author: 'J.R.R. Tolkien',
    translator: {
      firstName: 'Joanna',
      lastName: 'Kokot',
      id: 'joannakokot',
      description: '',
    },
    publisher: {
      title: 'Amber',
      id: 'amber',
      description: '',
    },
    year: 2022,
    publicationNumber: 1,
    cover: 'Twarda',
    series: 'Middle-earth',
    isbn: '9780123456789',
  },
  {
    id: '5',
    originalTitle: 'The Children of Húrin',
    polishTitle: 'Dzieci Húrina',
    author: 'J.R.R. Tolkien',
    translator: {
      firstName: 'Joanna',
      lastName: 'Kokot',
      id: 'joannakokot',
      description: '',
    },
    publisher: {
      title: 'Amber',
      id: 'amber',
      description: '',
    },
    year: 2018,
    publicationNumber: 7,
    cover: 'Miękka',
    series: 'Middle-earth',
    isbn: '9780987654321',
  },
  {
    id: '6',
    originalTitle: 'Beren and Lúthien',
    polishTitle: 'Beren i Lúthien',
    author: 'J.R.R. Tolkien',
    translator: {
      firstName: 'Agnieszka',
      lastName: 'Sylwanowicz',
      id: 'agnieszkasylwanowicz',
      description: '',
    },
    publisher: {
      title: 'Rebis',
      id: 'rebis',
      description: '',
    },
    year: 2017,
    publicationNumber: 4,
    cover: 'Twarda',
    series: 'Middle-earth',
    isbn: '9781111111111',
  },
];

export const navigationHandler = http.get('/api/navigation', () => {
  return HttpResponse.json(navigationMock);
});

export const articlesHandler = http.get('/api/articles', () => {
  return HttpResponse.json();
});

export const pagesHandler = http.get('/api/pages/:slug', () => {
  return HttpResponse.json(pageMock);
});

export const booksHandler = http.get('/api/books', () => {
  return HttpResponse.json(booksMock);
});

export const handlers = [navigationHandler, articlesHandler, pagesHandler, booksHandler];
