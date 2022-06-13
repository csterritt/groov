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

        <line
          :x1="minXmaxXmaxY.minX"
          :y1="minXmaxXmaxY.maxY"
          :x2="minXmaxXmaxY.maxX"
          :y2="minXmaxXmaxY.maxY"
          stroke="black"
          stroke-width="5"
          :stroke-dasharray="false"
        />

        <g v-for="line in store.linesAndHeights" :key="line.id">
          <template v-if="line.visible">
            <line
              :x1="line.x"
              :y1="line.y1 + 2"
              :x2="line.x"
              :y2="line.y2"
              :stroke="line.selected ? BLACK : GRAY"
              stroke-width="5"
              :stroke-dasharray="line.dashed ? 4 : 0"
            />

            <beat-circle
              v-if="!line.dashed"
              :id="line.id"
              :cx="line.x"
              :cy="line.y2"
              :stroke-color="line.selected ? BLACK : GRAY"
            />

            <circle
              v-if="!line.dashed"
              :cx="line.x"
              :cy="line.y1"
              r="14"
              fill="#ddb"
              :stroke="line.selected ? BLACK : GRAY"
              stroke-width="2"
            />

            <text
              :x="line.x"
              :y="line.y1 + 7"
              font-size="24"
              text-anchor="middle"
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
import { onMounted, onUpdated, ref } from 'vue'

import { useStore } from './stores/groovStore.js'
import BeatCircle from './components/BeatCircle.vue'
import ControlsArea from './components/ControlsArea.vue'

const store = useStore()
let minXmaxXmaxY = ref(store.minXmaxXmaxY)
const BLACK = ref('black')
const GRAY = ref('#aaa')

const updateDimensions = () => {
  store.setWidthAndHeightFromViewport()
  const topLeftRect = document
    .getElementById('top-left')
    .getBoundingClientRect()
  const bottomLeftRect = document
    .getElementById('bottom-left')
    .getBoundingClientRect()
  store.setTopAndBottom(topLeftRect, bottomLeftRect)
  minXmaxXmaxY.value = store.minXmaxXmaxY
}

onMounted(() => {
  updateDimensions()
})

onUpdated(() => {
  updateDimensions()
})
</script>
