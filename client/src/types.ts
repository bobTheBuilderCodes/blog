export type Cover = { url: string; alt: string; width?: number; height?: number }
export type Article = { _id: string; title: string; slug: string; excerpt: string; content: string; coverImage: Cover; category: string; tags: string[]; author: { name: string; avatar?: string }; status: 'draft'|'published'; featured: boolean; readingTime: number; likesCount: number; commentsCount: number; viewsCount?: number; publishedAt?: string; createdAt: string; updatedAt: string }
export type Comment = { _id:string; name:string; content:string; status:'visible'|'pending'|'hidden'; createdAt:string }
export type Category = { name: string; count: number }
export type PageResult<T> = { data: T[]; page: number; total: number; pages: number }
