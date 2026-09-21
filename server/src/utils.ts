import crypto from 'crypto'
import sanitizeHtml from 'sanitize-html'
import type { Request, Response, NextFunction } from 'express'
import { env } from './config.js'
import { AdminSession } from './models.js'
export const cleanContent=(html:string)=>sanitizeHtml(html,{allowedTags:['p','br','strong','b','em','i','a','h1','h2','h3','blockquote','ul','ol','li','hr','figure','figcaption','img'],allowedAttributes:{a:['href','target','rel'],img:['src','alt'],figure:['class']},allowedSchemes:['http','https','mailto']})
export const hash=(input:string)=>crypto.createHash('sha256').update(input).digest('hex')
export const readingTime=(html:string)=>Math.max(1,Math.ceil(html.replace(/<[^>]*>/g,' ').trim().split(/\s+/).filter(Boolean).length/220))
export async function requireAdmin(req:Request,res:Response,next:NextFunction){try{const token=req.signedCookies?.margin_session;if(!token)return res.status(401).json({message:'Sign in is required.'});const session=await AdminSession.findOne({tokenHash:hash(token),expiresAt:{$gt:new Date()}});if(!session)return res.status(401).json({message:'Your session has expired.'});next()}catch{res.status(401).json({message:'Sign in is required.'})}}
export const cookieOptions={httpOnly:true,sameSite:'lax' as const,secure:env.production,signed:true,path:'/',maxAge:1000*60*60*24*14}
export const asyncRoute=(fn:(req:Request,res:Response,next:NextFunction)=>Promise<unknown>)=>(req:Request,res:Response,next:NextFunction)=>void fn(req,res,next).catch(next)
