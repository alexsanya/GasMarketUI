import { useState, useEffect } from 'react';
import { useContractReads } from 'wagmi'
import { polygon } from 'wagmi/chains'

import domainABI from '../resources/domainABI.json' assert { type: 'json' }
import legacyDomainABI from '../resources/legacyDomainABI.json' assert { type: 'json' }

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
        abi: legacyDomainABI,
        functionName: 'EIP712_VERSION'
      }

    ]
  })

  useEffect(() => {
    if (!data) return;
    const [name, version] = data.map(response => response.result)
    setDomain({
      name,
      version,
      verifyingContract: address,
      salt: '0x0000000000000000000000000000000000000000000000000000000000000089'
    })


  }, [data, error])


  return domain
} 

export default useDomain
