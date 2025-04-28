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
  for (let i = 0; i < faker.number.int({ min: 25, max: 40 }); i += 1) {
    const isDivider = faker.datatype.boolean();

    db.navigation.create({
      title: isDivider ? null : faker.lorem.words({ min: 1, max: 2 }),
      link: isDivider ? null : `/${faker.lorem.word()}`,
      isDivider,
    });
  }
};

createNavigation();

window.mocks = {
  getNav: () => db.navigation.getAll(),
};
