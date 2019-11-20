import { Logger as WinstonLogger } from 'winston';

import { getLogger } from './logger.service';

export class Logger {
  protected readonly logger: WinstonLogger;
  constructor() {
    this.logger = getLogger(this.constructor.name);
  }
}
