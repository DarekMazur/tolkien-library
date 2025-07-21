import { http, HttpResponse } from 'msw';
import { db } from '@/mocks/db.ts';
import { createSlug } from '@/lib/helpers/createSlug.ts';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/translators`, () => {
    return HttpResponse.json(db.translator.getAll(), { status: 200 });
  }),

  http.get(`${import.meta.env.VITE_API_URL}/translators/:slug`, ({ params }) => {
    const slug = params.slug;
    const translators = db.translator.getAll();

    const singleTranslator = translators.filter((translator) => {
      const translatorSlug = createSlug(`${translator.firstName} ${translator.lastName}`);
      return translatorSlug === slug;
    });

    if (singleTranslator.length > 1) {
      return HttpResponse.json('No translators found', { status: 404 });
    }

    if (singleTranslator.length > 1) {
      return HttpResponse.json('Invalid response - translator should be unique', { status: 409 });
    }

    return HttpResponse.json(singleTranslator[0], { status: 200 });
  }),
];
