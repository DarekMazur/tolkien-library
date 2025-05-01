import { faker } from '@faker-js/faker';
import { handlers } from './handlers';
import { db } from './db.ts';
import { setupWorker } from 'msw/browser';

declare global {
  interface Window {
    mocks: unknown;
  }
}

export const worker = setupWorker(...handlers);

worker.events.on('request:start', ({ request }) => {
  console.log('MSW intercepted:', request.method, request.url);
});

const createNavigation = () => {
  db.navigation.create({
    title: 'News',
    link: `/`,
    isDivider: false,
  });

  db.navigation.create({
    title: 'Attached',
    link: `/articles`,
    isDivider: false,
  });

  db.navigation.create({
    title: null,
    link: null,
    isDivider: true,
  });

  const size = faker.number.int({ min: 7, max: 13 });

  for (let i = 0; i < size; i += 1) {
    const isDivider =
      i === size - 2 ? true : i === size - 1 ? false : faker.datatype.boolean({ probability: 0.2 });

    db.navigation.create({
      title: isDivider ? null : i === size - 1 ? 'Contact' : faker.lorem.words({ min: 1, max: 2 }),
      link: isDivider ? null : i === size - 1 ? '/contact' : `/${faker.lorem.word()}`,
      isDivider,
    });
  }
};

const createArticles = () => {
  const articlesLength = faker.number.int({ min: 7, max: 13 });

  const CATEGORIES = [
    faker.lorem.word(),
    faker.lorem.word(),
    faker.lorem.word(),
    faker.lorem.word(),
    faker.lorem.word(),
  ];

  const generateAlertBlock = (): string => {
    const type = faker.helpers.arrayElement(['info', 'warning', 'danger']);
    return `<div class='${type}'>${faker.lorem.paragraph()}</div>`;
  };

  const generateTable = (): string => {
    const headers = Array.from({ length: 3 }, () => faker.lorem.word());
    const rows = Array.from({ length: 3 }, () =>
      Array.from({ length: 3 }, () => faker.lorem.word()),
    );

    return [
      `| ${headers.join(' | ')} |`,
      `| ${headers.map(() => '---').join(' | ')} |`,
      ...rows.map((row) => `| ${row.join(' | ')} |`),
    ].join('\n');
  };

  const generateQuote = (paragraphs: number) => {
    if (faker.datatype.boolean({ probability: 0.6 })) {
      return `> ${faker.lorem.sentences(paragraphs)}`;
    }
  };

  const generateContent = (): string => {
    const elements = [
      faker.lorem.paragraphs(faker.number.int({ min: 1, max: 3 })),
      `- ${Array.from({ length: 3 }, () => faker.lorem.word()).join('\n- ')}`,
      `1. ${Array.from({ length: 3 }, () => faker.lorem.word()).join('\n1. ')}`,
      `> ${faker.lorem.sentence()}`,
      generateQuote(faker.number.int({ min: 1, max: 3 })),
      generateTable(),
      `[${faker.lorem.words(2)}](${faker.internet.url()})`,
      generateAlertBlock(),
    ];

    return faker.helpers.arrayElements(elements, { min: 3, max: 5 }).join('\n\n');
  };

  const usedCategories = new Set<string>();

  for (let i = 0; i < articlesLength; i += 1) {
    const date = faker.date.recent();
    const category = faker.helpers.maybe(
      () => {
        const cat = faker.helpers.arrayElement(CATEGORIES);
        usedCategories.add(cat);
        return cat;
      },
      { probability: 0.7 },
    );

    db.articles.create({
      id: faker.string.uuid(),
      date,
      category,
      content: generateContent(),
    });
  }
};

createNavigation();
createArticles();

window.mocks = {
  getNav: () => db.navigation.getAll(),
  getNews: () => db.articles.getAll(),
};
