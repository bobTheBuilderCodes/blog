export const date = (value?:string) => value ? new Intl.DateTimeFormat('en-US',{month:'long',day:'numeric',year:'numeric'}).format(new Date(value)) : 'Unpublished'
export const shortDate = (value?:string) => value ? new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric'}).format(new Date(value)) : ''
export const readingTime = (html:string) => Math.max(1, Math.ceil(html.replace(/<[^>]+>/g,' ').trim().split(/\s+/).length / 220))
export const visitor = () => { let id = localStorage.getItem('margin-visitor'); if (!id) { id = crypto.randomUUID(); localStorage.setItem('margin-visitor', id) }; return id }
export const slugify = (value:string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')
