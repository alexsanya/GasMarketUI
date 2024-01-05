// @ts-nocheck

import { useFeeData, useChainId } from "wagmi"
import { useState, useEffect } from 'react'
import { getConfig } from "../config"
import useMaticPrice from '../hooks/useMaticPrice'

function useTransactionCostInUSD() {

  const [transactionCostInEth, setTransactionCostInEth] = useState(null)
  const [transactionCostInUSD, setTransactionCostInUSD] = useState(null)
  const [swapGasRequired, setSwapGasRequired] = useState()
  const chainId = useChainId()


  const maticPrice = useMaticPrice()
  const { data: feeData, isError, isLoading } = useFeeData()

  useEffect(() => {
    !isLoading && !isError && feeData && swapGasRequired && setTransactionCostInEth(feeData?.gasPrice * BigInt(swapGasRequired))
  },[feeData, swapGasRequired])

  useEffect(() => {
    if (chainId) {
      const { SWAP_GAS_REQUIRED } = getConfig(chainId)
      setSwapGasRequired(SWAP_GAS_REQUIRED)
    }
  }, [chainId])



  useEffect(() => {
    if (!transactionCostInEth || !maticPrice) return;
    console.log({ transactionCostInEth, maticPrice })
    setTransactionCostInUSD(Number(transactionCostInEth / 10n**10n) * maticPrice / 10**8)
  }, [transactionCostInEth, maticPrice])



  return transactionCostInUSD
} 

export default useTransactionCostInUSD
