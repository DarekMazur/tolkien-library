import { http, HttpResponse } from 'msw';
import { db } from '@/mocks/db.ts';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/latest`, () => {
    const books = db.book.getAll();
    const fanzins = db.fanzin.getAll();
    const fanEdits = db.fanEditions.getAll();
    const publications = db.publication.getAll();
    const publishers = db.publisher.getAll();
    const translators = db.translator.getAll();

    const latest = [
      ...books,
      ...fanzins,
      ...fanEdits,
      ...publications,
      ...publishers,
      ...translators,
    ].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })[0];

    return HttpResponse.json(latest);
  }),
];
