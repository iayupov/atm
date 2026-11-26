import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'

export type LessonNote = { title:string; body:string; example?:string }
export const LessonNotes = createContext<{theory?:LessonNote; culture?:LessonNote}>({})

/** A single reserved row, shared by lesson exercises and author previews. */
export function ExerciseFooter({children}:{children?:ReactNode}) {
 const notes=useContext(LessonNotes)
 const hasTheory=Boolean(notes.theory?.body.trim()),hasCulture=Boolean(notes.culture?.body.trim())
 const [opened,setOpened]=useState<'theory'|'culture'|null>(null)
 const dialog=useRef<HTMLDialogElement>(null),root=useRef<HTMLDivElement>(null),closeTimer=useRef<number|undefined>(undefined),dragStart=useRef(0)
 const [closing,setClosing]=useState(false)
 const close=()=>{if(closing)return;setClosing(true);closeTimer.current=window.setTimeout(()=>{setOpened(null);setClosing(false)},window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:240)}
 useEffect(()=>()=>window.clearTimeout(closeTimer.current),[])
 useEffect(()=>{
  const element=dialog.current
  if(!opened){element?.close();return}
  const position=()=>{const host=root.current?.closest('.demo-phone,.phone');if(!host||!element)return;const rect=host.getBoundingClientRect();Object.assign(element.style,{left:`${rect.left}px`,top:`${rect.top}px`,width:`${rect.width}px`,height:`${rect.height}px`,borderRadius:getComputedStyle(host).borderRadius})}
  position();element?.showModal()
  window.addEventListener('resize',position);window.addEventListener('scroll',position,true)
  return()=>{window.removeEventListener('resize',position);window.removeEventListener('scroll',position,true)}
 },[opened])
 const note=opened?notes[opened]:undefined
 return <div className="exercise-footer" ref={root}>
  {(hasTheory||hasCulture)&&<div className="exercise-notes">
   {hasCulture&&<button type="button" aria-label="Культурная информация" onClick={()=>setOpened('culture')}><img src="/assets/lesson/culture-icon.png" alt=""/></button>}
   {hasTheory&&<button type="button" aria-label="Теория" onClick={()=>setOpened('theory')}><img src="/assets/lesson/theory-icon.png" alt=""/></button>}
  </div>}
  <div className="exercise-footer-action">{children}</div>
  <dialog ref={dialog} className={`lesson-note ${opened||''} ${closing?'closing':''}`} onCancel={event=>{event.preventDefault();close()}} onClose={()=>setOpened(null)} onClick={event=>{if(event.target===event.currentTarget)close()}} aria-labelledby="lesson-note-title">
   <article><button type="button" className="lesson-note-handle" aria-label="Закрыть карточку" onClick={close} onPointerDown={event=>{dragStart.current=event.clientY;event.currentTarget.setPointerCapture(event.pointerId)}} onPointerUp={event=>{if(event.clientY-dragStart.current>30)close()}}><span/></button><h2 id="lesson-note-title">{note?.title||(opened==='culture'?'Культурная информация':'Теория')}</h2>
    <p>{note?.body}</p>
    {note?.example&&<p className="lesson-note-example">{note.example}</p>}
   </article>
  </dialog>
 </div>
}
