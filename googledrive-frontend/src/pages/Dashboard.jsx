import React, { useState, useEffect, useContext } from 'react'
import { useDropzone } from 'react-dropzone'
import { useLocation } from 'react-router-dom'
import { FiUpload, FiFolder, FiFile, FiDownload, FiTrash2, FiChevronRight, FiPlus, FiGrid, FiList } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { fileService } from '../services/api'
import { AuthContext } from '../context/AuthContext'

export default function Dashboard() {
  const [files, setFiles] = useState([])
  const [folderName, setFolderName] = useState('')
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [currentFolderId, setCurrentFolderId] = useState(null)
  const [breadcrumb, setBreadcrumb] = useState([])
  const [showFolderInput, setShowFolderInput] = useState(false)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const { searchQuery } = useContext(AuthContext)
  const location = useLocation()

  // Reset to root when logo is clicked
  useEffect(() => {
    if (location.state?.resetToRoot) {
      setCurrentFolderId(null)
      setBreadcrumb([])
    }
  }, [location.state])

  useEffect(() => {
    loadFiles()
  }, [currentFolderId])

  useEffect(() => {
    // Perform global search when searchQuery changes
    if (searchQuery && searchQuery.trim()) {
      performSearch()
    } else {
      loadFiles()
    }
  }, [searchQuery])

  const loadFiles = async () => {
    try {
      setLoading(true)
      const response = await fileService.getFiles(currentFolderId)
      setFiles(response.data)
      
      // Load breadcrumb if in a folder
      if (currentFolderId) {
        const breadcrumbResponse = await fileService.getFolderPath(currentFolderId)
        setBreadcrumb(breadcrumbResponse.data.breadcrumb || [])
      } else {
        setBreadcrumb([])
      }
    } catch (error) {
      toast.error('Failed to load files')
    } finally {
      setLoading(false)
    }
  }

  const performSearch = async () => {
    if (!searchQuery || searchQuery.trim() === '') {
      loadFiles() // Load regular files when search is empty
      return
    }

    try {
      setLoading(true)
      const response = await fileService.searchFiles(searchQuery)
      setFiles(response.data)
    } catch (error) {
      console.error('Search error:', error)
      toast.error(error.response?.data?.message || 'Search failed')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateFolder = async () => {
    if (!folderName.trim()) {
      toast.error('Folder name cannot be empty')
      return
    }

    try {
      await fileService.createFolder(folderName, currentFolderId)
      toast.success('Folder created successfully')
      setFolderName('')
      setShowFolderInput(false)
      loadFiles()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create folder')
    }
  }

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return

    setUploading(true)
    try {
      for (const file of acceptedFiles) {
        const formData = new FormData()
        formData.append('file', file)
        if (currentFolderId) {
          formData.append('parentId', currentFolderId)
        }
        await fileService.uploadFile(formData)
      }
      toast.success('Files uploaded successfully')
      loadFiles()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to upload files')
    } finally {
      setUploading(false)
    }
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleDelete = async (fileId) => {
    if (!window.confirm('Are you sure you want to delete this file?')) return

    try {
      await fileService.deleteFile(fileId)
      toast.success('File deleted successfully')
      loadFiles()
    } catch (error) {
      toast.error('Failed to delete file')
    }
  }

  const handleDownload = async (fileId, fileName) => {
    try {
      const response = await fileService.downloadFile(fileId)
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      link.parentElement.removeChild(link)
    } catch (error) {
      toast.error('Failed to download file')
    }
  }

  const handleOpenFolder = (folderId) => {
    setCurrentFolderId(folderId)
  }

  const handleBreadcrumbClick = (folderId) => {
    setCurrentFolderId(folderId)
  }

  const handleBackToRoot = () => {
    setCurrentFolderId(null)
  }

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">My Files</h1>

      {/* Breadcrumb Navigation */}
      {currentFolderId && (
        <div className="mb-4 flex items-center gap-2 text-sm">
          <button onClick={handleBackToRoot} className="text-blue-600 hover:underline">
            My Drive
          </button>
          {breadcrumb.map((item, index) => (
            <div key={item.id} className="flex items-center gap-2">
              <FiChevronRight className="text-gray-400" />
              {index === breadcrumb.length - 1 ? (
                <span className="text-gray-700 font-semibold">{item.name}</span>
              ) : (
                <button 
                  onClick={() => handleBreadcrumbClick(item.id)} 
                  className="text-blue-600 hover:underline"
                >
                  {item.name}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Remove Create Folder Section */}

      {/* Floating Action Buttons - Bottom Right */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3 items-end">
        {/* New Folder Button */}
        <div className="relative">
          {showFolderInput && (
            <div className="absolute bottom-16 right-0 bg-white p-4 rounded-lg shadow-xl w-64">
              <input
                type="text"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="Folder name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleCreateFolder()}
                autoFocus
              />
              <div className="flex gap-2 mt-2">
                <button 
                  onClick={handleCreateFolder}
                  className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
                >
                  Create
                </button>
                <button 
                  onClick={() => {
                    setShowFolderInput(false)
                    setFolderName('')
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          <button 
            onClick={() => setShowFolderInput(!showFolderInput)}
            className="group bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded-full shadow-lg transition-all hover:scale-105 flex items-center gap-2 hover:rounded-3xl hover:pr-6"
            title="Create new folder"
          >
            <FiFolder className="text-2xl" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap font-semibold">
              New Folder
            </span>
          </button>
        </div>

        {/* Upload Button */}
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <button 
            className="group bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all hover:scale-105 flex items-center gap-2 hover:rounded-3xl hover:pr-6"
            title="Upload files"
            disabled={uploading}
          >
            {uploading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
            ) : (
              <>
                <FiUpload className="text-2xl" />
                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap font-semibold">
                  Upload Files
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Files List Section */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Files & Folders</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              title="Grid view"
            >
              <FiGrid className="text-xl" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              title="List view"
            >
              <FiList className="text-xl" />
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : files.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            {searchQuery ? 'No files or folders found matching your search' : 'No files or folders yet'}
          </p>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {files.map((file) => (
              <div
                key={file._id}
                className="border rounded-lg p-4 hover:shadow-lg transition cursor-pointer group"
              >
                <div className="flex flex-col items-center">
                  {file.isFolder ? (
                    <div onClick={() => handleOpenFolder(file._id)} className="w-full flex flex-col items-center">
                      <FiFolder className="text-6xl text-yellow-500 mb-2" />
                      <p className="text-sm font-medium text-center truncate w-full">{file.name}</p>
                    </div>
                  ) : (
                    <>
                      <FiFile className="text-6xl text-blue-500 mb-2" />
                      <p className="text-sm font-medium text-center truncate w-full">{file.name}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {file.size ? `${(file.size / 1024).toFixed(2)} KB` : '-'}
                      </p>
                    </>
                  )}
                  <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition">
                    {!file.isFolder && (
                      <button
                        onClick={() => handleDownload(file._id, file.name)}
                        className="p-2 text-green-600 hover:bg-green-100 rounded"
                        title="Download"
                      >
                        <FiDownload />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(file._id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded"
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Size</th>
                  <th className="px-4 py-2 text-left">Created</th>
                  <th className="px-4 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 flex items-center gap-2">
                      {file.isFolder ? (
                        <>
                          <FiFolder className="text-yellow-500" />
                          <button 
                            onClick={() => handleOpenFolder(file._id)}
                            className="text-blue-600 hover:underline cursor-pointer"
                          >
                            {file.name}
                          </button>
                        </>
                      ) : (
                        <>
                          <FiFile className="text-blue-500" />
                          <span>{file.name}</span>
                        </>
                      )}
                    </td>
                    <td className="px-4 py-3">{file.isFolder ? 'Folder' : 'File'}</td>
                    <td className="px-4 py-3">{file.size ? `${(file.size / 1024).toFixed(2)} KB` : '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {new Date(file.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right flex gap-2 justify-end">
                      {!file.isFolder && (
                        <button
                          onClick={() => handleDownload(file._id, file.name)}
                          className="p-2 text-green-600 hover:bg-green-100 rounded"
                          title="Download"
                        >
                          <FiDownload />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(file._id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
