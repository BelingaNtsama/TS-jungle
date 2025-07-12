import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from "@tailwindcss/vite"
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
   resolve: {
    alias: {
    "@components": path.resolve(__dirname, "./src/components"),
    "@hooks": path.resolve(__dirname, "./src/hooks"),
    "@pages": path.resolve(__dirname, "./src/pages"),
    "@services": path.resolve(__dirname, "./src/services"),
    "@utils": path.resolve(__dirname, "./src/utils"),
    "@stores": path.resolve(__dirname, "./src/stores"),
    "@layouts": path.resolve(__dirname, "./src/layouts"),
    "@mockStore" : path.resolve(__dirname, './src/mockStore'),
    "@admin" : path.resolve(__dirname, './src/admin'),
    "@assets" : path.resolve(__dirname, "./src/assets")
    },
  },
})
