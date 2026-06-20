<template>
    <div class="playground">
        <header class="playground-header">
            <h1>Lumosaic Gallery Test Playground</h1>
            <button @click="toggleShuffle">Shuffle Images</button>
        </header>

        <main class="playground-content">
            <Lumosaic
                ref="galleryComponent"
                :images="sampleImages" />
        </main>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'

    // 1. Direct relative import of the component
    import Lumosaic from './components/Lumosaic.vue'

    // 2. Direct relative import of the styles specifically for local testing
    import './components/lumosaic.css'

    const galleryComponent = ref<InstanceType<typeof Lumosaic> | null>(null)

    // Sample image dataset to verify the grid and layout math
    const sampleImages = ref([
        { src: 'https://picsum.photos/800/600?random=1', preview: 'https://picsum.photos/800/600?random=1', width: 800, height: 600, alt: 'Landscape Image' },
        { src: 'https://picsum.photos/600/800?random=2', preview: 'https://picsum.photos/600/800?random=2', width: 600, height: 800, alt: 'Portrait Image' },
        { src: 'https://picsum.photos/1000/500?random=3', preview: 'https://picsum.photos/1000/500?random=3', width: 1000, height: 500, alt: 'Wide Panorama' },
        { src: 'https://picsum.photos/500/500?random=4', preview: 'https://picsum.photos/500/500?random=4', width: 500, height: 500, alt: 'Square Image' },
        { src: 'https://picsum.photos/700/900?random=5', preview: 'https://picsum.photos/700/900?random=5', width: 700, height: 900, alt: 'Tall Portrait' },
        { src: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', preview: 'https://picsum.photos/800/450?random=6', width: 800, height: 450, alt: 'Video Cover Test' },
        { src: 'https://picsum.photos/600/800?random=2', preview: 'https://picsum.photos/600/800?random=7', width: 600, height: 800, alt: 'Portrait Image' },
        { src: 'https://picsum.photos/1000/500?random=3', preview: 'https://picsum.photos/1000/500?random=8', width: 1000, height: 500, alt: 'Wide Panorama' },
        { src: 'https://picsum.photos/500/500?random=4', preview: 'https://picsum.photos/500/500?random=9', width: 500, height: 500, alt: 'Square Image' },
        { src: 'https://picsum.photos/700/900?random=5', preview: 'https://picsum.photos/700/900?random=99', width: 700, height: 900, alt: 'Tall Portrait' },
    ])

    function toggleShuffle() {
        galleryComponent.value?.shuffle()
    }
</script>

<style>

    /* Global playground styles */
    body {
        margin: 0;
        font-family: sans-serif;
        background-color: #121212;
        color: #ffffff;
    }

    .playground {
        max-width: 1400px;
        margin: 0 auto;
        padding: 40px 20px;
    }

    .playground-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #333;
        padding-bottom: 20px;
        margin-bottom: 30px;
    }

    button {
        background-color: #00dc82;
        border: none;
        color: #000;
        padding: 10px 20px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: bold;
    }

    button:hover {
        background-color: #00b368;
    }
</style>