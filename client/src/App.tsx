import { Routes, Route } from 'react-router-dom'
import { Header, Footer, AudioPlayer } from './components'
import { About, Archive, ArticlePage, CategoryPage, Home, SearchPage } from './pages'
import { ArticleEditor, Login, StudioArticleDetail, StudioArticles, StudioDashboard, StudioLayout, StudioSettings } from './studio'
import { PublicationIdentity } from './PublicationIdentity'

function Public({children}:{children:React.ReactNode}){return <><Header/>{children}<Footer/><AudioPlayer/></>}
function NotFound(){return <Public><main className="wrap" style={{padding:'80px 0'}}><div className="eyebrow">404</div><h1 className="display" style={{fontSize:'4rem'}}>Lost in the margins.</h1><p>This page doesn’t exist, but there are still plenty of stories worth finding.</p></main></Public>}
export default function App(){return <><PublicationIdentity/><Routes><Route path="/" element={<Public><Home/></Public>}/><Route path="/blog/:slug" element={<Public><ArticlePage/></Public>}/><Route path="/archive" element={<Public><Archive/></Public>}/><Route path="/category/:category" element={<Public><CategoryPage/></Public>}/><Route path="/search" element={<Public><SearchPage/></Public>}/><Route path="/about" element={<Public><About/></Public>}/><Route path="/studio/login" element={<Login/>}/><Route path="/studio" element={<StudioLayout/>}><Route index element={<StudioDashboard/>}/><Route path="articles" element={<StudioArticles/>}/><Route path="articles/new" element={<ArticleEditor/>}/><Route path="articles/:id" element={<StudioArticleDetail/>}/><Route path="articles/:id/edit" element={<ArticleEditor/>}/><Route path="settings" element={<StudioSettings/>}/></Route><Route path="*" element={<NotFound/>}/></Routes></>}
