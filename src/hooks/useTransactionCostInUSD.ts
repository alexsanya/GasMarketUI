// @ts-nocheck

import { useFeeData } from "wagmi"
import { useState, useEffect } from 'react'
import useConfig from '../hooks/useConfig'
import useMaticPrice from '../hooks/useMaticPrice'

function useTransactionCostInUSD() {

  const { SWAP_GAS_REQUIRED } = useConfig()
  const [transactionCostInEth, setTransactionCostInEth] = useState(null)
  const [transactionCostInUSD, setTransactionCostInUSD] = useState(null)
  const maticPrice = useMaticPrice()
  const { data: feeData, isError, isLoading } = useFeeData()

  useEffect(() => {
    !isLoading && !isError && feeData && SWAP_GAS_REQUIRED && setTransactionCostInEth(feeData?.gasPrice * BigInt(SWAP_GAS_REQUIRED))
  },[feeData, SWAP_GAS_REQUIRED])


  useEffect(() => {
    if (!transactionCostInEth || !maticPrice) return;
    setTransactionCostInUSD(Number(transactionCostInEth / 10n**10n) * maticPrice / 10**8)
  }, [transactionCostInEth, maticPrice])



  return transactionCostInUSD
} 

export default useTransactionCostInUSD
