import { resolve } from 'node:path'
import { copyFileSync, mkdirSync } from 'node:fs'
import { defineConfig } from 'vite'

const typeSlugs=['animation','choice','image-choice','order','repeat','pairs','chant','correction','groups','chatbot']

export default defineConfig({
 plugins:[{name:'types-routes',writeBundle(){for(const slug of typeSlugs){const folder=resolve(import.meta.dirname,'dist','types',slug);mkdirSync(folder,{recursive:true});copyFileSync(resolve(import.meta.dirname,'dist','types','index.html'),resolve(folder,'index.html'))}}}],
 build:{
  rollupOptions:{
   input:{main:resolve(import.meta.dirname,'index.html'),types:resolve(import.meta.dirname,'types/index.html')},
  },
 },
})
