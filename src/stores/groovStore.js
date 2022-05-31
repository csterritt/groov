import { defineStore } from 'pinia'

const MARGIN_SIZE = 20
const LINE_WIDTH = 5
const LINE_BASE = 10
const LINE_LENGTHS = [90, 30, 60, 30]
const LINE_LABELS = [null, 'e', '&', 'a']
const NUMBER_OF_BEATS = 16
const rawLinesAndHeightsUnscaled = []

const setupLinesAndHeights = () => {
  let beatNumber = 1
  for (let index = 0; index < NUMBER_OF_BEATS; index += 1) {
    let label = LINE_LABELS[index % 4]
    if (label == null) {
      label = `${beatNumber}`
      beatNumber += 1
    }

    rawLinesAndHeightsUnscaled[index] = {
      id: index,
      height: LINE_LENGTHS[index % 4],
      dashed: false,
      label,
      visible: true,
      selected: false,
    }
  }

  rawLinesAndHeightsUnscaled[NUMBER_OF_BEATS] = {
    id: 16,
    height: 90,
    dashed: true,
    label: '',
    visible: true,
    selected: false,
  }
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
      linesAndHeightsUnscaled: rawLinesAndHeightsUnscaled,
      eighthsVisible: true,
      sixteenthsVisible: true,
    }
  },

  getters: {
    height: (state) => state.bottomLeftHeightOffset - state.topLeftHeightOffset,

    width: (state) => state.viewPortWidth - state.topLeftWidthOffset,

    linesAndHeights: (state) => {
      const numLines = state.linesAndHeightsUnscaled.length
      return state.linesAndHeightsUnscaled.map((line, index) => {
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
          visible: line.visible,
          selected: line.selected,
        }
      })
    },

    isLineSelected: (state) => (id) =>
      state.linesAndHeightsUnscaled[id].selected,

    isLineVisible: (state) => (id) => state.linesAndHeightsUnscaled[id].visible,
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

    toggleLineSelected(lineId) {
      const newLines = [...this.linesAndHeightsUnscaled]
      newLines[lineId].selected = !newLines[lineId].selected

      this.linesAndHeightsUnscaled = newLines
    },

    toggleLineVisible(lineId) {
      const newLines = [...this.linesAndHeightsUnscaled]
      newLines[lineId].visible = !newLines[lineId].visible

      this.linesAndHeightsUnscaled = newLines
    },

    toggleEighthsVisible() {
      this.eighthsVisible = !this.eighthsVisible
      if (!this.eighthsVisible) {
        this.sixteenthsVisible = false
      }
      const newLines = [...this.linesAndHeightsUnscaled]
      newLines.forEach((line) => {
        if (
          line.label === '&' ||
          (!this.eighthsVisible && (line.label === 'e' || line.label === 'a'))
        ) {
          line.visible = this.eighthsVisible
        }
      })

      this.linesAndHeightsUnscaled = newLines
    },

    toggleSixteenthsVisible() {
      this.sixteenthsVisible = !this.sixteenthsVisible
      const newLines = [...this.linesAndHeightsUnscaled]
      newLines.forEach((line) => {
        if (line.label === 'e' || line.label === 'a') {
          line.visible = this.sixteenthsVisible
        }
      })

      this.linesAndHeightsUnscaled = newLines
    },
  },
})
