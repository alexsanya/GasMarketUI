// @ts-nocheck

import { usePublicClient } from 'wagmi'
import { useEffect, useState } from 'react'
import formatETH from '../utils/formatETH'
import useConfig from '../hooks/useConfig'

function useEstimateOutput(value) {
  const client = usePublicClient()
  const [output, setOutput] = useState(0)
  const { GAS_BROKER_ADDRESS, gasBrokerAbi } = useConfig()

  useEffect(() => {
    async function estimateOutput() {
      if (!value || !gasBrokerAbi || !GAS_BROKER_ADDRESS) return;
      try {
        const result = await client.readContract({
          address: GAS_BROKER_ADDRESS,
          abi: gasBrokerAbi,
          functionName: 'getEthAmount', 
          args: [value]
        })
        setOutput(formatETH(result))
      } catch (error) {
          console.error('Error estimating gas:', error)
      }
    }

    estimateOutput()
  }, [client, value, gasBrokerAbi, GAS_BROKER_ADDRESS])

  return output
}

export default useEstimateOutput
