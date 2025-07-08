import { ICommonId } from '@/lib/types/common.types.ts';

export interface IPublisherProps extends ICommonId {
  title: string;
  description: string;
}

export interface ITransactorProps extends ICommonId {
  firstName: string;
  lastName: string;
  description: string;
}

export interface IBookProps extends ICommonId {
  originalTitle: string | null;
  polishTitle: string;
  author: string | null;
  translator: ITransactorProps | null;
  publisher: IPublisherProps;
  year: number;
  publicationNumber: number;
  cover: string | null;
  series: string | null;
  isbn: string;
}

export interface IPublicationProps extends ICommonId {
  title: string;
  author: string;
  publisher: IPublisherProps;
  year: string;
  isbn: string;
  issn: string;
  description: string;
}

export type TPublicationType = IBookProps | IPublicationProps;

export enum EPublicationType {
  BOOK = 'book',
  ARTICLE = 'article',
}
