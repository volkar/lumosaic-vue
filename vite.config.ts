// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [
        vue(),
        dts({
            // Generate TypeScript declaration files for the library
            insertTypesEntry: true,
            exclude: ['src/main.ts', 'src/App.vue']
        }),
    ],
    build: {
        lib: {
            // Main entry point
            entry: {
                index: resolve(__dirname, 'src/index.ts'),
                'nuxt-module': resolve(__dirname, 'src/nuxt/module.ts')
            },
            name: 'Lumosaic',
            // Define output filenames
            fileName: (format, entryName) => {
                if (entryName === 'nuxt-module') {
                    return `nuxt-module.${format}.js`
                }
                return `lumosaic.${format}.js`
            }
        },
        rollupOptions: {
            // Externalize dependencies that should not be bundled
            external: ['vue', '@nuxt/kit'],
            output: {
                exports: 'named',
                globals: {
                    vue: 'Vue'
                }
            }
        }
    }
})