import { format, Logger, createLogger, transports } from 'winston';

const { printf, combine, label, timestamp, colorize } = format;

export interface LoggerConfiguration {
  service: string;
  location: string;
}

export const getLogger = (context: string): Logger => {
  const myFormat = printf(({ level, message, timestamp: ts }) => {
    return `${ts} [ ${context} ] ${level}: ${message}`;
  });

  return createLogger({
    format: combine(colorize(), timestamp(), colorize(), myFormat),
    transports: [new transports.Console()],
  });
};
