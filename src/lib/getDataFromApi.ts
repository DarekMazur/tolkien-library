import { IRegisteredUser } from '@/lib/types.ts';

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
