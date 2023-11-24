import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { polygon } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

const walletConnectProjectId = 'b0f095af13dfdd0d24b7106ac0a821d7'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygon],
  [
    (process.env.NODE_ENV === 'development') ?
      jsonRpcProvider({
        rpc: () => ({
          http: 'http://127.0.0.1:8545',
        }),
      }) :
      publicProvider(),
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

export { chains }
