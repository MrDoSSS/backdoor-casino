import logger from './logger'
import app from './app'

const port = app.get('port')
const host = app.get('host')
const server = app.listen(port, host)

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
)

server.on('listening', () =>
  logger.info(
    'Feathers application started on http://%s:%d',
    app.get('host'),
    port
  )
)
