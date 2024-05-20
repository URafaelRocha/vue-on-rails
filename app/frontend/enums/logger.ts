const green = '\x1b[32m';
const yellow = '\x1b[93m';
const blue = '\x1b[34m';
const red = '\x1b[31m';

export enum ELogger {
  DEBUG = blue,
  INFO = green,
  WARNING = yellow,
  ERROR = red,
}
