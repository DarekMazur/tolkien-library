import { http, HttpResponse } from 'msw';
import { db } from '@/mocks/db.ts';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/categories`, () => {
    return HttpResponse.json(db.category.getAll());
  }),
];
