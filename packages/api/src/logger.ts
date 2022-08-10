import { createLogger, format, transports } from 'winston'

// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
const logger = createLogger({
  // To see more detailed errors, change this to 'debug'
  level: 'debug',
  format: format.combine(
    format.align(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.splat(),
    format.printf(({ level, message, timestamp }) => {
      return `[${level.toUpperCase()}] ${timestamp} ${message}`
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'api.log',
      dirname: 'logs',
    }),
  ],
})

export default logger
