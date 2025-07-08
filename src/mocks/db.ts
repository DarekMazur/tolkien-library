import { faker } from '@faker-js/faker';

import { factory, primaryKey, nullable, oneOf, manyOf } from '@mswjs/data';

faker.seed(23456);

export const db = factory({
  identity: {
    id: primaryKey(faker.string.uuid),
    adminContact: {
      name: () => faker.lorem.word(),
      value: () => faker.internet.email(),
    },
  },
  page: {
    id: primaryKey(faker.string.uuid),
    title: () => faker.lorem.words({ min: 1, max: 2 }),
    slug: () => faker.lorem.words({ min: 1, max: 2 }),
    content: () => faker.lorem.paragraphs({ min: 1, max: 10 }),
    category: nullable(oneOf('category')),
  },
  category: {
    id: primaryKey(faker.string.uuid),
    title: () => faker.lorem.words({ min: 1, max: 2 }),
    slug: () => faker.lorem.words({ min: 1, max: 2 }),
    pages: manyOf('page'),
  },
  navigation: {
    id: primaryKey(faker.string.uuid),
    title: nullable(() => faker.lorem.words({ min: 1, max: 2 })),
    link: nullable(() => `/${faker.lorem.word()}`),
    isDivider: () => faker.datatype.boolean(),
  },
  role: {
    id: primaryKey(faker.number.int().toString),
    roleName: () => faker.lorem.words({ min: 1, max: 2 }),
    roleShorthand: () => faker.word.adjective({ strategy: 'shortest' }),
  },
  user: {
    id: primaryKey(faker.string.uuid),
    email: () => faker.internet.email(),
    emailVerified: () => faker.datatype.boolean(),
    userName: () => faker.person.firstName(),
    avatar: () => faker.image.avatar(),
    isBanned: () => faker.datatype.boolean(),
    role: oneOf('role'),
  },
  article: {
    id: primaryKey(faker.string.uuid),
    date: () => faker.date.recent(),
    category: nullable(() => faker.lorem.word()),
    content: () => faker.lorem.paragraphs({ min: 1, max: 10 }),
  },
  translator: {
    id: primaryKey(faker.string.uuid),
    firstName: () => faker.person.firstName(),
    lastName: () => faker.person.lastName(),
    description: () => faker.lorem.paragraph(),
  },
  publisher: {
    id: primaryKey(faker.string.uuid),
    title: () => faker.lorem.words({ min: 1, max: 2 }),
    description: () => faker.lorem.paragraph(),
  },
  book: {
    id: primaryKey(faker.string.uuid),
    originalTitle: nullable(() => faker.lorem.words({ min: 1, max: 4 })),
    polishTitle: () => faker.lorem.words({ min: 1, max: 4 }),
    author: nullable(() => faker.person.fullName()),
    translator: oneOf('translator'),
    publisher: oneOf('publisher'),
    year: () => Number(faker.date.past().getFullYear()),
    publicationNumber: () => faker.number.int({ min: 1, max: 5 }),
    cover: nullable(() => faker.lorem.words({ min: 1, max: 2 })),
    series: nullable(() => faker.lorem.words({ min: 1, max: 2 })),
    isbn: () => faker.number.int().toString(),
  },
  publication: {
    id: primaryKey(faker.string.uuid),
    title: () => faker.lorem.words({ min: 1, max: 4 }),
    author: () => faker.person.fullName(),
    publisher: oneOf('publisher'),
    year: () => faker.date.past().getFullYear().toString(),
    isbn: nullable(() => faker.number.int().toString()),
    issn: nullable(() => faker.number.int().toString()),
    description: () => faker.lorem.paragraph(),
  },
});
