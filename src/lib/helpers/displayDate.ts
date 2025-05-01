export const displayDate = (date: Date) => {
  return `${new Date(date).getDate()}.${new Date(date).getMonth() + 1 < 10 ? `0${new Date(date).getMonth() + 1}` : new Date(date).getMonth() + 1}.${new Date(date).getFullYear()}`;
};
