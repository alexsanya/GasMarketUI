// @ts-nocheck

import { useState, useEffect } from 'react';
import { useContractReads } from 'wagmi'
import { polygon } from 'wagmi/chains'

import domainABI from '../resources/domainABI.json' assert { type: 'json' }

function useDomain(address) {

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
      version,
      chainId: polygon.id,
      verifyingContract: address
    })


  }, [data, error])


  return domain
} 

export default useDomain
