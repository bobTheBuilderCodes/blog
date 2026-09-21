import { createContext, useContext, useEffect, useRef, useState } from 'react'
export const tracks = [
  {id:'quiet-piano',title:'Quiet Piano',url:'/audio/quiet-piano.mp3'}, {id:'midnight-keys',title:'Midnight Keys',url:'/audio/midnight-keys.mp3'}, {id:'rain-piano',title:'Rain & Piano',url:'/audio/rain-piano.mp3'}, {id:'sunday-morning',title:'Sunday Morning',url:'/audio/sunday-morning.mp3'}, {id:'cafe-piano',title:'Café Piano',url:'/audio/cafe-piano.mp3'}
]
type AudioState = { active:boolean; playing:boolean; track:number; volume:number; toggle:()=>void; next:()=>void; previous:()=>void; setVolume:(n:number)=>void; setTrack:(n:number)=>void; close:()=>void; progress:number; duration:number; seek:(n:number)=>void }
const Audio = createContext<AudioState | null>(null)
export function AudioProvider({children}:{children:React.ReactNode}) {
 const audio = useRef<HTMLAudioElement>(null); const [active,setActive]=useState(false); const [playing,setPlaying]=useState(false); const [track,setTrackState]=useState(()=>Number(localStorage.getItem('margin-track')||0)); const [volume,setVolumeState]=useState(()=>Number(localStorage.getItem('margin-volume')||.55)); const [progress,setProgress]=useState(0); const [duration,setDuration]=useState(0)
 useEffect(()=>{ if(audio.current) audio.current.volume=volume; localStorage.setItem('margin-volume',String(volume))},[volume])
 const setTrack=(n:number)=>{setTrackState(n); localStorage.setItem('margin-track',String(n)); setProgress(0); setActive(true); setTimeout(()=>{audio.current?.play().then(()=>setPlaying(true)).catch(()=>setPlaying(false))},0)}
 const toggle=()=>{setActive(true); if(audio.current?.paused) audio.current.play().then(()=>setPlaying(true)).catch(()=>{});else {audio.current?.pause();setPlaying(false)}}
 return <Audio.Provider value={{active,playing,track,volume,toggle,next:()=>setTrack((track+1)%tracks.length),previous:()=>setTrack((track+tracks.length-1)%tracks.length),setVolume:setVolumeState,setTrack,close:()=>{audio.current?.pause();setActive(false);setPlaying(false)},progress,duration,seek:n=>{if(audio.current)audio.current.currentTime=n}}}><audio ref={audio} src={tracks[track].url} onTimeUpdate={e=>setProgress(e.currentTarget.currentTime)} onLoadedMetadata={e=>setDuration(e.currentTarget.duration)} onEnded={()=>setTrack((track+1)%tracks.length)}/>{children}</Audio.Provider>
}
export const useAudio=()=>{const c=useContext(Audio);if(!c)throw new Error('Audio context missing');return c}
