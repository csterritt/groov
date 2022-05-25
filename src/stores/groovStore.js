import { defineStore } from 'pinia'

const MARGIN_SIZE = 20
const LINE_WIDTH = 5
const LINE_BASE = 10
const LINE_LENGTHS = [90, 30, 60, 30]
const LINE_LABELS = [null, 'e', '&', 'a']
const linesAndHeightsUnscaled = []

const setupLinesAndHeights = () => {
  let beatNumber = 1
  for (let index = 0; index < 16; index += 1) {
    let label = LINE_LABELS[index % 4]
    if (label == null) {
      label = `${beatNumber}`
      beatNumber += 1
    }

    linesAndHeightsUnscaled.push({
      id: index,
      height: LINE_LENGTHS[index % 4],
      dashed: false,
      label,
    })
  }
  linesAndHeightsUnscaled.push({
    id: 16,
    height: 90,
    dashed: true,
    label: '',
  })
}
setupLinesAndHeights()

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore('groovStore', {
  state: () => {
    return {
      viewPortHeight: 200,
      viewPortWidth: 300,
      topLeftHeightOffset: 0,
      bottomLeftHeightOffset: 0,
      topLeftWidthOffset: 60,
    }
  },

  getters: {
    height: (state) => state.bottomLeftHeightOffset - state.topLeftHeightOffset,
    width: (state) => state.viewPortWidth - state.topLeftWidthOffset,
    linesAndHeights: (state) => {
      const numLines = linesAndHeightsUnscaled.length
      return linesAndHeightsUnscaled.map((line, index) => {
        const pct = line.height / 100
        const maxY = state.height - 2 * MARGIN_SIZE
        const lineLength = pct * maxY
        const maxX = state.width - 2 * MARGIN_SIZE
        const linesWidth = numLines * LINE_WIDTH
        const xSpaceWidth = (maxX - linesWidth) / (numLines - 1)
        const xLocation = MARGIN_SIZE + index * LINE_WIDTH + index * xSpaceWidth
        return {
          ...line,
          x1: xLocation,
          x2: xLocation,
          y1: state.height - LINE_BASE,
          y2: state.height - (lineLength + MARGIN_SIZE),
          dashed: line.dashed,
        }
      })
    },
  },

  actions: {
    setViewportWidthAndHeight(newWidth, newHeight) {
      this.viewPortHeight = newHeight
      this.viewPortWidth = newWidth
    },

    setTopAndBottom(topLeftRect, bottomLeftRect) {
      this.topLeftHeightOffset = topLeftRect.y + MARGIN_SIZE
      this.bottomLeftHeightOffset = bottomLeftRect.y - MARGIN_SIZE
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
