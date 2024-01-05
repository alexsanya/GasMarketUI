// @ts-nocheck

import { useState, useEffect } from 'react'
import { useContractRead } from 'wagmi'
import useConfig from '../hooks/useConfig'

import aggregatorV3InterfaceAbi from '../resources/aggregatorV3InterfaceABI.json' assert { type: 'json' }

function useMaticPrice() {

  const [price, setPrice] = useState(null)
  const { CHAINLINK_ETH_USD_FEED } = useConfig()

  const { data, error, isError, isLoading } = useContractRead({
    address: CHAINLINK_ETH_USD_FEED,
    abi: aggregatorV3InterfaceAbi,
    functionName: 'latestRoundData'
  })

  useEffect(() => {
    if (!data) return;
    const [_, price] = data
    const value = Number(price / BigInt(10)**BigInt(4)) / 10**4
    setPrice(value)
  }, [data, error, CHAINLINK_ETH_USD_FEED])


  return price
} 

export default useMaticPrice
