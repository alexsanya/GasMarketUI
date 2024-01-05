// @ts-nocheck

import { usePublicClient } from 'wagmi'
import { useEffect, useState } from 'react'
import useConfig from '../hooks/useConfig'
import gasBrokerAbi from '../resources/gasBrokerABI.json' assert { type: 'json' }

function useEstimateSwapGas(args, value) {
  const client = usePublicClient()
  const [gas, setGas] = useState(null)
  const { GAS_BROKER_ADDRESS, GAS_PROVIDER_ADDRESS } = useConfig()

  useEffect(() => {
    async function estimateGas() {
      if (!value || !GAS_PROVIDER_ADDRESS) return;
      try {
        const result = await client.estimateContractGas({
          address: GAS_BROKER_ADDRESS,
          abi: gasBrokerAbi,
          functionName: 'swap', 
          account: GAS_PROVIDER_ADDRESS,
          value,
          args
        })
        console.log({result})
        setGas(result)
      } catch (error) {
          console.error('Error estimating gas:', error)
      }
    }

    estimateGas()
  }, [client, value, GAS_PROVIDER_ADDRESS])

  return gas
}

export default useEstimateSwapGas
