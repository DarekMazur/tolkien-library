import { handlers as navigationHandlers } from './navigation';
import { handlers as articlesHandlers } from './articles';
import { handlers as rolesHandlers } from './roles';
import { handlers as usersHandlers } from './users';
import { handlers as identityHandlers } from './identity';
import { handlers as pagesHandlers } from './pages';
import { handlers as categoriesHandlers } from './categories.ts';
import { handlers as booksHandlers } from './books';
import { handlers as publicationsHandlers } from './publications';
import { handlers as fanzoneHandlers } from './fanzone.ts';

export const handlers = [
  ...rolesHandlers,
  ...usersHandlers,
  ...navigationHandlers,
  ...articlesHandlers,
  ...identityHandlers,
  ...pagesHandlers,
  ...categoriesHandlers,
  ...booksHandlers,
  ...publicationsHandlers,
  ...fanzoneHandlers,
];
