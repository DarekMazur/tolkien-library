import { ICategoryProps, IRegisteredUser } from '@/lib/types.ts';

export const getLogin = async ({ avatar, email, emailVerified, userName }: IRegisteredUser) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ avatar, email, emailVerified, userName }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

type TResponse = {
  data: ICategoryProps | null;
  isError: boolean;
  errorMessage: string | null;
};

const response: TResponse = {
  data: null,
  isError: false,
  errorMessage: null,
};

export const getCategoryBySlug = async (slug: string) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
    if (!res.ok) {
      response.isError = true;
      response.errorMessage = 'Failed to fetch';
      return response;
    }
    const data = await res.json();
    const category = data.filter((cat: ICategoryProps) => cat.slug === slug);
    response.data = category[0];
  } catch (err) {
    response.isError = true;
    if (err instanceof Error) {
      response.errorMessage = `Error:  ${err.message}`;
    } else {
      response.errorMessage = 'Error';
    }
  }

  return response;
};
