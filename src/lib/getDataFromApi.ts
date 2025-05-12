export const getAllUsers = async () => {
  const users = await fetch(`${import.meta.env.VITE_API_URL}/users`);
  return users.json();
};

export const getUserByEmail = async (userEmail: string) => {
  const user = await fetch(`${import.meta.env.VITE_API_URL}/users/login/${userEmail}`);
  return user.json();
};
