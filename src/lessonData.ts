export type ExerciseMode = 'fill' | 'image' | 'assemble' | 'speak' | 'pairs'
export type Exercise = { id:number; mode:ExerciseMode; instruction:string; prompt:string; audio?:string; choices?:string[]; tokens?:string[]; correct:string|string[]; answerLabel:string; explanation:string; theory?:{title:string;body:string;example:string} }
const weather=(id:number,mode:ExerciseMode,instruction:string,prompt:string,correct:string|string[],choices:string[]=[],audio?:string):Exercise=>({id,mode,instruction,prompt,correct,choices,tokens:mode==='assemble'?choices:undefined,audio,answerLabel:Array.isArray(correct)?correct.join(' '):correct,explanation:'Форма и перевод приведены по материалам урока «Һава торышы».',theory:id===1?{title:'Как описать погоду',body:'В татарском языке признак погоды часто называют после слова «көн» или без него — когда контекст уже понятен.',example:'Бүген кояшлы. — Сегодня солнечно.'}:undefined})
export const exercises:Exercise[]=[
weather(1,'fill','Выбери пропущенное слово','Бүген —.','яңгырлы',['яңгырлы','кояшлы','болытлы'],'/assets/audio/upr1.mp3'),
weather(2,'image','Выбери подходящую картинку','кояшлы','солнечно',['солнечно','облачно','дождливо','ветрено'],'/assets/audio/upr2.mp3'),
weather(3,'assemble','Переведи','Бүген кояшлы.',['Сегодня','солнечно'],['облачно','Сегодня','вчера','солнечно'],'/assets/audio/upr3.mp3'),
weather(4,'fill','Выбери пропущенное слово','Иртәгә — көн.','болытлы',['болытлы','кояшлы','яңгырлы'],'/assets/audio/upr4.mp3'),
weather(5,'image','Выбери подходящую картинку','болытлы','облачно',['облачно','солнечно','дождливо','ветрено'],'/assets/audio/upr5.mp3'),
weather(6,'assemble','Переведи','Иртәгә болытлы көн.',['Завтра','облачный','день'],['солнечно','Завтра','это','облачный','день'],'/assets/audio/upr6.mp3'),
weather(7,'fill','Выбери пропущенное слово','Бүген көн нинди?\nБүген көн —.','яңгырлы',['яңгырлы','болытлы','җилле'],'/assets/audio/upr7.mp3'),
weather(8,'image','Выбери подходящую картинку','яңгырлы','дождливо',['дождливо','облачно','солнечно','ветрено'],'/assets/audio/upr8.mp3'),
weather(9,'assemble','Переведи','Бүген көн яңгырлы.',['Сегодня','день','дождливый'],['облачно','Сегодня','ветреный','день','дождливый'],'/assets/audio/upr9.mp3'),
weather(10,'fill','Выбери подходящие слова','Көн — һәм —.',['яңгырлы','җилле'],['яңгырлы','җилле','кояшлы'],'/assets/audio/upr10.mp3'),
weather(11,'image','Выбери подходящую картинку','җилле','ветрено',['ветрено','облачно','дождливо','солнечно'],'/assets/audio/upr11.mp3'),
weather(12,'assemble','Переведи','Көн болытлы һәм җилле.',['День','облачный','и','ветреный'],['дождливый','День','вчера','облачный','и','ветреный'],'/assets/audio/upr12.mp3'),
weather(13,'fill','Выбери подходящие слова','Көндез —, ләкин кич —.',['җылы','салкын'],['җылы','салкын','җилле'],'/assets/audio/upr13.mp3'),
weather(14,'image','Выбери подходящую картинку','салкын','холодно',['холодно','тепло'],'/assets/audio/upr14.mp3'),
weather(15,'image','Выбери подходящую картинку','җылы','тепло',['холодно','тепло'],'/assets/audio/upr15.mp3'),
weather(16,'assemble','Переведи','Көндез җылы, ләкин кич салкын.',['Днём','тепло','но','вечером','холодно'],['облачно','Днём','сегодня','тепло','но','вечером','холодно'],'/assets/audio/upr16.mp3'),
weather(17,'speak','Повтори услышанное','Бүген кояшлымы, болытлымы?','recorded',[],'/assets/audio/upr17.mp3'),
weather(18,'speak','Повтори услышанное','Көн яңгырлы һәм җилле.','recorded',[],'/assets/audio/upr18.mp3'),
weather(19,'speak','Повтори услышанное','Җылы түгел, салкын.','recorded',[],'/assets/audio/upr19.mp3'),
weather(20,'pairs','Скажи на татарском','Назови явления погоды','ready',['кояшлы','болытлы','яңгырлы','җилле','җылы','салкын'])]
