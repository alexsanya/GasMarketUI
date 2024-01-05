// @ts-nocheck

import { usePublicClient, useChainId } from 'wagmi'
import { useEffect, useState } from 'react'
import { getConfig } from '../config'
import gasBrokerAbi from '../resources/gasBrokerABI.json' assert { type: 'json' }

function useEstimateSwapGas(args, value) {
  const client = usePublicClient()
  const chainId = useChainId()
  const [gas, setGas] = useState(null)
  const { GAS_BROKER_ADDRESS, GAS_PROVIDER_ADDRESS } = getConfig(chainId)


  useEffect(() => {
    async function estimateGas() {
      if (!value) return;
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
  }, [client, value])

  return gas
}

export default useEstimateSwapGas
