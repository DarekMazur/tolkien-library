import { faker } from '@faker-js/faker';

import { factory, primaryKey, nullable, oneOf } from '@mswjs/data';

faker.seed(23456);

export const db = factory({
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
});
