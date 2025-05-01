import { http, HttpResponse } from 'msw';
import { db } from '../db.ts';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/articles`, () => {
    return HttpResponse.json(db.articles.getAll());
  }),
];
