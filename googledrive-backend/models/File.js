import mongoose from 'mongoose'

const fileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'File name is required'],
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File',
      default: null,
    },
    isFolder: {
      type: Boolean,
      default: false,
    },
    size: {
      type: Number,
      default: 0,
    },
    mimeType: {
      type: String,
      default: null,
    },
    s3Key: {
      type: String,
      default: null,
    },
    s3Url: {
      type: String,
      default: null,
    },
    path: {
      type: String,
      default: '/',
    },
  },
  { timestamps: true }
)

// Index for faster queries
fileSchema.index({ userId: 1, parentId: 1 })
fileSchema.index({ userId: 1, name: 1 })

export default mongoose.model('File', fileSchema)
