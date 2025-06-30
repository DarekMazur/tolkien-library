import { http, HttpResponse } from 'msw';
import { db } from '@/mocks/db.ts';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/categories`, () => {
    const categories = db.category.getAll().map((category) => ({
      ...category,
      pages: category.pages.map((page) => ({
        id: page.id,
        title: page.title,
        slug: page.slug,
      })),
    }));
    return HttpResponse.json(categories);
  }),
];
