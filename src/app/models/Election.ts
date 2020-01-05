import {Candidate} from './Candidate';

export interface Election {
  id?: string;
  isReferendum?: boolean;
  yes?: boolean;
  no?: boolean;
  title: string;
  description: string;
  candidates?: Candidate[];
  isActive: boolean;
  isClosed: boolean;
  // stopDate: Date;
}


