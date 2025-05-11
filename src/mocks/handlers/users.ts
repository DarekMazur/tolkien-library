import { http, HttpResponse } from 'msw';
import { db } from '../db';
import { jwtDecode } from 'jwt-decode';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/users`, () => {
    return HttpResponse.json(db.user.getAll(), { status: 200 });
  }),

  http.get(`${import.meta.env.VITE_API_URL}/users/me`, async ({ request }) => {
    const body = await request.json();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { id } = body;
    const token = request.headers.get('authorization')?.split(' ')[1];

    if (!id) {
      return HttpResponse.json('Authentication failed', { status: 403 });
    }

    if (!token) {
      return HttpResponse.json('Invalid or expired token', { status: 403 });
    }

    const decode = jwtDecode(token);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (!decode || decode.id !== id) {
      return HttpResponse.json('Authentication failed', { status: 403 });
    }

    const user = db.user.findFirst({
      where: {
        id: {
          equals: id as string,
        },
      },
    });

    return HttpResponse.json(user, { status: 200 });
  }),
];
