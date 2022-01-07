import { LogEntryType } from '.';

export interface User {
  displayName: string;
  email?: string;
  avatar: string;
  twitterAccessToken: string;
  twitterTokenSecret: string;
  lastLoginDate: Date;
}

export interface LogEntry {
  createdDate: Date;
  updatedDate: Date;
  year: number;
  date: Date;
  type: LogEntryType;
  name: string;
  platform: string;
  rating: number;
  review: string;
  images?: string[];
  externalId?: string;
  tweetId?: string;
}
