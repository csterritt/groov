import { defineStore } from 'pinia'

const MARGIN_SIZE = 20

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore('groovStore', {
  state: () => {
    return {
      viewPortHeight: 200,
      viewPortWidth: 300,
      topLeftHeightOffset: 0,
      topLeftWidthOffset: 60,
    }
  },

  getters: {
    height: (state) => state.viewPortHeight - state.topLeftHeightOffset,
    width: (state) => state.viewPortWidth - state.topLeftWidthOffset,
  },

  actions: {
    setViewportWidthAndHeight(newWidth, newHeight) {
      this.viewPortHeight = newHeight
      this.viewPortWidth = newWidth
    },

    setTopLeft(topLeftRect) {
      this.topLeftHeightOffset = topLeftRect.y + MARGIN_SIZE
      this.topLeftWidthOffset = this.viewPortWidth - topLeftRect.width
    },

    setWidthAndHeightFromViewport() {
      this.setViewportWidthAndHeight(
        window.visualViewport.width,
        window.visualViewport.height
      )
    },
  },
})
