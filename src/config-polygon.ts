import gasBrokerPolygon from './resources/gasBrokerABI.json' assert { type: 'json' }

export const gasBrokerAbi = gasBrokerPolygon
export const PROVIDE_TOKEN_ADDRESS = true

export const GAS_BROKER_ADDRESS = "0x92f1C3d951018C90C364c234ff5fEE00f334072F"
export const USDC_ADDRESS="0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359"
export const GAS_PROVIDER_ADDRESS="0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"
export const CHAINLINK_ETH_USD_FEED="0xAB594600376Ec9fD91F8e885dADF0CE036862dE0"
export const MIN_COMISSION=500000 // 50 cent
export const DEFAULT_ORDER_TTL_SEC=300
export const SWAP_GAS_REQUIRED=231814
export const EXPLORER_URL="https://polygonscan.com/"
export const GAS_UNIT_NAME = "MATIC"
export const ORDER_MAX_TTL_SEC = 600
export const DEFAULT_BLOCK = 52017021
export const SUPPORTED_TOKENS = [
  "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359"
]
