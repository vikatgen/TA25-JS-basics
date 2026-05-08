import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
    plugins: [tailwindcss(), eslint()],
});
