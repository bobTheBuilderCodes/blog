import type { Article, Comment, PageResult, Category } from '../types'

const base = import.meta.env.VITE_API_URL || ''
async function request<T>(path:string, options:RequestInit = {}): Promise<T> {
  let res:Response
  try { res = await fetch(`${base}/api${path}`, { credentials:'include', headers:{ 'Content-Type':'application/json', ...(options.headers || {}) }, ...options }) } catch { throw new Error('The publication service is unavailable. Start the API and configure its environment variables.') }
  const isJson=res.headers.get('content-type')?.includes('application/json')
  const body = isJson ? await res.json().catch(() => ({ message:'Something went wrong.' })) : { message:'The publication service returned an invalid response. Check VITE_API_URL or the development API proxy.' }
  if (!isJson) throw new Error(body.message)
  if (!res.ok) throw new Error(body.message || 'Request failed')
  return body
}
export const api = {
  articles: (params = '') => request<PageResult<Article>>(`/articles${params}`),
  article: (slug:string) => request<Article>(`/articles/${slug}`),
  search: (q:string) => request<PageResult<Article>>(`/articles/search?q=${encodeURIComponent(q)}`),
  related: (id:string) => request<Article[]>(`/articles/${id}/related`),
  comments: (id:string) => request<Comment[]>(`/articles/${id}/comments`),
  postComment: (id:string, data:{name:string;content:string}) => request<Comment>(`/articles/${id}/comments`, {method:'POST',body:JSON.stringify(data)}),
  like: (id:string, visitorId:string) => request<{likesCount:number}>(`/articles/${id}/like`, {method:'POST',body:JSON.stringify({visitorId})}),
  unlike: (id:string, visitorId:string) => request<{likesCount:number}>(`/articles/${id}/like`, {method:'DELETE',body:JSON.stringify({visitorId})}),
  categories: () => request<Category[]>('/categories'),
  adminMe: () => request<{email:string}>('/admin/me'),
  login: (data:{email:string;password:string}) => request<{email:string}>('/admin/login',{method:'POST',body:JSON.stringify(data)}),
  logout: () => request<void>('/admin/logout',{method:'POST'}),
  adminArticles: () => request<Article[]>('/admin/articles'),
  saveArticle: (data:Partial<Article>, id?:string) => request<Article>(`/admin/articles${id?`/${id}`:''}`,{method:id?'PUT':'POST',body:JSON.stringify(data)}),
  deleteArticle: (id:string) => request<void>(`/admin/articles/${id}`,{method:'DELETE'}),
  setStatus: (id:string, status:'publish'|'unpublish') => request<Article>(`/admin/articles/${id}/${status}`,{method:'PATCH'}),
  adminComments: () => request<Comment[]>('/admin/comments'),
  updateComment: (id:string,status:string) => request<Comment>(`/admin/comments/${id}`,{method:'PATCH',body:JSON.stringify({status})}),
  deleteComment: (id:string) => request<void>(`/admin/comments/${id}`,{method:'DELETE'}),
  upload: async (image:File) => { const form=new FormData(); form.append('image',image); const res=await fetch(`${base}/api/admin/uploads`,{method:'POST',credentials:'include',body:form}); const body=await res.json(); if(!res.ok)throw new Error(body.message||'Upload failed'); return body as {url:string;alt:string;width?:number;height?:number} }
}
