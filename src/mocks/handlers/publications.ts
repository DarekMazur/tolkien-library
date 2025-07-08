import { http, HttpResponse } from 'msw';
import { db } from '@/mocks/db.ts';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/publications`, () => {
    return HttpResponse.json(db.publication.getAll());
  }),
];
