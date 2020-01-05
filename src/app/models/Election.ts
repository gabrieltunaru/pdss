import {User} from './User';

export interface Election {
  id?: string;
  title: string;
  description: string;
  candidates: User[];
  isActive: boolean;
  isClosed: boolean;
  // stopDate: Date;
}

