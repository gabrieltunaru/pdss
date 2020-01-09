import {Candidate} from './Candidate';

export interface Election {
  id?: string;
  isReferendum?: boolean;
  yes?: number;
  no?: number;
  title: string;
  description: string;
  candidates?: Candidate[];
  isActive: boolean;
  isClosed: boolean;
  // stopDate: Date;
}


