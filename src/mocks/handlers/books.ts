import { http, HttpResponse } from 'msw';
import { db } from '@/mocks/db.ts';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/books`, () => {
    return HttpResponse.json(db.book.getAll());
  }),

  http.get(`${import.meta.env.VITE_API_URL}/books/:bookId`, ({ params }) => {
    const bookId = params.bookId;
    const idValue = Array.isArray(bookId) ? bookId[0] : bookId;

    const book = db.book.findFirst({
      where: {
        id: {
          equals: idValue,
        },
      },
    });

    if (book) {
      return HttpResponse.json(book, { status: 200 });
    }

    return HttpResponse.json('Book not found', { status: 404 });
  }),
];
