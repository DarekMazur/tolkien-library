import { handlers as navigationHandlers } from './navigation';
import { handlers as articlesHandlers } from './articles';
import { handlers as rolesHandlers } from './roles';
import { handlers as usersHandlers } from './users';

export const handlers = [
  ...rolesHandlers,
  ...usersHandlers,
  ...navigationHandlers,
  ...articlesHandlers,
];
