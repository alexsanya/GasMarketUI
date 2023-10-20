import { useState, useEffect, createContext } from 'react';
import { useContractReads } from 'wagmi'

import domainABI from '../resources/domainABI.json' assert { type: 'json' }

export const DomainContext = createContext({});

const DomainProvider = ({ address, children }) => {

  const [domain, setDomain] = useState({})

  const { data, isError, isLoading } = useContractReads({
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
    if (isLoading || isError || !data) return;
    const [name, version] = data.map(response => response.result)
    setDomain({
      name,
      version,
      chainId: 1,
      verifyingContract: address
    })


  }, [data, isError, isLoading])


  return (
    <DomainContext.Provider value={domain}>
      { children }
    </DomainContext.Provider>
  )
} 

export default DomainProvider
