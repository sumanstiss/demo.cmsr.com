import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/demo.cmsr.com/', // <--- replace REPO_NAME with your repo name
  plugins: [react()]
})

