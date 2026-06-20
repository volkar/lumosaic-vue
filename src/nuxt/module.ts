import { defineNuxtModule, addComponent } from '@nuxt/kit'

export default defineNuxtModule({
    meta: {
        name: 'lumosaic-nuxt',
        configKey: 'lumosaic'
    },
    setup(options, nuxt) {
        // Automatically register the component in the user's Nuxt app
        addComponent({
            name: 'Lumosaic',
            export: 'Lumosaic',
            filePath: 'lumosaic'
        })

        // Automatically inject the compiled CSS
        nuxt.options.css.push('lumosaic/style.css')
    }
})