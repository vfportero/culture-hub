import { LogEntryModel, LogEntryType } from '@/models';
import axios from 'axios';

class TwitterService {

  async notifyLogEntry(yearCount: number, replyTo: string, logEntry: LogEntryModel, accessToken: string, accessSecret: string): Promise<string> {
    let message = `${yearCount + 1}) ${logEntry.name} (`;
    
    message += '★'.repeat(Math.floor(logEntry.rating));
    if (logEntry.rating % 1 > 0) {
      message += '½';
    }
    message += ')\r\n\r\n';

    message += `${logEntry.review}\r\n\r\n`;
    switch (logEntry.type) {
    case LogEntryType.Movie:
      message += '🎬';
      break;
    case LogEntryType.TvShow:
      message += '📺';
      break;
    case LogEntryType.BoardGame:
      message += '🎲';
      break;
    case LogEntryType.Album:
      message += '🎵';
      break;
    case LogEntryType.Book:
      message += '📕';
      break;
    case LogEntryType.EscapeRoom:
      message += '🔒';
      break;
    case LogEntryType.Play:
      message += '🎭';
      break;
    case LogEntryType.Concert:
      message += '🤘';
      break;
    case LogEntryType.VideoGame:
      message += '🎮';
      break;
    case LogEntryType.Museum:
      message += '🖼️';
      break;
    case LogEntryType.Podcasts:
      message += '🎤';
      break;
    }

    message += ` ${logEntry.typeDefinition.getPlatformName(logEntry.platform)}`;

    return await this.sendTruncatedTweet(message, replyTo, accessToken, accessSecret);
  }

  async sendTruncatedTweet(message: string, replyTo: string, accessToken: string, accessSecret: string) : Promise<string> {
    const needsMoreThanOneTweet = message.length > 280;
    let originalMessage = message;
    if (needsMoreThanOneTweet) {
      message = this.truncate(message, 279);
      originalMessage = '…' + originalMessage.replace(message, '');
      message += '…';
    }

    let newTweetResponse = await axios.post(process.env.VUE_APP_POST_TWEET_URL, {
      message,
      replyTo,
      accessToken,
      accessSecret
    });
    
    if (needsMoreThanOneTweet) {
      return await this.sendTruncatedTweet(originalMessage, newTweetResponse.data.data.id, accessToken, accessSecret);
    }

    return newTweetResponse.data.data.id;
  }

  truncate(str, n ){
    if (str.length <= n) { return str; }
    const subString = str.substr(0, n-1);
    return subString.substr(0, subString.lastIndexOf(' '));
  }


}

export default new TwitterService();