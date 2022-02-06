import { LogEntryType, Platform } from '.';

export interface User {
  displayName: string;
  email?: string;
  avatar: string;
  integrations: UserIntegrations;
  lastLoginDate: Date;
}

export interface UserIntegrations {
  twitter: {
    enabled: boolean;
    username: string;
    accessToken: string;
    tokenSecret: string;
  } 
}

export interface LogEntry {
  createdDate: Date;
  updatedDate: Date;
  year: number;
  date: Date;
  type: LogEntryType;
  name: string;
  platform: Platform;
  rating: number;
  review: string;
  images?: string[];
  externalId?: string;
  tweetId?: string;
}
