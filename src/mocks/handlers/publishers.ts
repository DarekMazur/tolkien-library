import { http, HttpResponse } from 'msw';
import { db } from '@/mocks/db.ts';
import { createSlug } from '@/lib/helpers/createSlug.ts';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/publishers`, () => {
    return HttpResponse.json(db.publisher.getAll(), { status: 200 });
  }),

  http.get(`${import.meta.env.VITE_API_URL}/publishers/:slug`, ({ params }) => {
    const slug = params.slug;
    const publishers = db.publisher.getAll();

    const singlePublisher = publishers.filter((publisher) => {
      const publisherSlug = createSlug(publisher.title);
      return publisherSlug === slug;
    });

    if (singlePublisher.length > 1) {
      return HttpResponse.json('No publishers found', { status: 404 });
    }

    if (singlePublisher.length > 1) {
      return HttpResponse.json('Invalid response - publisher should be unique', { status: 409 });
    }

    return HttpResponse.json(singlePublisher[0], { status: 200 });
  }),
];
