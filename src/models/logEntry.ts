import { LogEntryType } from './logEntryType';

export interface LogEntry {
  createdDate: Date;
  updatedDate: Date;
  date: Date;
  type: LogEntryType;
  name: string;
  platform: string;
  rating: number;
  review: string;
}