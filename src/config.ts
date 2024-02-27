import { polygon, zkSync } from 'wagmi/chains'

import * as polygonConfig from './config-polygon'
import * as zksyncConfig from  './config-zksync'

const configMap = {
  [polygon.id]: polygonConfig,
  [zkSync.id]: zksyncConfig
}

export const BROADCASTER_URL = "http://137.184.222.12:8085/order"

export function getConfig(chainId) {
  return configMap[chainId];
}
