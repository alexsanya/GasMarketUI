// @ts-nocheck

import { useState, useEffect } from 'react'
import { getConfig } from '../config'
import { useContractRead, useChainId } from 'wagmi'

import aggregatorV3InterfaceAbi from '../resources/aggregatorV3InterfaceABI.json' assert { type: 'json' }

function useMaticPrice() {

  const chainId = useChainId()

  const [price, setPrice] = useState(null)
  const [chainlinkEthUSDFeed, setChainlinkEthUSDFeed] = useState()

  const { data, error, isError, isLoading } = useContractRead({
    address: chainlinkEthUSDFeed,
    abi: aggregatorV3InterfaceAbi,
    functionName: 'latestRoundData'
  })


  useEffect(() => {
    if (chainId) {
      const { CHAINLINK_ETH_USD_FEED } = getConfig(chainId)
      console.log({ CHAINLINK_ETH_USD_FEED })
      setChainlinkEthUSDFeed(CHAINLINK_ETH_USD_FEED)
    }
  }, [chainId])

  useEffect(() => {
    if (!data) return;
    const [_, price] = data
    const value = Number(price / BigInt(10)**BigInt(4)) / 10**4
    setPrice(value)
  }, [data, error])


  return price
} 

export default useMaticPrice
