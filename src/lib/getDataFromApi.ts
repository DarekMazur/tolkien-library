import { ICategoryProps, IIdentityProps, IPageProps, TResponse } from './types.ts';

const fetchApi = async <T>(url: string): Promise<TResponse<T>> => {
  const response: TResponse<T> = {
    data: null,
    isError: false,
    errorMessage: null,
  };

  try {
    const res = await fetch(url);
    if (!res.ok) {
      return {
        ...response,
        isError: true,
        errorMessage: `HTTP ${res.status}: ${res.statusText}`,
      };
    }
    const json = await res.json();
    return { ...response, data: json };
  } catch (err) {
    return {
      ...response,
      isError: true,
      errorMessage: err instanceof Error ? err.message : 'Unknown error',
    };
  }
};

export const getPageBySlug = (slug: string) =>
  fetchApi<IPageProps>(`${import.meta.env.VITE_API_URL}/pages/${slug}`);

export const getCategoryBySlug = async (slug: string): Promise<TResponse<ICategoryProps>> => {
  const res = await fetchApi<ICategoryProps[]>(`${import.meta.env.VITE_API_URL}/categories`);

  if (res.isError || !res.data) {
    return {
      data: null,
      isError: res.isError,
      errorMessage: res.errorMessage,
    };
  }

  const found = res.data.find((cat) => cat.slug === slug) || null;

  return {
    data: found,
    isError: false,
    errorMessage: null,
  };
};

export const getPageIdentity = () =>
  fetchApi<IIdentityProps>(`${import.meta.env.VITE_API_URL}/identity`);
