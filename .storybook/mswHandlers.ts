import { EPublicationType } from '@/lib/types';
import { faker } from '@faker-js/faker';
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

const publicationsMock = [
  {
    id: faker.string.uuid(),
    title: 'Inklingowie : C. S. Lewis, J. R. R. Tolkien, Charles Williams i ich przyjaciele',
    type: EPublicationType.PARTIAL,
    author: 'Humphrey Carpenter',
    publisher: {
      title: 'Zysk i S-ka',
      description: '',
      id: faker.string.uuid(),
    },
    issn: '83-7150-663-5',
    year: '1999',
    description: '',
  },
  {
    id: faker.string.uuid(),
    title: 'Bóg artystów XX wieku',
    type: EPublicationType.INCLUDING,
    author: 'red. Dariusz Kulesza, Marcin Lula, Marta Sawicka',
    publisher: {
      title: 'Wydawnictwo Uniwersytetu w Białymstoku',
      description: '',
      id: faker.string.uuid(),
    },
    issn: '83-89031-45-0',
    year: '2003',
    description: '',
  },
  {
    id: faker.string.uuid(),
    title: 'Tolkien i C. S. Lewis : historia niezwykłej przyjaźni',
    type: EPublicationType.PARTIAL,
    author: 'Colin Duriez',
    publisher: {
      title: 'M',
      description: '',
      id: faker.string.uuid(),
    },
    issn: '978-83-7595-037-3',
    year: '2011',
    description: '',
  },
  {
    id: faker.string.uuid(),
    title: 'Anthropos? PODRÓŻ DO ŹRÓDŁA',
    type: EPublicationType.EPUB,
    author: 'Rafał Kowalski',
    publisher: {
      title: 'Wydział Filologiczny, Uniwersytet Śląski w Katowicach',
      description: '',
      id: faker.string.uuid(),
    },
    issn: '1730-9549',
    year: '26/2017',
    description: '(artykuł) Wyprawa do źródła magii w Śródziemiu',
  },
  {
    id: faker.string.uuid(),
    title:
      'Quaestiones Oralitatis II 2, Kultury oralne a mityczny świat J.R.R. Tolkiena i jego następców',
    type: EPublicationType.INCLUDING,
    author: 'red. Karol Zieliński',
    publisher: {
      title: 'Pracownia Badań nad Tradycją Oralną, Uniwersytet Wrocławski',
      description: '',
      id: faker.string.uuid(),
    },
    issn: '2449–8181',
    year: '2/II 2016',
    description: '',
  },
  {
    id: faker.string.uuid(),
    title: 'Światotwórstwo w fantastyce. Od przedstawienia do zamieszkiwania',
    type: EPublicationType.INCLUDING,
    author: 'Krzysztof M. Maj',
    publisher: {
      title: 'Universitas',
      description: '',
      id: faker.string.uuid(),
    },
    issn: '97883-242-3613-8',
    year: '2019',
    description: '',
  },
];

const STSKF = {
  id: faker.string.uuid(),
  title: 'Sekcja Tolkienowska Śląskiego Klubu Fantastyki',
  description: '',
};

const fanzinMock = [
  {
    id: faker.string.uuid(),
    title: 'Aiglos',
    version: 'Papier',
    publisher: STSKF,
    numbers: '26',
    startDate: new Date('2004'),
    lastIssueDate: new Date('2024'),
  },
  {
    id: faker.string.uuid(),
    title: 'Simbelmynë',
    version: 'Papier',
    publisher: STSKF,
    numbers: '31',
    startDate: new Date('1997'),
    lastIssueDate: new Date('2019'),
  },
  {
    id: faker.string.uuid(),
    title: 'Gwaihir',
    version: 'Papier',
    publisher: STSKF,
    numbers: '11',
    startDate: new Date('1984'),
    lastIssueDate: new Date('2024'),
  },
  {
    id: faker.string.uuid(),
    title: 'Gwaihirzę',
    version: 'Papier',
    publisher: STSKF,
    numbers: '95',
    startDate: new Date('1989'),
    lastIssueDate: new Date('1997'),
  },
  {
    id: faker.string.uuid(),
    title: 'Little Gwaihir',
    version: 'Papier',
    publisher: STSKF,
    numbers: '100+',
    startDate: new Date('1989'),
    lastIssueDate: null,
  },
];

const faneditionMock = [
  {
    id: faker.string.uuid(),
    title: 'Syn Gondoru (wyd I )',
    isMumakil: true,
    year: 2006,
    description: 'fanfick Katarzyny Chmiel-Gugulskiej',
  },
  {
    id: faker.string.uuid(),
    title: 'Narn e-Rach Morgoth',
    isMumakil: true,
    year: 2007,
    description: 'Opowieść o Klątwie Morgotha/ alternatywa dla Dzieci Húrina',
  },
  {
    id: faker.string.uuid(),
    title: 'Inne umysły, serca i dłonie - I tom',
    isMumakil: true,
    year: 2008,
    description: 'Antologia tekstów i ilustracji inspirowanych twórczością J.R.R. Tolkiena',
  },
  {
    id: faker.string.uuid(),
    title: 'Słownik Sindarinu',
    year: 2000,
    desription:
      'Słownik języka Elfów Szarych opracowany na podstawie pism Profesora Johna Ronalda Reula Tolkiena',
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

export const publicationsHandler = http.get('/api/publications', () => {
  return HttpResponse.json(publicationsMock);
});

export const fanzinHandler = http.get('/api/fanzin', () => {
  return HttpResponse.json(fanzinMock);
});

export const faneditionHandler = http.get('/api/faneditions', () => {
  return HttpResponse.json(faneditionMock);
});

export const handlers = [
  navigationHandler,
  articlesHandler,
  pagesHandler,
  booksHandler,
  publicationsHandler,
  fanzinHandler,
  faneditionHandler,
];
