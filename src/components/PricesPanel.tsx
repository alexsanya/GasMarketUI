import { useFeeData } from 'wagmi'
import { useState, useEffect } from "react"
import Typography from '@mui/material/Typography'
import useConfig from '../hooks/useConfig'
import useMaticPrice from '../hooks/useMaticPrice'
import useTransactionCosInUSD from '../hooks/useTransactionCostInUSD'
import formatETH from '../utils/formatETH'

export function PricesPanel() {
  const maticPrice = useMaticPrice()
  const transactionCostInUSD = useTransactionCosInUSD()
  const { SWAP_GAS_REQUIRED, GAS_UNIT_NAME } = useConfig()
  const { data: feeData, isError: isFeeError, isLoading: isFeeLoading } = useFeeData()
  const [transactionCostInEth, setTransactionCostInEth] = useState(null)

  useEffect(() => {
    feeData && SWAP_GAS_REQUIRED && setTransactionCostInEth(feeData?.gasPrice * BigInt(SWAP_GAS_REQUIRED))
  },[feeData, SWAP_GAS_REQUIRED])


  return (
    <>
      <Typography variant="body2">
        {GAS_UNIT_NAME} price: {maticPrice} USD
      </Typography>
      <Typography variant="body2">
        Gas price: {feeData && formatETH(feeData?.gasPrice)}
      </Typography>
      <Typography variant="body2">
        Transaction cost in ETH: {transactionCostInEth ? formatETH(transactionCostInEth) : 'estimating...'}
      </Typography>
      <Typography variant="body2">
        Transaction cost in USD: {transactionCostInUSD}
      </Typography>
    </>
  )
}
