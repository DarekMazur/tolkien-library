import { faker } from '@faker-js/faker';
import { handlers } from './handlers';
import { db } from './db.ts';
import { setupWorker } from 'msw/browser';
import { IUser } from '@/lib/types';
import { createSlug } from '@/lib/helpers/createSlug.ts';
import { generateRandomISBN13 } from '@/lib/helpers/generateISBN.ts';
import { generateISSN } from '@/lib/helpers/generateISSN.ts';

declare global {
  interface Window {
    mocks: unknown;
  }
}

export const worker = setupWorker(...handlers);

worker.events.on('request:start', ({ request }) => {
  console.log('MSW intercepted:', request.method, request.url);
});

const generateAlertBlock = (type: string): string => {
  return `<div class='${type}'>${faker.lorem.paragraph()}</div>`;
};

const createIdentity = () => {
  db.identity.create({
    adminContact: {
      name: 'email',
    },
  });
};

createIdentity();

const createTranslator = () => {
  const length = faker.number.int({ min: 4, max: 7 });

  for (let i = 0; i < length; i++) {
    const translator = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    };

    db.translator.create(translator);
  }
};

createTranslator();

const createPublisher = () => {
  const length = faker.number.int({ min: 5, max: 10 });

  for (let i = 0; i < length; i++) {
    const publisherName = faker.lorem.words({ min: 1, max: 2 });

    db.publisher.create({ title: publisherName });
  }
};

createPublisher();

const createBooks = () => {
  const length = faker.number.int({ min: 20, max: 50 });

  for (let i = 0; i < length; i++) {
    const publishers = db.publisher.getAll();
    const publishersIndex = faker.number.int({ min: 0, max: publishers.length - 1 });
    const publisher = publishers[publishersIndex];

    const translators = db.translator.getAll();
    const translatorsIndex = faker.number.int({ min: 0, max: translators.length - 1 });
    const translator = translators[translatorsIndex];

    const isTolkien = faker.datatype.boolean({ probability: 0.7 });

    const isbn = generateRandomISBN13();

    const book = {
      originalTitle: isTolkien
        ? faker.lorem.words({ min: 1, max: 4 })
        : faker.datatype.boolean({ probability: 0.7 })
          ? faker.lorem.words({ min: 1, max: 4 })
          : null,
      polishTitle: faker.lorem.words({ min: 1, max: 4 }),
      author: isTolkien ? 'J.R.R. Tolkien' : faker.person.fullName(),
      translator,
      publisher,
      year: Number(faker.date.past().getFullYear()),
      publicationNumber: faker.number.int({ min: 1, max: 5 }),
      cover: isTolkien ? (faker.datatype.boolean() ? 'Miękka' : 'Twarda') : null,
      series: faker.datatype.boolean() ? faker.lorem.words({ min: 1, max: 2 }) : null,
      isbn,
    };

    db.book.create(book);
  }
};

createBooks();

const createPublications = () => {
  const length = faker.number.int({ min: 4, max: 15 });

  for (let i = 0; i < length; i++) {
    const isISBN = faker.datatype.boolean();
    const publishers = db.publisher.getAll();
    const publishersIndex = faker.number.int({ min: 0, max: publishers.length - 1 });
    const publisher = publishers[publishersIndex];

    db.publication.create({
      publisher,
      isbn: isISBN ? generateRandomISBN13() : null,
      issn: isISBN ? null : generateISSN(),
    });
  }
};

createPublications();

const createCategories = () => {
  const categoriesLength = faker.number.int({ min: 4, max: 8 });

  for (let i = 0; i < categoriesLength; i++) {
    const title = faker.lorem
      .words({ min: 1, max: 2 })
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    db.category.create({
      id: faker.string.uuid(),
      title,
      slug: createSlug(title),
      pages: [],
    });
  }
};

createCategories();

const createPages = () => {
  const pageTitle = 'Library';

  db.page.create({
    title: pageTitle,
    slug: createSlug(pageTitle),
    content: `${faker.lorem.paragraphs(faker.number.int({ min: 1, max: 3 }))}

- ${Array.from({ length: 5 }, () => faker.lorem.word()).join('\n- ')}

\n\n${generateAlertBlock('info')}\n\n
- ${Array.from({ length: 2 }, () => faker.lorem.word()).join('\n- ')}
\n\n${generateAlertBlock('warning')}\n\n`,
  });

  const pagesLength = faker.number.int({ min: 10, max: 15 });

  for (let i = 0; i < pagesLength; i++) {
    const title = faker.lorem
      .words({ min: 1, max: 4 })
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    const categoryIndex = faker.datatype.boolean({ probability: 0.8 })
      ? faker.number.int({ min: 0, max: db.category.getAll().length - 1 })
      : null;

    db.page.create({
      title,
      slug: createSlug(title),
      content: `${faker.lorem.paragraphs(faker.number.int({ min: 2, max: 5 }))}`,
      category: categoryIndex ? db.category.getAll()[categoryIndex] : null,
    });
  }
};

