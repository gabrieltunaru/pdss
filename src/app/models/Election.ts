import {User} from './User';

export interface Election {
  title: string;
  description: string;
  candidates: User[];
  isActive: boolean;
  isClosed: boolean;
  // stopDate: Date;
}

