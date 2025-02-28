import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/frontend/dist/', // Alinea las rutas con el Directorio Raíz de Render
});