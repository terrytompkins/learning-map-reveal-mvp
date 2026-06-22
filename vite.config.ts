import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' keeps generated asset URLs relative, which makes the build portable
// across local preview, GitHub Pages project sites, and static file hosting.
export default defineConfig({
  base: './',
  plugins: [react()],
});
