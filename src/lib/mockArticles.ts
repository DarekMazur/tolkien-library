import { faker } from '@faker-js/faker';

interface NewsEntry {
  id: string;
  date: Date;
  category?: string;
  content: string;
}

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
  const rows = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => faker.lorem.word()));

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

export const generateMockNews = (count: number): NewsEntry[] => {
  const usedCategories = new Set<string>();

  return Array.from({ length: count }, () => {
    const date = faker.date.recent();
    const category = faker.helpers.maybe(
      () => {
        const cat = faker.helpers.arrayElement(CATEGORIES);
        usedCategories.add(cat);
        return cat;
      },
      { probability: 0.7 },
    );

    return {
      id: faker.string.uuid(),
      date,
      category,
      content: generateContent(),
    };
  }).filter(() => usedCategories.size === CATEGORIES.length || Math.random() > 0.3);
};

export const displayDate = (date: Date) => {
  return `${new Date(date).getDate()}.${new Date(date).getMonth() + 1}.${new Date(date).getFullYear()}`;
};
