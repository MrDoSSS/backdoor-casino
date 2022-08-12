// twitter-codes-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations'
import { Model, Mongoose } from 'mongoose'

export default function (app: Application): Model<any> {
  const modelName = 'twitterCodes'
  const mongooseClient: Mongoose = app.get('mongooseClient')
  const { Schema } = mongooseClient
  const schema = new Schema(
    {
      code: {
        type: String,
        required: true,
        default: Math.floor(Math.random() * (999999 - 100000) + 100000),
      },
      address: { type: String, required: true, unique: true },
      used: {
        type: Boolean,
        default: false,
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
