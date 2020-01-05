import {User} from './User';

export interface Election {
  id?: string;
  isReferendum?: boolean;
  yes?: boolean;
  no?: boolean;
  title: string;
  description: string;
  candidates?: User[];
  isActive: boolean;
  isClosed: boolean;
  // stopDate: Date;
}

