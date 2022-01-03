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


export enum LogEntryType {
  Movie = "movie",
  TvShow = "tv-show",
  BoardGame = "board-game",
  VideoGame = "video-game",
  Book = "book",
  EscapeRoom = "escape-room",
  Play = "play",
  Concert = "concert",
}
