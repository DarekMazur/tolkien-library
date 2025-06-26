import { http, HttpResponse } from 'msw';

const navigationMock = [
  { id: '1', title: 'Strona główna', link: '/', isDivider: false },
  { id: '2', title: 'Produkty', link: '/products', isDivider: false },
  { id: '3', isDivider: true },
  { id: '4', title: 'O nas', link: '/about', isDivider: false },
  { id: '5', title: 'Kontakt', link: '/contact', isDivider: false },
];

const pageMock = [
  {
    id: 'default',
    title: 'Default Storybook Page',
    slug: 'default',
    content: '# Default Content\n\nThis is the default content.',
  },
];

export const handlers = [
  http.get('/api/navigation', () => {
    return HttpResponse.json(navigationMock);
  }),
  http.get('/api/articles', () => {
    return HttpResponse.json();
  }),
  http.get('/api/pages/:slug', () => {
    return HttpResponse.json(pageMock);
  }),
];
