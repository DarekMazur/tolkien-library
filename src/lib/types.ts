export interface IMainMenuList {
  readonly id: string;
  title?: string;
  link?: string;
  isDivider: boolean;
}

export interface INewsEntry {
  readonly id: string;
  date: Date;
  category?: string;
  content: string;
}

export interface IRole {
  readonly id: string;
  roleName: string;
  roleShorthand: string;
}

export interface IRegisteredUser {
  avatar: string;
  email: string;
  emailVerified: boolean;
  userName: string;
}

export interface IUser extends IRegisteredUser {
  readonly id: string;
  isBanned: boolean;
  role: IRole;
}

export interface IIdentityProps {
  readonly id: string;
  adminContact: {
    name?: string;
    value: string;
  };
}

export interface ICategoryProps {
  readonly id: string;
  title: string;
  slug: string;
  pages?: Array<IPageProps>;
}

export interface IPageProps {
  readonly id: string;
  title: string;
  slug: string;
  content: string;
  category?: ICategoryProps;
}

export type TResponse<T> = {
  data: T | null;
  isError: boolean;
  errorMessage: string | null;
};

export interface IPublisherProps {
  readonly id: string;
  title: string;
  description: string;
}

export interface ITransactorProps {
  readonly id: string;
  firstName: string;
  lastName: string;
  description: string;
}

export interface IBookProps {
  readonly id: string;
  originalTitle: string | null;
  polishTitle: string;
  author: string | null;
  translator: ITransactorProps;
  publisher: IPublisherProps;
  year: number;
  publicationNumber: number;
  cover: string | null;
  series: string | null;
  isbn: string;
}
