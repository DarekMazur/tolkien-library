import slugify from 'slugify';

export const createSlug = (title: string) => {
  return slugify(title, {
    replacement: '-',
    remove: /[*+~.()'"!:@]/g,
    lower: true,
    strict: true,
    locale: 'pl',
    trim: true,
  });
};
