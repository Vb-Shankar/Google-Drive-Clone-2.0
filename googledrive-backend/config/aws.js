import AWS from 'aws-sdk'

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})

export const uploadToS3 = async (file) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'private',
  }

  try {
    const result = await s3.upload(params).promise()
    return result
  } catch (error) {
    throw new Error(`S3 Upload Error: ${error.message}`)
  }
}

export const deleteFromS3 = async (key) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  }

  try {
    await s3.deleteObject(params).promise()
  } catch (error) {
    throw new Error(`S3 Delete Error: ${error.message}`)
  }
}

export const getSignedUrl = async (key) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Expires: 3600,
  }

  try {
    const url = s3.getSignedUrl('getObject', params)
    return url
  } catch (error) {
    throw new Error(`S3 URL Error: ${error.message}`)
  }
}

export default s3
