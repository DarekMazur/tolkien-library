import { http, HttpResponse } from 'msw';
import { db } from '../db';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/users`, () => {
    return HttpResponse.json(db.user.getAll(), { status: 200 });
  }),

  http.get(`${import.meta.env.VITE_API_URL}/users/login/:userEmail`, ({ params }) => {
    const { userEmail } = params;
    if (userEmail) {
      const loggedUser = db.user.findFirst({
        where: {
          email: {
            equals: userEmail as string,
          },
        },
      });

      if (!loggedUser) {
        return HttpResponse.json('User not found', { status: 404 });
      }

      const response = {
        data: loggedUser,
      };

      return HttpResponse.json(response, { status: 200 });
    }
    return HttpResponse.json('Request failed', { status: 400 });
  }),
];
