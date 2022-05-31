<template>
  <div
    class="flex flex-row items-center min-h-16 md:mt-2 mb-4 md:mx-4 shadow-lg bg-secondary text-neutral-content md:rounded-box"
  >
    <div class="flex-1 px-2 mx-2">
      <span class="text-lg font-bold">Groov</span>
    </div>
  </div>

  <div class="flex flex-col flex-grow mx-6">
    <h1 class="text-3xl font-bold">The Groove Grid</h1>

    <div class="divider"></div>

    <div class="flex flex-col flex-grow">
      <div id="top-left"></div>

      <svg
        class="flex-grow w-full"
        width="200"
        height="200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100%" height="100%" fill="#ddb" />

        <g v-for="line in store.linesAndHeights" :key="line.id">
          <template v-if="line.visible">
            <line
              :x1="line.x1"
              :y1="line.y1"
              :x2="line.x2"
              :y2="line.y2"
              stroke="black"
              stroke-width="5"
              :stroke-dasharray="line.dashed ? 4 : 0"
            />

            <beat-circle
              v-if="!line.dashed"
              :id="line.id"
              :cx="line.x1"
              :cy="line.y2"
            />

            <circle
              v-if="!line.dashed"
              :cx="line.x1"
              :cy="line.y1 - 8"
              r="14"
              fill="#ddb"
              stroke="black"
              stroke-width="2"
            />

            <text
              :x="line.x1"
              :y="line.y1"
              font-size="24"
              text-anchor="middle"
              fill="black"
            >
              {{ line.label }}
            </text>
          </template>
        </g>
      </svg>

      <div id="bottom-left"></div>
    </div>

    <div class="divider"></div>

    <div class="mb-4">
      <controls-area />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUpdated } from 'vue'

import { useStore } from './stores/groovStore.js'
import BeatCircle from './components/BeatCircle.vue'
import ControlsArea from './components/ControlsArea.vue'

const store = useStore()

const updateDimensions = () => {
  store.setWidthAndHeightFromViewport()
  const topLeftRect = document
    .getElementById('top-left')
    .getBoundingClientRect()
  const bottomLeftRect = document
    .getElementById('bottom-left')
    .getBoundingClientRect()
  store.setTopAndBottom(topLeftRect, bottomLeftRect)
}

onMounted(() => {
  updateDimensions()
})

onUpdated(() => {
  updateDimensions()
})
</script>
