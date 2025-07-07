import { ICommonId } from '@/lib/types/common.types.ts';

export interface IRole extends ICommonId {
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
