import * as mongoose from 'mongoose';
import { transform } from '@mongoose/helpers';

const findingsSchema = new mongoose.Schema(
  {
    type: String,
    rule_id: String,
    location: {
      path: String,
      positions: {
        begin: {
          line: Number,
        }
      }
    },
    metadata: {
      description: String,
      severity: String,
    },
  },
  { _id : false },
);

const ResultSchema = new mongoose.Schema({
  id: String,
  status: String,
  repositoryName: String,
  findings: [findingsSchema],
  totalFindings: { type: Number, default: 0 },
  queuedAt: { type: Date, default: '' },
  scanningAt: { type: Date, default: '' },
  finishedAt: { type: Date, default: '' },
}, {
  timestamps: true,
});

ResultSchema.set('toJSON', {
  transform: transform({}),
});

export { ResultSchema };
