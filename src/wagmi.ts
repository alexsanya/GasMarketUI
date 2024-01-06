// @ts-nocheck

import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { polygon, zkSync } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { defineChain, createPublicClient, http } from 'viem'

export const CHAINS = [polygon, zkSync];

const walletConnectProjectId = 'b0f095af13dfdd0d24b7106ac0a821d7'

export const localFork = defineChain({
  id: 324,
  name: 'Local',
  network: 'local',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:8011']
    }
  }
})


const { chains, publicClient, webSocketPublicClient } = configureChains(
  CHAINS,
  [
    publicProvider()
  ],
)


const { connectors } = getDefaultWallets({
  appName: 'My wagmi + RainbowKit App',
  chains,
  projectId: walletConnectProjectId,
})

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

const chainsMap = CHAINS.reduce((result, chain) => ({
  [chain.id]: chain,
  ...result
}), {})

const getViemClient = chainId => createPublicClient({
  chain: chainsMap[chainId],
  transport: http()
})


export { 
  chains,
  getViemClient
}