createPages();

const updateCategories = () => {
  const pages = db.page.getAll();

  pages.forEach((page) => {
    const category = page.category;

    if (category) {
      db.category.update({
        where: {
          id: {
            equals: category.id,
          },
        },
        data: {
          pages: [...category.pages, page],
        },
      });
    }
  });
};

updateCategories();

const createRoles = () => {
  const roles = [
    {
      id: '1',
      roleName: 'Administrator',
      roleShorthand: 'admin',
    },
    {
      id: '2',
      roleName: 'User',
      roleShorthand: 'user',
    },
  ];

  roles.forEach((role) => db.role.create(role));
};

createRoles();

const createUsers = () => {
  const admin = db.role.findFirst({
    where: {
      id: {
        equals: '1',
      },
    },
  })!;

  const user = db.role.findFirst({
    where: {
      id: {
        equals: '2',
      },
    },
  })!;

  const loadInitialData = () => {
    try {
      const savedUsers = localStorage.getItem('mockUsers');
      return savedUsers ? JSON.parse(savedUsers) : [];
    } catch (error) {
      console.error('Error while loading data:', error);
      return [];
    }
  };

  const savedUsers = loadInitialData();

  if (savedUsers.length > 0) {
    savedUsers.forEach((mockedUser: IUser) => {
      const { id, avatar, userName, email, emailVerified, isBanned, role } = mockedUser;
      if (!db.user.findFirst({ where: { id: { equals: user.id } } })) {
        db.user.create({
          id,
          avatar,
          userName,
          email,
          emailVerified,
          isBanned,
          role: role.id === '1' ? admin : user,
        });
      }
    });
  } else {
    db.user.create({
      id: faker.string.uuid(),
      email: 'admin@mail.com',
      emailVerified: true,
      isBanned: false,
      userName: faker.internet.username(),
      role: admin,
    });

    db.user.create({
      id: faker.string.uuid(),
      email: 'user@mail.com',
      emailVerified: true,
      isBanned: false,
      userName: faker.internet.username(),
      role: user,
    });

    for (let i = 0; i < faker.number.int({ min: 0, max: 6 }); i += 1) {
      db.user.create({
        id: faker.string.uuid(),
        email: faker.internet.email(),
        emailVerified: faker.datatype.boolean(),
        isBanned: faker.datatype.boolean({ probability: 0.2 }),
        userName: faker.internet.username(),
        role: faker.datatype.boolean({ probability: 0.1 }) ? admin : user,
      });
    }

    const users = db.user.getAll();

    localStorage.setItem('mockUsers', JSON.stringify(users));
  }
};

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

  db.navigation.create({
    title: "Tolkien's Library",
    link: `/library`,
    isDivider: false,
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

  const generateImage = () => {
    if (faker.datatype.boolean({ probability: 0.4 })) {
      return `<img src="${faker.image.url({ width: 500, height: 200 })}" alt="${faker.lorem.sentence()}">`;
    }
  };

  const generateContent = (): string => {
    const elements = [
      faker.lorem.paragraphs(faker.number.int({ min: 1, max: 3 })),
      `- ${Array.from({ length: 3 }, () => faker.lorem.word()).join('\n- ')}`,
      `1. ${Array.from({ length: 3 }, () => faker.lorem.word()).join('\n1. ')}`,
      `> ${faker.lorem.sentence()}`,
      generateImage(),
      generateQuote(faker.number.int({ min: 1, max: 3 })),
      generateTable(),
      `[${faker.lorem.words(2)}](${faker.internet.url()})`,
      generateAlertBlock(faker.helpers.arrayElement(['info', 'warning', 'danger'])),
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

    db.article.create({
      id: faker.string.uuid(),
      date,
      category,
      content: generateContent(),
    });
  }
};

createUsers();
createNavigation();
createArticles();

window.mocks = {
  getRoles: () => db.role.getAll(),
  getUsers: () => db.user.getAll(),
  getPages: () => db.page.getAll(),
  getNav: () => db.navigation.getAll(),
  getNews: () => db.article.getAll(),
  getIdentity: () => db.identity.getAll(),
  getCategories: () => db.category.getAll(),
  getBooks: () => db.book.getAll(),
  getTranslators: () => db.translator.getAll(),
  getPublisher: () => db.publisher.getAll(),
  getPublications: () => db.publication.getAll(),
};
