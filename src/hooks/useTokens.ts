// @ts-nocheck

import { useState, useEffect } from 'react';
import { getAccount } from '@wagmi/core'
import { useContractReads } from 'wagmi'
import erc20ABI from '../resources/erc20ABI.json' assert { type: 'json' }

function useTokens(supportedTokens) {

  const [tokens, setTokens] = useState()
  const { address } = getAccount()

  const tokenNames = supportedTokens.map(tokenAddress => ({
    address: tokenAddress,
    abi: erc20ABI,
    functionName: 'name'
  }))

  const tokenBalances = supportedTokens.map(tokenAddress => ({
    address: tokenAddress,
    abi: erc20ABI,
    args: [
      address
    ],
    functionName: 'balanceOf'
  }))

  const tokenDecimals = supportedTokens.map(tokenAddress => ({
    address: tokenAddress,
    abi: erc20ABI,
    functionName: 'decimals'
  }))

  const { data, error, isError, isLoading } = useContractReads({
    contracts: [
      ...tokenNames,
      ...tokenBalances,
      ...tokenDecimals
    ]
  })

  useEffect(() => {
    if (!data) return;

    const result = supportedTokens.map((tokenAddress, i) => ({
      address: tokenAddress,
      name: data[i].result,
      balance: data[i*3+1].result,
      decimals: data[i*3+2].result
    }))

    setTokens(result);


    console.log({ result })

  }, [data, error])



  return tokens

}

export default useTokens;
