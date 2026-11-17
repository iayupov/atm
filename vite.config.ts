import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
 build:{
  rollupOptions:{
   input:{main:resolve(import.meta.dirname,'index.html'),types:resolve(import.meta.dirname,'types/index.html')},
  },
 },
})
