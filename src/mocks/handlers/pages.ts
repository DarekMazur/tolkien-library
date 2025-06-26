import { http, HttpResponse } from 'msw';
import { db } from '@/mocks/db.ts';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/pages`, () => {
    return HttpResponse.json(db.navigation.getAll());
  }),

  http.get(`${import.meta.env.VITE_API_URL}/pages/:slug`, ({ params }) => {
    const { slug } = params;
    const slugValue = Array.isArray(slug) ? slug[0] : slug;

    const filteredPages = db.page.findFirst({
      where: {
        slug: {
          equals: slugValue,
        },
      },
    });

    if (filteredPages) {
      return HttpResponse.json(filteredPages, { status: 200 });
    }

    return HttpResponse.json('Page not found', { status: 404 });
  }),
];
