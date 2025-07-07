import { ICommonId } from '@/lib/types/common.types.ts';

export interface INewsEntry extends ICommonId {
  date: Date;
  category?: string;
  content: string;
}
