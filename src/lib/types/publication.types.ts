import { ICommonId } from '@/lib/types/common.types.ts';

export interface IPublisherProps extends ICommonId {
  title: string;
  description: string;
}

export interface ITranslatorProps extends ICommonId {
  firstName: string;
  lastName: string;
  description: string;
}

export interface IBookProps extends ICommonId {
  originalTitle: string | null;
  polishTitle: string;
  author: string | null;
  translator: ITranslatorProps | null;
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
  isbn?: string | null;
  issn?: string | null;
  description: string;
}

export interface IOnlineProps extends ICommonId {
  title: string;
  version?: string;
  publisher: IPublisherProps;
  startDate: Date;
  lastIssueDate: Date | null;
}

export type TPublicationType = IBookProps | IPublicationProps;

export enum EPublicationType {
  BOOK = 'book',
  ARTICLE = 'article',
  ONLINE = 'online',
}
