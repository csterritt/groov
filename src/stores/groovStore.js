import { defineStore } from 'pinia'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore('groovStore', {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      height: 200,
      width: 300,
    }
  },
  actions: {
    setWidthAndHeight(newWidth, newHeight) {
      this.height = newHeight
      this.width = newWidth
    },
  },
})
