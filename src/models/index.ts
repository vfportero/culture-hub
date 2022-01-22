import { LogEntry, User } from './domain';
import { LogEntryTypeDefinition } from './LogEntryTypeDefinition';

export interface UserModel extends User {
  uid: string;
}

export interface LogEntryModel extends LogEntry {
  uid: string;
  typeDefinition: LogEntryTypeDefinition;
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

export enum Platform {
  Netflix = 'netflix',
  DisneyPlus = 'disney_plus',
  HBOMax = 'hbo_max',
  AmazonPrimeVideo = 'amazon_prime_video',
  Filmin = 'filmin',
  MovistarPlus = 'movistart_plus',
  AppleTv = 'apple_tv',
  A3Player = 'a3_player',
  YouTube = 'youtube',
  Theaters = 'theaters',
  Disc = 'disc',
  Tv = 'tv',

  Tabletop = 'table',
  BoardGameOnline = 'boardgame_online',

  Book = 'book',
  Kindle = 'kindle',
  AudioBook = 'auidio_book',

  Xbox = 'Xbox',
  XboxGamePass = 'xbox_game_pass',
  Switch = 'nintendo_switch',
  Ps4 = 'ps4',
  Ps5 = 'ps5',
  Pc = 'pc',
  PcXboxGamePass = 'pc_xbox_game_pass',
  Steam = 'steam',
  XCloud = 'xcloud',
  Stadia = 'stadia',
  Mobile = 'mobile',

  EscapeRoom = 'escape_room',
  EscapeRoomOnline = 'escape_room_online',

  PlayTheater = 'play_theater',
  PlayOnline = 'play_online',

  Concert = 'concert',
  ConcertOnline = 'concert_online',
  Festival = 'festival',

  Spotify = 'spotify',

  Museum = 'museum',
  MuseumOnline = 'museum_online',
  Zoo = 'zoo',

  Ivoxx = 'ivoxx',
  ApplePodcasts = 'apple_podcasts',

}

export const PlatformNames: Record <Platform, string> = {
  [Platform.Netflix]: 'Netflix',
  [Platform.DisneyPlus]: 'Disney+',
  [Platform.HBOMax]: 'HBO Max',
  [Platform.AmazonPrimeVideo]: 'Amazon Prime Video',
  [Platform.Filmin]: 'Filmin',
  [Platform.MovistarPlus]: 'Movistar+',
  [Platform.AppleTv]: 'Apple TV',
  [Platform.A3Player]: 'A3 Player',
  [Platform.YouTube]: 'YouTube',
  [Platform.Theaters]: 'Cines',
  [Platform.Disc]: 'Disco',
  [Platform.Tv]: 'TV',
  [Platform.Tabletop]: 'Juego de mesa',
  [Platform.BoardGameOnline]: 'Juego de mesa online',
  [Platform.Book]: 'Libro físico',
  [Platform.Kindle]: 'Kindle',
  [Platform.AudioBook]: 'Audio libro',
  [Platform.Xbox]: 'Xbox',
  [Platform.XboxGamePass]: 'Xbox Game Pass',
  [Platform.Switch]: 'Nintendo Switch',
  [Platform.Ps4]: 'PS4',
  [Platform.Ps5]: 'PS5',
  [Platform.Pc]: 'PC',
  [Platform.PcXboxGamePass]: 'Xbox Game Pass PC',
  [Platform.Steam]: 'Steam',
  [Platform.XCloud]: 'Xbox Cloud Gaming',
  [Platform.Stadia]: 'Stadia',
  [Platform.Mobile]: 'Móvil',
  [Platform.EscapeRoom]: 'Escape Room',
  [Platform.EscapeRoomOnline]: 'Escape Room Online',
  [Platform.PlayTheater]: 'Teatro',
  [Platform.PlayOnline]: 'Teatro Online',
  [Platform.Concert]: 'Concierto',
  [Platform.ConcertOnline]: 'Concierto Online',
  [Platform.Festival]: 'Festival',
  [Platform.Spotify]: 'Spotify',
  [Platform.Museum]: 'Museo',
  [Platform.MuseumOnline]: 'Museo Online',
  [Platform.Zoo]: 'Zoo',
  [Platform.Ivoxx]: 'Ivoxx',
  [Platform.ApplePodcasts]: 'Apple Podcasts',
};

export enum UserLogEntriesLoadingStatus {
  idle,
  commuicatingWithServer,
  uploadingMedia,
  publishingTweet,
  
}

export {
  LogEntryTypeDefinition,
};