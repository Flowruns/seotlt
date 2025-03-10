import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


/**
 * Настройка Vite
 */
export default defineConfig({
    
    // Добавляем плагин `react()`
    plugins: [react()],
});