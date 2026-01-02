import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 部署到 https://<user>.github.io/zonui-3b/ 的 base 設定
  base: '/zonui-3b/',
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});