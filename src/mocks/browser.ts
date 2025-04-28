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

createNavigation();

window.mocks = {
  getNav: () => db.navigation.getAll(),
};
