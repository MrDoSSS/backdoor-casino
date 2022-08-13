// users-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations'
import { Model, Mongoose } from 'mongoose'

export default function (app: Application): Model<any> {
  const modelName = 'users'
  const mongooseClient: Mongoose = app.get('mongooseClient')
  const schema = new mongooseClient.Schema(
    {
      permissions: { type: Array, default: ['user'] },
      address: { type: String, required: true, unique: true },
      username: { type: String, default: '' },
      nonce: {
        type: Number,
        default: Math.floor(Math.random() * (9999 - 1000) + 1000),
      },
      playingChips: {
        type: Number,
        default: 0,
      },
      prizeTickets: {
        type: Number,
        default: 0,
      },
      eth: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  )

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    ;(mongooseClient as any).deleteModel(modelName)
  }
  return mongooseClient.model<any>(modelName, schema)
}
