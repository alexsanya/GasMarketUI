import { polygon, zkSync } from 'wagmi/chains'

import * as polygonConfig from './config-polygon'
import * as zksyncConfig from  './config-zksync'

const configMap = {
  [polygon.id]: polygonConfig,
  [zkSync.id]: zksyncConfig
}

export const BROADCASTER_URL = "http://44.223.32.9:8085/order"
export const EVENTS_SERVER = "http://44.223.32.9:8085"

export function getConfig(chainId) {
  return configMap[chainId];
}
