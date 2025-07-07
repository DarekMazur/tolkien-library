import { ICommonId } from '@/lib/types/common.types.ts';

export interface IMainMenuList extends ICommonId {
  title?: string;
  link?: string;
  isDivider: boolean;
}
