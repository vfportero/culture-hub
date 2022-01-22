import { LogEntryType, Platform } from '.';

export class LogEntryTypeDefinition {
  type: LogEntryType;
  constructor(type: LogEntryType) {
    this.type = type;
  }

  get icon(): string {
    switch(this.type) {
      case LogEntryType.Movie:
        return 'film';
      case LogEntryType.BoardGame:
        return 'dice';
      case LogEntryType.Book:
        return 'book';
      case LogEntryType.VideoGame:
        return 'game-controller';
      case LogEntryType.TvShow:
        return 'tv';
      case LogEntryType.EscapeRoom:
        return 'lock-open';
      case LogEntryType.Play:
        return 'ticket';
      case LogEntryType.Concert:
        return 'radio';
      case LogEntryType.Album:
        return 'musical-notes';
      case LogEntryType.Museum:
        return 'image';
      case LogEntryType.Podcasts:
        return 'chatbubbles';
      default:
        return '';
    }
  }

  get name(): string {
    switch(this.type) {
      case LogEntryType.Movie:
        return 'Película';
      case LogEntryType.BoardGame:
        return 'Juego de mesa';
      case LogEntryType.Book:
        return 'Libro';
      case LogEntryType.VideoGame:
        return 'Videojuego';
      case LogEntryType.TvShow:
        return 'Serie';
      case LogEntryType.EscapeRoom:
        return 'Escape Room';
      case LogEntryType.Play:
        return 'Obra de teatro';
      case LogEntryType.Concert:
        return 'Concierto';
      case LogEntryType.Album:
        return 'Disco';
      case LogEntryType.Museum:
        return 'Museo';
      case LogEntryType.Podcasts:
        return 'Podcast';
      default:
        return '';
    }
  }
  
  get platforms(): Array<Platform> {
    switch(this.type) {
      case LogEntryType.Movie:
      case LogEntryType.TvShow:
        return [
          Platform.Netflix,
          Platform.DisneyPlus,
          Platform.HBOMax,
          Platform.AmazonPrimeVideo,
          Platform.Filmin,
          Platform.MovistarPlus,
          Platform.AppleTv,
          Platform.A3Player,
          Platform.YouTube,
          Platform.Theaters,
          Platform.Disc,
          Platform.Tv,
        ];
      case LogEntryType.BoardGame:
        return [
          Platform.Tabletop,
          Platform.BoardGameOnline
        ];
      case LogEntryType.Book: {
        return [
          Platform.Book,
          Platform.Kindle,
          Platform.AudioBook
        ];
      }
      case LogEntryType.VideoGame:
        return [
          Platform.Xbox,
          Platform.XboxGamePass,
          Platform.Switch,
          Platform.Ps4,
          Platform.Ps5,
          Platform.Pc,
          Platform.PcXboxGamePass,
          Platform.Steam,
          Platform.XCloud,
          Platform.Stadia,
          Platform.Mobile,
        ];
      case LogEntryType.EscapeRoom:
        return [
          Platform.EscapeRoom,
          Platform.EscapeRoomOnline
        ];
      case LogEntryType.Play:
        return [
          Platform.PlayTheater,
          Platform.PlayOnline
        ];
      case LogEntryType.Concert:
        return [
          Platform.Concert,
          Platform.Festival,
          Platform.ConcertOnline,
        ];
      case LogEntryType.Album:
        return [
          Platform.Disc,
          Platform.Spotify,
          Platform.YouTube
        ];
      case LogEntryType.Museum:
        return [
          Platform.Museum,
          Platform.Zoo,
          Platform.MuseumOnline
        ];
      case LogEntryType.Podcasts:
        return [
          Platform.Spotify,
          Platform.Ivoxx,
          Platform.ApplePodcasts,
          Platform.YouTube,
        ];
      default: return [];
    }
  }
}