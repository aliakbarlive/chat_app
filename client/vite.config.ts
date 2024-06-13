import react from '@vitejs/plugin-react-swc'
import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  return defineConfig({
    plugins: [react()],
    define: {
      'process.env': { ...process.env, ...loadEnv(mode, process.cwd()) }
    },
    server: {
      port: 3000
    }
  })
}
