import gasBrokerZkSync from './resources/gasBrokerZkSyncABI.json' assert { type: 'json' }

export const gasBrokerAbi = gasBrokerZkSync
export const PROVIDE_TOKEN_ADDRESS = false
export const GAS_BROKER_ADDRESS = "0x5DceeeeceeC0F427a0489524cee51229952df882"
export const USDC_ADDRESS="0x493257fD37EDB34451f62EDf8D2a0C418852bA4C"
export const GAS_PROVIDER_ADDRESS="0xd733dE10b28D6AEe6C54B452D1C6856AC34234e4"
export const CHAINLINK_ETH_USD_FEED="0x6D41d1dc818112880b40e26BD6FD347E41008eDA"
export const MIN_COMISSION=500000 // 50 cent
export const DEFAULT_ORDER_TTL_SEC=300
export const SWAP_GAS_REQUIRED=231814
export const EXPLORER_URL="https://explorer.zksync.io/"
export const GAS_UNIT_NAME = "ETH"
export const ORDER_MAX_TTL_SEC = 600
export const DEFAULT_BLOCK = 23388492
export const SUPPORTED_TOKENS = [
  "0x493257fD37EDB34451f62EDf8D2a0C418852bA4C"
]


