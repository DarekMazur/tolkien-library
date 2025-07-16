import { http, HttpResponse } from 'msw';
import { db } from '@/mocks/db.ts';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/fanzin`, () => {
    return HttpResponse.json(db.fanzin.getAll());
  }),
  http.get(`${import.meta.env.VITE_API_URL}/faneditions`, () => {
    return HttpResponse.json(db.fanEditions.getAll());
  }),
];
