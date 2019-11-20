import { Document } from 'mongoose';

import{
  findings,
} from '../interfaces/finding.interface'

export interface Result extends Document {
  readonly status: string;
  readonly repositoryName: string;
  readonly findings: findings;
  readonly count: number;
  readonly queuedAt: Date;
  readonly scanningAt: Date;
  readonly finishedAt: Date;
}
