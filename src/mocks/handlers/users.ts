import { http, HttpResponse } from 'msw';
import { db } from '../db';
import { v4 as uuid } from 'uuid';
import { IUser } from '@/lib/types.ts';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/users`, () => {
    return HttpResponse.json(db.user.getAll(), { status: 200 });
  }),

  http.post(`${import.meta.env.VITE_API_URL}/users/me`, async ({ request }) => {
    const body = await request.json();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { avatar, email, emailVerified, userName } = body;

    if (email) {
      const loggedUser = db.user.findFirst({
        where: {
          email: {
            equals: email,
          },
        },
      });

      if (!loggedUser) {
        const role = db.role.findFirst({
          where: {
            id: {
              equals: '2',
            },
          },
        })!;

        const newUser = {
          id: uuid(),
          avatar,
          email,
          emailVerified,
          isBanned: false,
          userName,
          role,
        };

        db.user.create(newUser);
        const mockedUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');

        mockedUsers.push(newUser);
        localStorage.setItem('mockUsers', JSON.stringify(mockedUsers));

        return HttpResponse.json({ data: newUser }, { status: 200 });
      }

      if (loggedUser.emailVerified !== emailVerified) {
        loggedUser.emailVerified = emailVerified;
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

    const isUserExists = db.user.findFirst({
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (isUserExists) {
      return HttpResponse.json('User already exist', { status: 409 });
    }

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

  http.put(`${import.meta.env.VITE_API_URL}/users/:userId`, async ({ request, params }) => {
    const body = await request.json();
    const { userId } = params;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { id, avatar, userName } = body;

    if (userId !== id) {
      return HttpResponse.json('Request failed', { status: 400 });
    }

    const user = db.user.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });

    if (!user) {
      return HttpResponse.json('User not found', { status: 404 });
    }

    db.user.update({
      where: {
        id: {
          equals: user.id,
        },
      },
      data: {
        avatar,
        userName,
      },
    });

    const mockedUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');

    mockedUsers.map((mockedUser: IUser) => console.log(mockedUser.id !== id));

    const updatedMockedUsers = mockedUsers.filter((mockedUser: IUser) => mockedUser.id !== id);
    updatedMockedUsers.push({
      ...user,
      avatar,
      userName,
    });

    console.log(updatedMockedUsers);

    localStorage.setItem('mockUsers', JSON.stringify(updatedMockedUsers));

    return HttpResponse.json('User updated', { status: 200 });
  }),
];
