import { LogEntry, User } from './domain';
import { LogEntryTypeDefinition } from './LogEntryTypeDefinition';

export interface UserModel extends User {
  uid: string;
}

export interface LogEntryModel extends LogEntry {
  uid: string;
  typeDefinition: LogEntryTypeDefinition;
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

export enum UserLogEntriesLoadingStatus {
  idle,
  commuicatingWithServer,
  uploadingMedia,
  publishingTweet,
  
}

export {
  LogEntryTypeDefinition,
};