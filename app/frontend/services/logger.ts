import { ELogger } from '../enums/logger';

export default class Logger {
  private colorReset = '\x1b[0m';

  private use(message: string, type: ELogger) {
    console.log(type + message + this.colorReset);
  }

  public debug(message: string) {
    this.use(message, ELogger.DEBUG);
  }

  public info(message: string) {
    this.use(message, ELogger.INFO);
  }

  public warning(message: string) {
    this.use(message, ELogger.WARNING);
  }

  public error(message: string) {
    this.use(message, ELogger.ERROR);
  }
}

export const loggerService = new Logger();
