<template>
  <circle
    :cx="cx"
    :cy="cy"
    r="14"
    :fill="fillValue()"
    stroke="black"
    stroke-width="2"
    @click="onClick"
  />
</template>

<script setup>
import { useStore } from '../stores/groovStore'

const props = defineProps({ id: Number, cx: Number, cy: Number })

const store = useStore()

const fillUnselected = '#ddb'
const fillSelected = '#dbb'

const isLineSelected = store.isLineSelected

const fillValue = () =>
  isLineSelected(props.id) ? fillSelected : fillUnselected

const onClick = () => {
  store.toggleLineSelected(props.id)
}
</script>
