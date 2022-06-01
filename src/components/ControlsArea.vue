<template>
  <div class="text-lg mb-2">Controls:</div>

  <div class="flex flex-row mb-2">
    <button class="btn btn-primary btn-sm mr-4" @click="store.clearAll">
      Clear all
    </button>

    <button class="btn btn-primary btn-sm mr-4" @click="store.clearDownbeats">
      Clear downbeats
    </button>

    <button class="btn btn-primary btn-sm mr-4" @click="store.clearEighths">
      Clear eighths
    </button>

    <button class="btn btn-primary btn-sm mr-4" @click="store.clearSixteenths">
      Clear sixteenths
    </button>
  </div>

  <div class="flex flex-row mb-2">
    <button
      class="btn btn-primary btn-sm mr-4"
      @click="store.toggleEighthsVisible"
    >
      {{ store.eighthsVisible ? 'Hide' : 'Show' }} eighths
    </button>

    <button
      class="btn btn-primary btn-sm mr-4"
      @click="store.toggleSixteenthsVisible"
      :disabled="!store.eighthsVisible"
    >
      {{ store.sixteenthsVisible ? 'Hide' : 'Show' }} sixteenths
    </button>
  </div>

  <div class="flex flex-row mb-2">
    <button class="btn btn-primary btn-sm mr-4" @click="store.randomizeAll">
      Randomize all visible
    </button>

    <button
      class="btn btn-primary btn-sm mr-4"
      @click="store.randomizeDownbeats"
    >
      Randomize downbeats
    </button>

    <button
      class="btn btn-primary btn-sm mr-4"
      @click="store.randomizeEighths"
      :disabled="!store.eighthsVisible"
    >
      Randomize eighths
    </button>

    <button
      class="btn btn-primary btn-sm mr-4"
      @click="store.randomizeSixteenths"
      :disabled="!store.eighthsVisible || !store.sixteenthsVisible"
    >
      Randomize sixteenths
    </button>
  </div>
</template>

<script setup>
import { useStore } from '../stores/groovStore'

const store = useStore()
</script>
