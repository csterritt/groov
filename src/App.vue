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
      <svg
        :width="store.width"
        :height="store.height"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100%" height="100%" fill="red" />

        <circle cx="150" cy="100" r="80" fill="green" />

        <text x="150" y="125" font-size="60" text-anchor="middle" fill="white">
          SVG
        </text>

        <line
          x1="10"
          y1="80"
          x2="100"
          y2="20"
          stroke="black"
          stroke-width="2"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { useStore } from './stores/groovStore.js'

const store = useStore()
</script>
