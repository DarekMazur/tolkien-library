export interface ICommonId {
  readonly id: string;
}

export type TResponse<T> = {
  data: T | null;
  isError: boolean;
  errorMessage: string | null;
};

export type TOrder = 'asc' | 'desc';
