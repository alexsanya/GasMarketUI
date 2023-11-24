// @ts-nocheck

import { useContractRead } from 'wagmi'
import { useState, useEffect } from 'react'
import { GAS_BROKER_ADDRESS } from '../config'

import gasBrokerABI from '../resources/gasBrokerABI.json' assert { type: 'json' }

function useEstimateEth(token, value) {
  const { data: ethRequired } = useContractRead({
    address: GAS_BROKER_ADDRESS,
    abi: gasBrokerABI,
    functionName: "getEthAmount",
    args: [token, value]
  })

  const [ amount, setAmount ] = useState(BigInt(0))


  useEffect(() => {
    console.log({ethRequired})
    setAmount(ethRequired)
  },
  [ethRequired])


  return amount
}

export default useEstimateEth
