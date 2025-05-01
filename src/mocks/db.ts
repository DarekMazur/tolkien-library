import { faker } from '@faker-js/faker';

import { factory, primaryKey, nullable } from '@mswjs/data';

faker.seed(12356);

export const db = factory({
  navigation: {
    id: primaryKey(faker.string.uuid),
    title: nullable(() => faker.lorem.words({ min: 1, max: 2 })),
    link: nullable(() => `/${faker.lorem.word()}`),
    isDivider: () => faker.datatype.boolean(),
  },
  articles: {
    id: primaryKey(faker.string.uuid),
    date: () => faker.date.recent(),
    category: nullable(() => faker.lorem.word()),
    content: () => faker.lorem.paragraphs({ min: 1, max: 10 }),
  },
});
