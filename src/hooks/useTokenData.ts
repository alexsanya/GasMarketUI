// @ts-nocheck

import { useState, useEffect } from 'react';
import { useContractReads, useChainId } from 'wagmi'
import { polygon } from 'wagmi/chains'

import domainABI from '../resources/domainABI.json' assert { type: 'json' }

function useTokenData(address) {

  const chainId = useChainId()
  const [domain, setDomain] = useState(null)


  const { data, error, isError, isLoading } = useContractReads({
    contracts: [
      {
        address: address,
        abi: domainABI,
        functionName: 'name'
      },
      {
        address: address,
        abi: domainABI,
        functionName: 'version'
      }

    ]
  })

  useEffect(() => {
    if (!data) return;
    const [name, version] = data.map(response => response.result)
    setDomain({
      name,
      version: version || "1",
      chainId,
      verifyingContract: address
    })


  }, [data, error, chainId])


  return domain
} 

export default useTokenData
