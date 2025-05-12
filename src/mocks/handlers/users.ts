import { http, HttpResponse } from 'msw';
import { db } from '../db';
import { v4 as uuid } from 'uuid';
import { IUser } from '@/lib/types.ts';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/users`, () => {
    return HttpResponse.json(db.user.getAll(), { status: 200 });
  }),

  http.get(`${import.meta.env.VITE_API_URL}/users/login/:userEmail`, ({ params }) => {
    const { userEmail } = params;
    if (userEmail) {
      console.log(userEmail);
      console.log(db.user.getAll());
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

  http.post(`${import.meta.env.VITE_API_URL}/users`, async ({ request }) => {
    const body = await request.json();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { avatar, email, emailVerified, userName } = body;

    const role = db.role.findFirst({
      where: {
        id: {
          equals: '2',
        },
      },
    })!;

    if (body) {
      const createdUser: IUser = {
        id: uuid(),
        avatar: avatar,
        email: email,
        emailVerified: emailVerified,
        isBanned: false,
        userName: userName,
        role,
      };

      db.user.create(createdUser);

      return HttpResponse.json(createdUser, { status: 200 });
    }

    return HttpResponse.json('Request failed', { status: 400 });
  }),
];
