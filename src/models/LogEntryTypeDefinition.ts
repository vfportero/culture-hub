import { LogEntryPlatormGroup, LogEntryType } from '.';

export class LogEntryTypeDefinition {
  type: LogEntryType;
  constructor(type: LogEntryType) {
    this.type = type;
  }

  get icon() : string {
    switch(this.type) {
    case LogEntryType.Movie:
      return 'movie';
    case LogEntryType.BoardGame:
      return 'casino';
    case LogEntryType.Book:
      return 'book';
    case LogEntryType.VideoGame:
      return 'sports_esports';
    case LogEntryType.TvShow:
      return 'ondemand_video';
    case LogEntryType.EscapeRoom:
      return 'lock';
    case LogEntryType.Play:
      return 'theater_comedy';
    case LogEntryType.Concert:
      return 'speaker';
    case LogEntryType.Album:
      return 'play_circle_filled';
    case LogEntryType.Museum:
      return 'museum';
    case LogEntryType.Podcasts:
      return 'podcasts';
    default:
      return '';
    }
  }

  get name() :string {
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

  getPlatformName(id: string): string {
    for (const group of this.platforms) {
      for (const platform of group.platforms) {
        if (platform.id === id) {
          return platform.name;
        }
      }
    }
    return '';
  }
  
  get platforms(): Array<LogEntryPlatormGroup> {
    switch(this.type) {
    case LogEntryType.Movie:
    case LogEntryType.TvShow:
      return [
        { name: 'Streaming', platforms: [
          { id : 'netflix', name: 'Netflix' },
          { id : 'disney_plus', name: 'Disney+' },
          { id : 'hbo_max', name: 'HBO Max'},
          { id : 'amazon_prime_video', name: 'Amazon Prive Video' },
          { id : 'filmin', name: 'Filmin' },
          { id : 'moviestar_plus', name: 'Movistar Plus' },
          { id: 'atres_player', name: 'A3 Player' },
          { id: 'youtube', name: 'Youtube' },
        ]
        },
        {
          name: 'Clásico', platforms: [
            { id: 'theaters', name: 'Cines' },
            { id: 'disc', name: 'Soporte físico' },
            { id: 'tv', name: 'TV' },
          ]
        }
      ];
    case LogEntryType.BoardGame:
      return [
        { name: 'Clásico', platforms: [{ id: 'table', name: 'Mesa' }] },
        { name: 'Online', platforms: [{ id: 'online', name: 'Online' }] }
      ];
    case LogEntryType.Book:
      return [
        { name: 'Clásico', platforms: [{ id: 'book', name: 'Libro físico' }] },
        {
          name: 'Digital', platforms: [
            { id: 'kindle', name: 'Kindle' },
            { id: 'audio_book', name: 'Audio libro' }
          ]
        }
      ];
    case LogEntryType.VideoGame:
      return [
        {
          name: 'Consola', platforms: [
            { id: 'xbox', name: 'Xbox' },
            { id: 'xbox_game_pass', name: 'Xbox Game Pass' },
            { id: 'nintendo_switch', name: 'Nintendo Switch' },
            { id: 'ps4', name: 'PS4' },
            { id: 'ps5', name: 'PS5' },
          ],
        },
        {
          name: 'PC', platforms: [
            { id: 'pc', name: 'PC' },
            { id: 'pc_xbox_game_pass', name: 'Xbox Game Pass PC' },
            { id: 'pc_steam', name: 'Steam' },
          ]
        },
        {
          name: 'Streaming', platforms: [
            { id: 'xcloud', name: 'Xbox Cloud Gaming' },
            { id: 'stadia', name: 'Google Stadia' },
          ]
        },
        {
          name: 'Móvil', platforms: [
            { id: 'mobile', name: 'Móvil' },
          ]
        },
      ];
    case LogEntryType.EscapeRoom:
      return [
        { name: 'Clásico', platforms: [{ id: 'in_place', name: 'En el local de escape' }] },
        { name: 'Online', platforms: [{ id: 'online', name: 'Online' }] }
      ];
    case LogEntryType.Play:
      return [
        { name: 'Clásico', platforms: [{ id: 'theaters', name: 'Teatro' }] },
        { name: 'Online', platforms: [{ id: 'online', name: 'Online' }] }
      ];
    case LogEntryType.Concert:
      return [
        { name: 'Clásico', platforms: [{ id: 'gig', name: 'Concierto' }, { id: 'festival', name: 'Festival' }] },
        { name: 'Online', platforms: [{ id: 'online', name: 'Online' }] }
      ];
    case LogEntryType.Album:
      return [
        { name: 'Clásico', platforms: [{ id: 'disc', name: 'Disco' }] },
        { name: 'Streaming', platforms: [{ id: 'spotify', name: 'Spotify' }, { id: 'youtube', name: 'Youtube' }] }
      ];
    case LogEntryType.Museum:
      return [
        { name: 'Clásico', platforms: [{ id: 'in_place', name: 'Museo' }] },
        { name: 'Online', platforms: [{ id: 'online', name: 'Online' }] }
      ];
    case LogEntryType.Podcasts:
      return [
        {
          name: 'Streaming', platforms: [
            { id: 'spotify', name: 'Spotify' },
            { id: 'ivoxx', name: 'Ivoxx' },
            { id: 'apple_podcasts', name: 'Apple Podcasts' },
            { id: 'youtube', name: 'Youtube' },
            { id: 'ps4', name: 'PS4' },
            { id: 'ps5', name: 'PS5' },
          ],
        },
      ];
    default: return [];
    }
  }
}