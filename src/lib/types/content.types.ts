import { ICommonId } from '@/lib/types/common.types.ts';

export interface IIdentityProps extends ICommonId {
  adminContact: {
    name?: string;
    value: string;
  };
}

export interface ICategoryProps extends ICommonId {
  title: string;
  slug: string;
  pages?: Array<IPageProps>;
}

export interface IPageProps extends ICommonId {
  title: string;
  slug: string;
  content: string;
  category?: ICategoryProps;
}
