import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.js',
            name: 'OpenGameSite',
            fileName: 'opengamesite',
            formats: ['es', 'umd']
        },
        rollupOptions: {
            output: {
                assetFileNames: 'opengamesite.[ext]'
            }
        },
        cssCodeSplit: false
    }
});
