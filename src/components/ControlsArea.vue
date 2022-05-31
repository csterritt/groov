<template>
  <div class="text-lg mb-2">Controls:</div>

  <div class="flex flex-row mb-2">
    <button class="btn btn-primary btn-sm mr-4">Clear all</button>
    <button class="btn btn-primary btn-sm mr-4">Clear downbeats</button>
    <button class="btn btn-primary btn-sm mr-4">Clear eighths</button>
    <button class="btn btn-primary btn-sm mr-4">Clear sixteenths</button>
  </div>

  <div class="flex flex-row mb-2">
    <button class="btn btn-primary btn-sm mr-4" @click="onToggleEighthsClick">
      {{ store.eighthsVisible ? 'Hide' : 'Show' }} eighths
    </button>

    <button
      class="btn btn-primary btn-sm mr-4"
      @click="onToggleSixteenthsClick"
      :disabled="eighthsAreHidden()"
    >
      {{ store.sixteenthsVisible ? 'Hide' : 'Show' }} sixteenths
    </button>
  </div>

  <div class="flex flex-row mb-2">
    <button class="btn btn-primary btn-sm mr-4">Randomize all visible</button>
    <button class="btn btn-primary btn-sm mr-4">Randomize downbeats</button>
    <button class="btn btn-primary btn-sm mr-4">Randomize eighths</button>
    <button class="btn btn-primary btn-sm mr-4">Randomize sixteenths</button>
  </div>
</template>

<script setup>
import { useStore } from '../stores/groovStore'

const store = useStore()

const onToggleEighthsClick = () => {
  store.toggleEighthsVisible()
}

const onToggleSixteenthsClick = () => {
  store.toggleSixteenthsVisible()
}

const eighthsAreHidden = () => !store.eighthsVisible
</script>
