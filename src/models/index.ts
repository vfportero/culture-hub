import { LogEntryTypeDefinition } from './LogEntryTypeDefinition';

export interface User {
  uid: string,
  displayName: string;
  email: string;
}

export interface LogEntry {
  uid?: string;
  createdDate: Date;
  updatedDate: Date;
  date: Date;
  type: LogEntryType;
  name: string;
  platform: string;
  rating: number;
  review: string;
  images: string[];
  externalId: string;
}

export interface LogEntryPlatorm {
  id: string;
  name: string;
}

export interface LogEntryPlatormGroup {
  name: string;
  platforms: LogEntryPlatorm[];
}

export enum LogEntryType {
  Movie = 'movie',
  TvShow = 'tv_show',
  BoardGame = 'board_game',
  VideoGame = 'video_game',
  Book = 'book',
  EscapeRoom = 'escape_room',
  Play = 'play',
  Concert = 'concert',
  Album = 'album',
  Museum = 'museum',
  Podcasts = 'podcasts',
}

export {
  LogEntryTypeDefinition
};