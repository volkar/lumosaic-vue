<template>
    <div ref="galleryContainer" class="lumosaic-wrapper"></div>
</template>

<script setup lang="ts">
    import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
    import { Lumosaic, type LumosaicOptions, type LumosaicImage, defaultLumosaicOptions } from './lumosaic'

    interface Props extends Partial<LumosaicOptions> {
        images: Partial<LumosaicImage>[]
    }

    const props = withDefaults(defineProps<Props>(), defaultLumosaicOptions)

    const emit = defineEmits<{
        (e: 'image-click', index: number, images: Partial<LumosaicImage>[]): void
    }>()

    const galleryContainer = ref<HTMLElement | null>(null)

    let lumosaicInstance: Lumosaic | null = null

    onMounted(() => {
        if (!galleryContainer.value) return

        const { images, ...options } = props

        // Pass the unwrapped template ref directly
        lumosaicInstance = new Lumosaic(galleryContainer.value, images)

        galleryContainer.value.addEventListener('click', (event) => {
            const target = event.target as HTMLElement
            const item = target.closest('.lumosaic-item')

            if (item && galleryContainer.value) {
                // Query all items within this specific gallery instance
                const allItems = Array.from(galleryContainer.value.querySelectorAll('.lumosaic-item'))

                // Find the global index corresponding to the original images array
                const clickedIndex = allItems.indexOf(item as HTMLElement)

                if (clickedIndex !== -1) {
                    // Emit the event to the parent component
                    emit('image-click', clickedIndex, props.images)
                }
            }
        })

        lumosaicInstance.init(options)
    })

    // Cleanup ResizeObservers and DOM references to prevent memory leaks
    onBeforeUnmount(() => {
        if (lumosaicInstance) {
            lumosaicInstance.destroy()
            lumosaicInstance = null
        }
    })

    // Watch for changes in the images array and update
    watch(
        () => props.images,
        (newImages) => {
            if (lumosaicInstance) {
                lumosaicInstance.replaceImages(newImages)
            }
        },
        { deep: true }
    )

    // Watch for changes in options
    watch(
        () => {
            const { images, ...rest } = props
            return rest
        },
        (newOptions) => {
            if (lumosaicInstance) {
                lumosaicInstance.updateOptions(newOptions)
            }
        },
        { deep: true }
    )

    // Expose shuffle method
    defineExpose({
        shuffle: () => {
            if (lumosaicInstance) {
                lumosaicInstance.shuffleImages()
            }
        }
    })
</script>