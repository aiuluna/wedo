import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(async () => {
  // commonjs的模块需要动态引入
  const pluginYaml = await import('vite-plugin-yaml2')
  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, './src')
      }
    },
    build: {
      target: 'esnext',
    },
    plugins: [react(), pluginYaml.default()]
  }
})