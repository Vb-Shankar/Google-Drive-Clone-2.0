import File from '../models/File.js'
import User from '../models/User.js'
import { uploadToS3, deleteFromS3, getSignedUrl } from '../config/aws.js'
import multer from 'multer'

// Configure multer for file upload
const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
})

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file provided' })
    }

    const { parentId } = req.body

    // If parentId is provided, verify it's a folder owned by the user
    if (parentId) {
      const parentFolder = await File.findOne({ _id: parentId, userId: req.userId })
      if (!parentFolder) {
        return res.status(404).json({ message: 'Parent folder not found' })
      }
      if (!parentFolder.isFolder) {
        return res.status(400).json({ message: 'Parent must be a folder' })
      }
    }

    // Upload to S3
    const s3Result = await uploadToS3(req.file)

    // Create file record in database
    const file = new File({
      name: req.file.originalname,
      userId: req.userId,
      size: req.file.size,
      mimeType: req.file.mimetype,
      s3Key: s3Result.Key,
      s3Url: s3Result.Location,
      isFolder: false,
      parentId: parentId || null,
    })

    await file.save()

    // Update user storage
    const user = await User.findById(req.userId)
    user.storage.used += req.file.size
    await user.save()

    res.status(201).json({
      message: 'File uploaded successfully',
      file,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getFiles = async (req, res) => {
  try {
    const { folderId } = req.query
    let query = { userId: req.userId }

    // If folderId is provided, get files in that folder
    if (folderId) {
      // Verify folder exists and belongs to user
      const folder = await File.findOne({ _id: folderId, userId: req.userId })
      if (!folder) {
        return res.status(404).json({ message: 'Folder not found' })
      }
      if (!folder.isFolder) {
        return res.status(400).json({ message: 'Invalid folder ID' })
      }
      query.parentId = folderId
    } else {
      // Get root level files (no parent)
      query.parentId = null
    }

    const files = await File.find(query)
      .sort({ isFolder: -1, createdAt: -1 })
      .lean()

    res.json(files)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteFile = async (req, res) => {
  try {
    const { fileId } = req.params

    const file = await File.findOne({ _id: fileId, userId: req.userId })
    if (!file) {
      return res.status(404).json({ message: 'File not found' })
    }

    // Delete from S3 if not a folder
    if (!file.isFolder && file.s3Key) {
      await deleteFromS3(file.s3Key)
    }

    // Update user storage
    if (file.size > 0) {
      const user = await User.findById(req.userId)
      user.storage.used -= file.size
      await user.save()
    }

    // Delete file record
    await File.findByIdAndDelete(fileId)

    res.json({ message: 'File deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const downloadFile = async (req, res) => {
  try {
    const { fileId } = req.params

    const file = await File.findOne({ _id: fileId, userId: req.userId })
    if (!file) {
      return res.status(404).json({ message: 'File not found' })
    }

    if (file.isFolder) {
      return res.status(400).json({ message: 'Cannot download a folder' })
    }

    // Get signed URL from S3
    const signedUrl = await getSignedUrl(file.s3Key)

    res.json({ downloadUrl: signedUrl })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createFolder = async (req, res) => {
  try {
    const { folderName, parentId } = req.body

    if (!folderName || folderName.trim() === '') {
      return res.status(400).json({ message: 'Folder name is required' })
    }

    // If parentId is provided, verify it's a folder owned by the user
    if (parentId) {
      const parentFolder = await File.findOne({ _id: parentId, userId: req.userId })
      if (!parentFolder) {
        return res.status(404).json({ message: 'Parent folder not found' })
      }
      if (!parentFolder.isFolder) {
        return res.status(400).json({ message: 'Parent must be a folder' })
      }
    }

    const folder = new File({
      name: folderName,
      userId: req.userId,
      isFolder: true,
      size: 0,
      parentId: parentId || null,
    })

    await folder.save()

    res.status(201).json({
      message: 'Folder created successfully',
      folder,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const renameFile = async (req, res) => {
  try {
    const { fileId } = req.params
    const { name } = req.body

    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'New name is required' })
    }

    const file = await File.findOneAndUpdate(
      { _id: fileId, userId: req.userId },
      { name },
      { new: true }
    )

    if (!file) {
      return res.status(404).json({ message: 'File not found' })
    }

    res.json({
      message: 'File renamed successfully',
      file,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getFolderPath = async (req, res) => {
  try {
    const { folderId } = req.params
    const breadcrumb = []

    let currentFolder = null
    if (folderId) {
      currentFolder = await File.findOne({ _id: folderId, userId: req.userId })
      if (!currentFolder) {
        return res.status(404).json({ message: 'Folder not found' })
      }
    }

    // Build breadcrumb from current folder up to root
    let folder = currentFolder
    while (folder) {
      breadcrumb.unshift({
        id: folder._id,
        name: folder.name,
      })
      if (folder.parentId) {
        folder = await File.findOne({ _id: folder.parentId, userId: req.userId })
      } else {
        folder = null
      }
    }

    res.json({
      currentFolder,
      breadcrumb,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const searchFiles = async (req, res) => {
  try {
    const { query } = req.query

    if (!query || query.trim() === '') {
      return res.status(400).json({ message: 'Search query is required' })
    }

    // Search files and folders by name (case-insensitive)
    const files = await File.find({
      userId: req.userId,
      name: { $regex: query, $options: 'i' }
    })
      .sort({ isFolder: -1, createdAt: -1 })
      .lean()

    res.json(files)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getUploadMiddleware = () => upload.single('file')

export default {
  uploadFile,
  getFiles,
  deleteFile,
  downloadFile,
  createFolder,
  renameFile,
  getFolderPath,
  searchFiles,
  getUploadMiddleware,
}
