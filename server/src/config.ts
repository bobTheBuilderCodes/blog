import 'dotenv/config'
import mongoose from 'mongoose'

export const env = {
  port: Number(process.env.PORT || 4000),
  mongoUri: process.env.MONGODB_URI || '',
  clientUrl: process.env.CLIENT_URL || '',
  siteUrl: process.env.PUBLIC_SITE_URL || process.env.CLIENT_URL || '',
  cookieSecret: process.env.COOKIE_SECRET || '',
  adminEmail: process.env.ADMIN_EMAIL || '',
  adminPassword: process.env.ADMIN_PASSWORD || '',
  mediaProvider: process.env.MEDIA_PROVIDER || 'cloudinary',
  cloudinary: { cloudName: process.env.CLOUDINARY_CLOUD_NAME || '', apiKey: process.env.CLOUDINARY_API_KEY || '', apiSecret: process.env.CLOUDINARY_API_SECRET || '' },
  production: process.env.NODE_ENV === 'production'
}
export async function connectDatabase(){if(!env.mongoUri)throw new Error('MONGODB_URI is required. Copy .env.example to .env and configure MongoDB.');await mongoose.connect(env.mongoUri);console.log('Connected to MongoDB')}
