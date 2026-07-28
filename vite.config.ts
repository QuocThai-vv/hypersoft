import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  build: {
    sourcemap: 'hidden',
  },
  server: {
    host: true,
    allowedHosts: [
      'localhost',
      'indexed-civic-trackback-switch.trycloudflare.com',
      '.trycloudflare.com',
    ],
  },
  plugins: [
    react({
      babel: {
        plugins: process.env.NODE_ENV === 'development' ? ['react-dev-locator'] : [],
      },
    }),
    tsconfigPaths()
  ],
  base: '/hypersoft/',
})
