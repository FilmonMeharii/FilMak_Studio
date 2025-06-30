import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/FilMak_Studio/',  // <--- THIS is key for correct asset paths on GitHub Pages
  plugins: [react()],
});
