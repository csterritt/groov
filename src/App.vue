<template>
  <div
    class="flex flex-row items-center min-h-16 md:mt-2 mb-4 md:mx-4 shadow-lg bg-secondary text-neutral-content md:rounded-box"
  >
    <div class="flex-1 px-2 mx-2">
      <span class="text-lg font-bold">Groov</span>
    </div>
  </div>

  <div class="mx-6">
    <h1 class="text-3xl font-bold underline">Hello {{ store.name }}!</h1>

    <div class="divider"></div>

    <div class="mb-4">Count: {{ store.counter }}</div>

    <button class="btn btn-primary" @click="incrementCount">Cool!</button>
  </div>
</template>

<script setup>
import { useStore } from './stores/groovStore.js'

const store = useStore()

const incrementCount = () => {
  store.increment()
}
</script>
