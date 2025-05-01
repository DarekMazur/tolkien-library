import { handlers as navigationHandlers } from './navigation';
import { handlers as articlesHandlers } from './articles';

export const handlers = [...navigationHandlers, ...articlesHandlers];
