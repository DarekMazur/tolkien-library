import { http, HttpResponse } from 'msw';
import { db } from '@/mocks/db.ts';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/online`, () => {
    return HttpResponse.json(db.online.getAll());
  }),
  http.get(`${import.meta.env.VITE_API_URL}/fanzin`, () => {
    return HttpResponse.json(db.fanzin.getAll());
  }),
  http.get(`${import.meta.env.VITE_API_URL}/mumakil`, () => {
    return HttpResponse.json(db.mumakil.getAll());
  }),
];
