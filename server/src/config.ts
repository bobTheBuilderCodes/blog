import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

dotenv.config({ path: resolve(dirname(fileURLToPath(import.meta.url)), '../../.env') })

export const env = {
  port: Number(process.env.PORT || 4000),
  mongoUri: process.env.MONGODB_URI || '',
  clientUrl: process.env.CLIENT_URL || '',
  siteUrl: process.env.PUBLIC_SITE_URL || process.env.CLIENT_URL || '',
  cookieSecret: process.env.COOKIE_SECRET || '',
  adminEmail: process.env.ADMIN_EMAIL || '',
  adminPassword: process.env.ADMIN_PASSWORD || '',
  demoMode: process.env.ADMIN_DEMO_MODE === 'true',
  mediaProvider: process.env.MEDIA_PROVIDER || 'cloudinary',
  cloudinary: { cloudName: process.env.CLOUDINARY_CLOUD_NAME || '', apiKey: process.env.CLOUDINARY_API_KEY || '', apiSecret: process.env.CLOUDINARY_API_SECRET || '' },
  production: process.env.NODE_ENV === 'production'
}
export async function connectDatabase(){if(!env.mongoUri)throw new Error('MONGODB_URI is required. Copy .env.example to .env and configure MongoDB.');await mongoose.connect(env.mongoUri);console.log('Connected to MongoDB')}
