
import { createContext } from 'react';
import { useContractRead } from 'wagmi'

export const ContractDataContext = createContext({});

const ContractDataProvider = ({ contract, abi, method, args, children }) => {
  const { data, isError, isLoading } = useContractRead({
    address: contract,
    abi,
    functionName: method,
    args
  })

  return !isError && !isLoading && (
    <ContractDataContext.Provider value={data}>
      { children }
    </ContractDataContext.Provider>
  )
} 

export default ContractDataProvider
