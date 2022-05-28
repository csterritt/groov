<template>
  <circle
    :cx="cx"
    :cy="cy"
    r="14"
    :fill="fill"
    stroke="black"
    stroke-width="2"
    @click="onClick"
  />
</template>

<script setup>
import { ref } from 'vue'

defineProps({ cx: Number, cy: Number })

let fill = ref('#ddb')

const onClick = () => {
  if (fill.value === '#ddb') {
    fill.value = '#dbb'
  } else {
    fill.value = '#ddb'
  }
}
</script>
