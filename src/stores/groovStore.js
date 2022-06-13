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
      const maxY = state.height - 2 * MARGIN_SIZE
      const maxX = state.width - 2 * MARGIN_SIZE
      const linesWidth = numLines * LINE_WIDTH
      const xSpaceWidth = (maxX - linesWidth) / (numLines - 1)
      return state.linesAndHeightsUnscaled.map((line, index) => {
        const pct = line.height / 100
        const lineLength = pct * maxY
        const xLocation = MARGIN_SIZE + index * LINE_WIDTH + index * xSpaceWidth
        const y1 = state.height - LINE_BASE

        return {
          ...line,
          x: xLocation,
          y1,
          y2: state.height - (lineLength + MARGIN_SIZE),
          dashed: line.dashed,
          visible: line.visible,
          selected: line.selected,
        }
      })
    },

    minXmaxXmaxY: (state) => {
      const linesAndHeights = state.linesAndHeights
      let minX = 100000
      let maxX = -100000
      let maxY = -100000
      linesAndHeights.forEach((line) => {
        if (line.x > maxX) {
          maxX = line.x
        }

        if (line.x < minX) {
          minX = line.x
        }

        if (line.y1 > maxY) {
          maxY = line.y1
        }
      })

      return { minX, maxX, maxY: maxY }
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

    clearEighths() {
      const newLines = [...this.linesAndHeightsUnscaled]
      newLines.forEach((line) => {
        if (line.label === '&') {
          line.selected = false
        }
      })

      this.linesAndHeightsUnscaled = newLines
    },

    clearSixteenths() {
      const newLines = [...this.linesAndHeightsUnscaled]
      newLines.forEach((line) => {
        if (line.label === 'e' || line.label === 'a') {
          line.selected = false
        }
      })

      this.linesAndHeightsUnscaled = newLines
    },

    clearDownbeats() {
      const newLines = [...this.linesAndHeightsUnscaled]
      newLines.forEach((line) => {
        if (line.label !== '&' && line.label !== 'e' && line.label !== 'a') {
          line.selected = false
        }
      })

      this.linesAndHeightsUnscaled = newLines
    },

    clearAll() {
      this.clearDownbeats()
      this.clearEighths()
      this.clearSixteenths()
    },

    randomizeAll() {
      const newLines = [...this.linesAndHeightsUnscaled]
      newLines.forEach((line) => {
        if (line.visible) {
          line.selected = Math.random() < 0.5
        }
      })

      this.linesAndHeightsUnscaled = newLines
    },

    randomizeDownbeats() {
      const newLines = [...this.linesAndHeightsUnscaled]
      let oneSelected = false
      while (!oneSelected) {
        newLines.forEach((line) => {
          if (line.label !== '&' && line.label !== 'e' && line.label !== 'a') {
            const val = Math.random() < 0.5
            oneSelected ||= val
            line.selected = val
          }
        })
      }

      this.linesAndHeightsUnscaled = newLines
    },

    randomizeEighths() {
      const newLines = [...this.linesAndHeightsUnscaled]
      let oneSelected = false
      while (!oneSelected) {
        newLines.forEach((line) => {
          if (line.label === '&') {
            const val = Math.random() < 0.5
            oneSelected ||= val
            line.selected = val
          }
        })
      }

      this.linesAndHeightsUnscaled = newLines
    },

    randomizeSixteenths() {
      const newLines = [...this.linesAndHeightsUnscaled]
      let oneSelected = false
      while (!oneSelected) {
        newLines.forEach((line) => {
          if (line.label === 'e' || line.label === 'a') {
            const val = Math.random() < 0.5
            oneSelected ||= val
            line.selected = val
          }
        })
      }

      this.linesAndHeightsUnscaled = newLines
    },
  },
})
