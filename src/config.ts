import { polygon, zkSync } from 'wagmi/chains'

import * as polygonConfig from './config-polygon'
import * as zksyncConfig from  './config-zksync'

const configMap = {
  [polygon.id]: polygonConfig,
  [zkSync.id]: zksyncConfig
}

export function getConfig(chainId) {
  return configMap[chainId];
}
