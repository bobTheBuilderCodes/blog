import { z } from 'zod'
export const visitorSchema=z.object({visitorId:z.string().uuid()})
export const commentSchema=z.object({name:z.string().trim().min(2).max(60),content:z.string().trim().min(3).max(1500)})
export const loginSchema=z.object({email:z.string().email(),password:z.string().min(1).max(200)})
const cover=z.object({url:z.string().url(),alt:z.string().trim().min(3).max(200),width:z.number().optional(),height:z.number().optional()})
export const articleSchema=z.object({title:z.string().trim().min(3).max(180),slug:z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),excerpt:z.string().trim().min(10).max(500),content:z.string().min(3),coverImage:cover.optional(),category:z.string().trim().min(2).max(50),tags:z.array(z.string().trim().max(40)).max(12).default([]),author:z.object({name:z.string().trim().min(2).max(80),avatar:z.string().url().optional().or(z.literal(''))}),status:z.enum(['draft','published']).default('draft'),featured:z.boolean().default(false)})
