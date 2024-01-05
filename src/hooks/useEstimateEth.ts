// @ts-nocheck

import { useContractRead } from 'wagmi'
import { useState, useEffect } from 'react'
import { GAS_BROKER_ADDRESS } from '../config'

import gasBrokerABI from '../resources/gasBrokerABI.json' assert { type: 'json' }

function useEstimateEth(token, value) {

  const [ amount, setAmount ] = useState(BigInt(1e16))


  useEffect(() => {
    setAmount(BigInt(1e16))
  },
  [])


  return amount
}

export default useEstimateEth
