import { useState, useEffect } from 'react';
import { useContractRead } from 'wagmi'
import { erc20ABI } from 'wagmi'

function useDecimals(address) {

  const [decimals, setDecimals] = useState(null)

  const { data, error, isError, isLoading } = useContractRead({
    address: address,
    abi: erc20ABI,
    functionName: 'decimals'
  })

  useEffect(() => {
    if (!data) return;
    setDecimals(data)
  }, [data, error])


  return decimals
} 

export default useDecimals
