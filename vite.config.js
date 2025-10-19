import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/stl-collections/', // ⚠️ change this to match your new repo name
})
