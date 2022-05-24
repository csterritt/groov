<template>
  <div
    class="flex flex-row items-center min-h-16 md:mt-2 mb-4 md:mx-4 shadow-lg bg-secondary text-neutral-content md:rounded-box"
  >
    <div class="flex-1 px-2 mx-2">
      <span class="text-lg font-bold">Groov</span>
    </div>
  </div>

  <div class="mx-6">
    <h1 class="text-3xl font-bold underline">The Groove Grid</h1>

    <div class="divider"></div>

    <div class="mt-4">
      <div id="top-left"></div>

      <svg
        :width="store.width"
        :height="store.height"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100%" height="100%" fill="#ddb" />

        <g v-for="line in store.linesAndHeights" :key="line.id">
          <line
            :x1="line.x1"
            :y1="line.y1"
            :x2="line.x2"
            :y2="line.y2"
            stroke="black"
            stroke-width="4"
            :stroke-dasharray="line.dashed ? 4 : 0"
          />
        </g>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

import { useStore } from './stores/groovStore.js'

const store = useStore()

onMounted(() => {
  store.setWidthAndHeightFromViewport()
  const topLeftRect = document
    .getElementById('top-left')
    .getBoundingClientRect()
  store.setTopLeft(topLeftRect)
})
</script>
