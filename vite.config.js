import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/stl-collections-guide/', // <-- Make sure this line exists and is correct
})