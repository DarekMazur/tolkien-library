import { http, HttpResponse } from 'msw';
import { db } from '@/mocks/db.ts';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/books`, ({ request }) => {
    const url = new URL(request.url);
    const translatorId = url.searchParams.get('translator');
    const publisherId = url.searchParams.get('publisher');

    const books = db.book.getAll();

    if (translatorId) {
      return HttpResponse.json(
        books.filter((book) => book.translator?.id === translatorId),
        { status: 200 },
      );
    }

    if (publisherId) {
      return HttpResponse.json(
        books.filter((book) => book.publisher?.id === publisherId),
        { status: 200 },
      );
    }

    return HttpResponse.json(db.book.getAll(), { status: 200 });
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
