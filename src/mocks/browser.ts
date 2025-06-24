import { faker } from '@faker-js/faker';
import { handlers } from './handlers';
import { db } from './db.ts';
import { setupWorker } from 'msw/browser';
import { IUser } from '@/lib/types.ts';

declare global {
  interface Window {
    mocks: unknown;
  }
}

export const worker = setupWorker(...handlers);

worker.events.on('request:start', ({ request }) => {
  console.log('MSW intercepted:', request.method, request.url);
});

const createIdentity = () => {
  db.identity.create({
    adminContact: {
      name: 'email',
    },
  });
};

createIdentity();

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
  getNav: () => db.navigation.getAll(),
  getNews: () => db.article.getAll(),
  getIdentity: () => db.identity.getAll(),
};
