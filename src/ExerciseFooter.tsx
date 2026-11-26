import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'

export type LessonNote = { title:string; body:string; example?:string }
export const LessonNotes = createContext<{theory?:LessonNote; culture?:LessonNote}>({})

/** A single reserved row, shared by lesson exercises and author previews. */
export function ExerciseFooter({children}:{children?:ReactNode}) {
 const notes=useContext(LessonNotes)
 const [opened,setOpened]=useState<'theory'|'culture'|null>(null)
 const dialog=useRef<HTMLDialogElement>(null)
 useEffect(()=>{if(opened)dialog.current?.showModal();else dialog.current?.close()},[opened])
 const note=opened?notes[opened]:undefined
 return <div className="exercise-footer">
  <div className="exercise-notes">
   <button type="button" aria-label="Культурная информация" onClick={()=>setOpened('culture')}><img src="/assets/lesson/culture-icon.png" alt=""/></button>
   <button type="button" aria-label="Теория" onClick={()=>setOpened('theory')}><img src="/assets/lesson/theory-icon.png" alt=""/></button>
  </div>
  <div className="exercise-footer-action">{children}</div>
  <dialog ref={dialog} className="lesson-note" onCancel={()=>setOpened(null)} onClose={()=>setOpened(null)} onClick={event=>{if(event.target===event.currentTarget)setOpened(null)}} aria-labelledby="lesson-note-title">
   <article><h2 id="lesson-note-title">{note?.title||(opened==='culture'?'Культурная информация':'Теория')}</h2>
    <p>{note?.body||'Материал для этого задания пока не добавлен автором.'}</p>
    {note?.example&&<p className="lesson-note-example">{note.example}</p>}
    <button type="button" className="secondary" onClick={()=>setOpened(null)}>Закрыть</button>
   </article>
  </dialog>
 </div>
}
