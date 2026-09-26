import build from '@hono/vite-build/cloudflare-workers'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'

export default defineConfig({
  // Build id: the app compares it with /api/version to reload itself after a deploy
  define: {
    __BUILD_ID__: JSON.stringify(new Date().toISOString().slice(0, 19).replace(/[-:T]/g, ''))
  },
  plugins: [
    build(),
    devServer({
      adapter,
      entry: 'src/index.tsx'
    })
  ]
})
