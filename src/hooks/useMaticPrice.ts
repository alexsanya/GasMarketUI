import { useState, useEffect } from 'react'
import { useContractRead } from 'wagmi'
import { CHAINLINK_ETH_USD_FEED } from '../config'

import aggregatorV3InterfaceAbi from '../resources/aggregatorV3InterfaceAbi.json' assert { type: 'json' }

function useMaticPrice() {

  const [price, setPrice] = useState(null)

  const { data, error, isError, isLoading } = useContractRead({
    address: CHAINLINK_ETH_USD_FEED,
    abi: aggregatorV3InterfaceAbi,
    functionName: 'latestRoundData'
  })

  useEffect(() => {
    if (!data) return;
    const [_, price] = data
    const value = Number(price / 10n**4n) / 10**4
    setPrice(value)
  }, [data, error])


  return price
} 

export default useMaticPrice
