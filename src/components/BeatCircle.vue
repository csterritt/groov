<template>
  <circle
    :cx="cx"
    :cy="cy"
    r="14"
    :fill="fillValue()"
    :stroke="strokeColor"
    stroke-width="2"
    @click="onClick"
  />
</template>

<script setup>
import { useStore } from '../stores/groovStore'

const props = defineProps({
  id: Number,
  cx: Number,
  cy: Number,
  strokeColor: String,
})

const store = useStore()

const fillUnselected = '#ddb'
const fillSelected = '#dd4548'

const isLineSelected = store.isLineSelected

const fillValue = () =>
  isLineSelected(props.id) ? fillSelected : fillUnselected

const onClick = () => {
  store.toggleLineSelected(props.id)
}
</script>
