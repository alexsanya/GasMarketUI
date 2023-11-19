import { usePublicClient } from 'wagmi'
import { useEffect, useState } from 'react'
import { GAS_BROKER_ADDRESS, GAS_PROVIDER_ADDRESS } from '../config'
import gasBrokerAbi from '../resources/gasBrokerAbi.json' assert { type: 'json' }

function useEstimateSwapGas(args, value) {
  const client = usePublicClient()
  const [gas, setGas] = useState(null)

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
