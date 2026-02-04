import express from 'express'
import {
  uploadFile,
  getFiles,
  deleteFile,
  downloadFile,
  createFolder,
  renameFile,
  getFolderPath,
  searchFiles,
  getUploadMiddleware,
} from '../controllers/fileController.js'
import { authMiddleware } from '../middleware/auth.js'

const router = express.Router()

// Apply auth middleware to all file routes
router.use(authMiddleware)

// Specific routes first (before :fileId routes)
router.post('/upload', getUploadMiddleware(), uploadFile)
router.post('/create-folder', createFolder)
router.get('/search', searchFiles)
router.get('/path/:folderId', getFolderPath)
router.get('/download/:fileId', downloadFile)

// Generic routes with :fileId last
router.get('/', getFiles)
router.delete('/:fileId', deleteFile)
router.put('/:fileId', renameFile)

export default router
