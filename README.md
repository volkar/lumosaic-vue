# Lumosaic Vue

**Adaptive, data-driven image and video mosaic gallery with intelligent row layout for Vue 3 and Nuxt 4**

Lumosaic is a lightweight Vue 3 / Nuxt 4 component that automatically arranges photos of any orientation into perfectly aligned rows spanning the full screen width. It intelligently calculates image dimensions and creates a beautiful, responsive gallery layout without relying on external CSS frameworks.

![Preview](https://github.com/volkar/lumosaic/blob/main/preview.jpg?raw=true)

## Live demo

See it in action: [lumosaic.syntheticsymbiosis.com](https://lumosaic.syntheticsymbiosis.com)

## Features

-   **Vue 3 & Nuxt 4 Ready** - Native component for modern reactive applications.
-   **Intelligent Layout** - Automatically arranges images into perfectly aligned rows.
-   **Responsive Design** - Adapts to different screen sizes with customizable row heights.
-   **Auto Dimension Detection** - Automatically retrieves image dimensions from image files (PNG, JPEG, WebP) if missing.
-   **Event-Driven Architecture** - Emits clean events for seamless integration with lightboxes.
-   **Highly Configurable** - Extensive props for customization.
-   **Lightweight** - Clean TypeScript core, zero heavy dependencies.

## Installation

Install the package via npm:

```bash
npm install lumosaic
```

## Quick Start

### Vue 3

1. Import the global CSS in your main entry file (e.g., `main.ts`):

```ts
import { createApp } from 'vue'
import App from './App.vue'
import 'lumosaic/dist/style.css' // Import styles

createApp(App).mount('#app')
```

2. Use the component in your templates:

```ts
<template>
  <Lumosaic :images="images" :gap="8" />
</template>

<script setup lang="ts">
import { Lumosaic } from 'lumosaic'

const images = [
    { src: "[https://picsum.photos/800/600?random=1](https://picsum.photos/800/600?random=1)", width: 800, height: 600 },
    { src: "[https://picsum.photos/600/800?random=2](https://picsum.photos/600/800?random=2)", width: 600, height: 800 },
    { src: "[https://picsum.photos/800/800?random=3](https://picsum.photos/800/800?random=3)", width: 800, height: 800 }
]
</script>
```

### Nuxt 4

Lumosaic comes with a built-in Nuxt module. Simply add it to your `nuxt.config.ts`. The module automatically registers the component and injects the CSS.

```ts
export default defineNuxtConfig({
  modules: [
    'lumosaic/nuxt'
  ]
})
```

Now you can use `<Lumosaic />` anywhere in your Nuxt app without manually importing it!

## Props (Options)

Customize the gallery by passing props to the `<Lumosaic>` component.

### Row Height Props

|Property   |Type   |Default   |Description   |
|---|---|---|---|
|`row-height-sm`   |Number   |`0.25`   |Height/width desired row ratio for mobile devices (screen width < 768px)   |
|`row-height-md`   |Number   |`0.2`   |Height/width desired row ratio for medium devices (screen width >= 768px and < 1024px)   |
|`row-height-xl`   |Number   |`0.18`   |Height/width desired row ratio for extra large devices (screen width >= 1024px)   |
|`row-height`   |Number   |`undefined`   |Generic ratio for all screen sizes (overwrites SM, MD, and XL if provided)   |

### Image Configuration

|Property   |Type   |Default   |Description   |
|---|---|---|---|
|`should-retrieve-width-and-height`|Boolean|`false`|If `true`, automatically fetches dimensions from the file when missing|
|`fallback-image-width`|Number|`1000`|Fallback width in pixels if dimensions cannot be retrieved|
|`fallback-image-height`|Number|`1000`|Fallback height in pixels if dimensions cannot be retrieved|
|`max-image-ratio`|Number|`1.6`|Maximum width/height ratio allowed for images|
|`min-image-ratio`|Number|`0.65`|Minimum width/height ratio allowed for images|

### Layout Props

|Property   |Type   |Default   |Description   |
|---|---|---|---|
|`max-rows`|Number|`0`|Maximum number of rows to display. Set to `0` for no limit|
|`stretch-last-row`|Boolean|`true`|Stretches the last row to fill the container|
|`shuffle-images`|Boolean|`false`|Shuffles images randomly before rendering|
|`gap`|Number|`4`|Gap in pixels between images (horizontal and vertical)|
|`play-button-on-video-cover`|Boolean|`true`|Displays a play icon over video files|
|`observe-window-width`|Boolean|`true`|Re-renders the gallery layout on window resize|

## Events

The component emits events that allow you to react to user interactions without tightly coupling logic.

`@image-click`
Fired when an image or video in the gallery is clicked.

**Payload:**
- `index` (Number): The global index of the clicked item in the `images` array.
- `images` (Array): The complete array of image objects currently rendered.

## Exposed Methods

You can trigger internal core logic directly by assigning a Template Ref to the component.

```ts
<template>
  <Lumosaic ref="myGallery" :images="images" />
  <button @click="shuffleGallery">Shuffle!</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Lumosaic } from 'lumosaic'

const myGallery = ref<InstanceType<typeof Lumosaic> | null>(null)

function shuffleGallery() {
  myGallery.value?.shuffle()
}
</script>
```

Available exposed methods:
- `shuffle()`: Instantly shuffles the current grid layout.

## Image Object Interface

The `images` prop expects an array of objects.

### Image Configuration

|Prop   |Type   |Required   |Description   |
|---|---|---|---|
|`src`|String|`Yes`|Full-size image or video URL|
|`preview`|String|`No`|Preview/thumbnail URL (defaults to `src` if omitted)|
|`width`||`Recommended`|Image width in pixels|
|`height`||`Recommended`|Image height in pixels|
|`alt`|String|`No`|Alt text for accessibility|
|`title`|String|`No`|Title attribute|
|`exif`|Object|`No`|EXIF object that can be returned stringified with `@image-click` event|

Example:

```ts
{
    src: "[https://example.com/full-size.jpg](https://example.com/full-size.jpg)",
    preview: "[https://example.com/preview.jpg](https://example.com/preview.jpg)",
    width: 1920,
    height: 1080,
    alt: "Beautiful landscape"
}
```

## Integration with Obsidium Lightbox

Lumosaic is designed to work perfectly with lightboxes like [Obsidium](https://obsidium.syntheticsymbiosis.com). Since Lumosaic exposes the `@image-click` event, you can keep a single instance of your lightbox at the root of your application and feed data to it from multiple galleries.

```ts
<template>
  <div>
    <Lumosaic :images="vacationImages" @image-click="openLightbox" />

    <Lumosaic :images="workImages" @image-click="openLightbox" />

    <Obsidium ref="lightbox" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const lightbox = ref(null)
const vacationImages = [ /* ... */ ]
const workImages = [ /* ... */ ]

// Handle the event emitted by Lumosaic
function openLightbox(index: number, currentImages: any[]) {
  // Pass the images and starting index to your lightbox
  lightbox.value?.open(currentImages, index)
}
</script>
```

## ❤️ Support

Lumosaic is completely free and open-source. If it made your frontend work a little brighter, you can fuel its future updates via the **Sponsor** button or through my [Support Page](https://support.syntheticsymbiosis.com).

Your contributions go directly towards project maintenance, late-night caffeine, and I will *definitely* not use them to save up for a 1969 Ford Mustang. Promise.

## License

Released under the [MIT License](https://www.google.com/search?q=MIT%20LICENSE).

## Links

- [Documentation & Demo](https://lumosaic.syntheticsymbiosis.com/)
- [GitHub Repository](https://github.com/volkar/lumosaic-vue)