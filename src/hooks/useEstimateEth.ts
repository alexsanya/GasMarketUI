// @ts-nocheck

import { useContractRead } from 'wagmi'
import { useState, useEffect } from 'react'
import useMaticPrice from '../hooks/useMaticPrice'

import gasBrokerABI from '../resources/gasBrokerABI.json' assert { type: 'json' }

function useEstimateEth(token, value) {

  const [ amount, setAmount ] = useState()
  const ethPrice = useMaticPrice()

  useEffect(() => {
    if (ethPrice) {
      setAmount(BigInt(Math.round(value * 10**12 / ethPrice)))
    }
  },
  [ethPrice])

  return amount
}

export default useEstimateEth
