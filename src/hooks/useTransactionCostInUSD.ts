// @ts-nocheck

import { useFeeData } from "wagmi"
import { useState, useEffect } from 'react'
import { SWAP_GAS_REQUIRED } from '../config'
import useMaticPrice from '../hooks/useMaticPrice'

function useTransactionCostInUSD() {

  const [transactionCostInEth, setTransactionCostInEth] = useState(null)
  const [transactionCostInUSD, setTransactionCostInUSD] = useState(null)
  const maticPrice = useMaticPrice()
  const { data: feeData, isError: isFeeError, isLoading: isFeeLoading } = useFeeData()

  useEffect(() => {
    setTransactionCostInEth(feeData?.gasPrice * BigInt(SWAP_GAS_REQUIRED))
  },[feeData])


  useEffect(() => {
    if (!transactionCostInEth || !maticPrice) return;
    setTransactionCostInUSD(Number(transactionCostInEth / 10n**14n) * maticPrice / 10**4)
  }, [transactionCostInEth, maticPrice])



  return transactionCostInUSD
} 

export default useTransactionCostInUSD
