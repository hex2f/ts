import ololog from 'ololog'
import bullet from 'string.bullet'
import { cyan, yellow, red, blue } from 'ansicolor'

export default ololog.configure({
  time: true,
  tag: (lines, {
    level = '',
    levelColor = { info: cyan, warn: yellow, error: red.bright.inverse, debug: blue }
  }) => {
    const levelStr = level && (levelColor[level] || ((s: string) => s))(level.toUpperCase())
    return bullet(`${levelStr.padStart(6)}\t`, lines)
  }
})
