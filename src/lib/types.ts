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
