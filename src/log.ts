import ololog from 'ololog'
import bullet from 'string.bullet'
import { cyan, yellow, red, blue, dim } from 'ansicolor'

import StatsD from 'hot-shots'

export function getShardStr (): string {
  return process.env.SHARD ? (`SHARD[${process.env.SHARD.padStart(2, '0')}]`) : 'SHARD_MGR'
}
export const datadog = new StatsD({
  globalTags: {
    shard: process.env.SHARD ?? 'MGR'
  }
})

setInterval(() => {
  datadog.check('service.up', datadog.CHECKS.OK, { hostname: getShardStr() })
  datadog.gauge(`total_heap.${getShardStr()}`, process.memoryUsage().heapTotal)
}, 15000)

export default ololog.configure({
  time: true,
  tag: (lines, {
    level = '',
    levelColor = { info: cyan, warn: yellow, error: red.bright.inverse, debug: blue }
  }) => {
    const shardStr = getShardStr()
    const levelStr = level && (levelColor[level] || ((s: string) => s))(level.toUpperCase())

    return bullet(`${dim(shardStr.padStart(10))}\t${levelStr.padStart(6)}\t`, lines)
  }
})
