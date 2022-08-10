import mongoose from 'mongoose'
import { Application } from './declarations'
import logger from './logger'

export default function (app: Application): void {
  mongoose.connect(app.get('mongodb')).catch((err) => {
    logger.error(err)
    process.exit(1)
  })

  mongoose.set(
    'debug',
    (collectionName: string, method: string, query: object, doc: string) => {
      try {
        logger.info(
          `${collectionName}.${method} ${JSON.stringify(
            query
          )} ${JSON.stringify(doc)}`
        )
      } catch {
        logger.info(
          `${collectionName}.${method} ${query.toString()} ${doc.toString()}`
        )
      }
    }
  )

  app.set('mongooseClient', mongoose)
}
