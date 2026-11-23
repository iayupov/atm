export type ExerciseMode = 'fill' | 'image' | 'assemble' | 'speak' | 'pairs' | 'chatbot'
export type Exercise = { id:number; mode:ExerciseMode; instruction:string; prompt:string; audio?:string; choices?:string[]; tokens?:string[]; correct:string|string[]; answerLabel:string; explanation:string; pairItems?:{key:string;left:string;right:string}[]; theory?:{title:string;body:string;example:string} }
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
weather(20,'pairs','Отметь пары','Назови явления погоды','ready',['кояшлы','болытлы','яңгырлы','җилле','җылы','салкын']),
weather(21,'chatbot','Проговори диалог','Сәлам!','completed',[],'/assets/audio/upr21-selam.mp3')]

const salem=(id:number,mode:ExerciseMode,instruction:string,prompt:string,correct:string|string[],choices:string[]=[],extra:Partial<Exercise>={}):Exercise=>({id,mode,instruction,prompt,correct,choices,tokens:mode==='assemble'?choices:undefined,answerLabel:Array.isArray(correct)?correct.join(' '):correct,explanation:'Форма и перевод приведены по материалам урока «Сәлам».',...extra})
export const salemExercises:Exercise[]=[
 salem(1,'speak','Познакомься с героем','Бер! Ике! Өч! Сәлам, сәлам! Мин — өчпочмак!','recorded'),
 salem(2,'speak','Повтори услышанное','Шәп!','recorded'),
 salem(3,'speak','Повтори услышанное','Әкәмәт!','recorded'),
 salem(4,'image','Выбери подходящую картинку','шәп','шәп',['шәп','Әкәмәт!']),
 salem(5,'fill','Выбери подходящее слово','Сәлам, Булат! —, Артур!','Сәлам',['Сәлам','шәп','әкәмәт']),
 salem(6,'assemble','Переведи','Сәлам, Тимур!',['Привет,','Тимур!'],['здорово','Привет,','два','Тимур!','один']),
 salem(7,'pairs','Отметь пары','Скажи на татарском','ready',[],{pairItems:[{key:'one',left:'1',right:'бер'},{key:'two',left:'2',right:'ике'},{key:'three',left:'3',right:'өч'},{key:'hello',left:'👋',right:'сәлам'},{key:'great',left:'👍',right:'шәп'},{key:'wow',left:'😲',right:'әкәмәт'}]}),
 salem(8,'speak','Повтори услышанное','— Хәлләр ничек?\n— Шәп!','recorded'),
 salem(9,'assemble','Переведи','— Хәлләр ничек? — Шәп!',['Как','дела?','Отлично!'],['неплохо','Как','привет','дела?','три','Отлично!']),
 salem(10,'image','Выбери подходящую картинку','өч','3',['3','1','2']),
 salem(11,'image','Выбери подходящее слово','Өчпочмак сәхнәдән йөгереп китә','Сәлам!',['Әкәмәт!','Сәлам!','Хәлләр ничек?','Шәп!']),
 salem(12,'image','Выбери подходящую картинку','Хәлләр ничек? —','яхшы',['яхшы','шәп','ярыйсы','начар']),
 salem(13,'assemble','Послушай и расставь по порядку','Шәп! Яхшы. Ярыйсы. Начар.',['шәп','яхшы','ярыйсы','начар'],['начар','яхшы','шәп','ярыйсы']),
 salem(14,'fill','Сәлам, Тимур! Хәлләр ничек?\nСәлам! —.','начар',['начар','шәп','яхшы','ярыйсы']),
 salem(15,'image','Выбери подходящую картинку','Хәлләр ничек? Ммм, шәп!','Шәп',['Шәп','Начар']),
 salem(16,'image','Выбери подходящую картинку','ярыйсы','ярыйсы',['ярыйсы','яхшы','шәп','начар']),
 salem(17,'assemble','Переведи','— Сәлам! Хәлләр ничек?\n— Яхшы.',['Привет!','Как','дела?','Хорошо.'],['отлично','Привет!','плохо','Как','дела?','неплохо','Хорошо.']),
 salem(18,'speak','Послушай и повтори','Сәлам, сәлам! Хәлләр ничек?\nШәп! Яхшы! Ярыйсы. Хмм, начар!','recorded'),
 salem(19,'pairs','Отметь пары','Скажи на татарском','ready',[],{pairItems:[{key:'great',left:'отлично',right:'шәп'},{key:'bad',left:'плохо',right:'начар'},{key:'fine',left:'неплохо',right:'ярыйсы'},{key:'good',left:'хорошо',right:'яхшы'},{key:'hello',left:'привет',right:'сәлам'},{key:'wow',left:'вот это да',right:'әкәмәт'}]}),
 salem(20,'fill','Выбери подходящее слово','Хәлләр ничек? —','ярыйсы',['ярыйсы','сәлам','начар','яхшы']),
 salem(21,'chatbot','Ответь на реплики','Сәлам!','completed')
]
