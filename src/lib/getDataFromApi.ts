import {
  IBookProps,
  ICategoryProps,
  IFanzinProps,
  IIdentityProps,
  IFanEditionsProps,
  IPageProps,
  IPublicationProps,
  TResponse,
  ITranslatorProps,
  IPublisherProps,
} from '@/lib/types';

export const fetchApi = async <T>(url: string): Promise<TResponse<T>> => {
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

  const category = res.data.find((cat) => cat.slug === slug) || null;

  return {
    data: category,
    isError: false,
    errorMessage: null,
  };
};

export const getPageIdentity = () =>
  fetchApi<IIdentityProps>(`${import.meta.env.VITE_API_URL}/identity`);

export const getAllBooks = () => fetchApi<IBookProps[]>(`${import.meta.env.VITE_API_URL}/books`);

export const getBooksByAuthor = async (
  author: string,
  exclude?: boolean,
): Promise<TResponse<IBookProps[]>> => {
  const res = await fetchApi<IBookProps[]>(`${import.meta.env.VITE_API_URL}/books`);

  if (res.isError || !res.data) {
    return {
      data: null,
      isError: res.isError,
      errorMessage: res.errorMessage,
    };
  }

  const books =
    res.data.filter((book) => (exclude ? book.author !== author : book.author === author)) || null;

  return {
    data: books,
    isError: false,
    errorMessage: null,
  };
};

export const getBooksByTranslator = async (
  translatorId: string,
): Promise<TResponse<IBookProps[]>> => {
  const res = await fetchApi<IBookProps[]>(
    `${import.meta.env.VITE_API_URL}/books?translator=${translatorId}`,
  );

  if (res.isError || !res.data) {
    return {
      data: null,
      isError: res.isError,
      errorMessage: res.errorMessage,
    };
  }

  return {
    data: res.data,
    isError: false,
    errorMessage: null,
  };
};

export const getAllPublications = async (): Promise<TResponse<IPublicationProps[]>> => {
  const res = await fetchApi<IPublicationProps[]>(`${import.meta.env.VITE_API_URL}/publications`);

  if (res.isError || !res.data) {
    return {
      data: null,
      isError: res.isError,
      errorMessage: res.errorMessage,
    };
  }

  return {
    data: res.data,
    isError: false,
    errorMessage: null,
  };
};

export const getAllFanzin = async (): Promise<TResponse<IFanzinProps[]>> => {
  const res = await fetchApi<IFanzinProps[]>(`${import.meta.env.VITE_API_URL}/fanzin`);

  if (res.isError || !res.data) {
    return {
      data: null,
      isError: res.isError,
      errorMessage: res.errorMessage,
    };
  }

  return {
    data: res.data,
    isError: false,
    errorMessage: null,
  };
};

export const getAllFanEditions = async (): Promise<TResponse<IFanEditionsProps[]>> => {
  const res = await fetchApi<IFanEditionsProps[]>(`${import.meta.env.VITE_API_URL}/faneditions`);

  if (res.isError || !res.data) {
    return {
      data: null,
      isError: res.isError,
      errorMessage: res.errorMessage,
    };
  }

  return {
    data: res.data,
    isError: false,
    errorMessage: null,
  };
};

export const getTranslatorBySlug = async (slug: string): Promise<TResponse<ITranslatorProps>> => {
  const res = await fetchApi<ITranslatorProps>(
    `${import.meta.env.VITE_API_URL}/translators/${slug}`,
  );

  if (res.isError || !res.data) {
    return {
      data: null,
      isError: res.isError,
      errorMessage: res.errorMessage,
    };
  }

  return {
    data: res.data,
    isError: false,
    errorMessage: null,
  };
};

export const getPublisherBySlug = async (slug: string): Promise<TResponse<IPublisherProps>> => {
  const res = await fetchApi<IPublisherProps>(`${import.meta.env.VITE_API_URL}/publishers/${slug}`);

  if (res.isError || !res.data) {
    return {
      data: null,
      isError: res.isError,
      errorMessage: res.errorMessage,
    };
  }

  return {
    data: res.data,
    isError: false,
    errorMessage: null,
  };
};
