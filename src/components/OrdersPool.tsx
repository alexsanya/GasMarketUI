// @ts-nocheck

import { useState, useEffect } from "react"
import { getConfig } from "../config"
import { useFeeData, useNetwork, useChainId } from 'wagmi'
import Box from '@mui/material/Box'
import { OrdersList } from "../components/OrdersList"
import Typography from '@mui/material/Typography'
import formatETH from '../utils/formatETH'
import useMaticPrice from '../hooks/useMaticPrice'

export function OrdersPool() {
  const [orders, setOrders] = useState([])
  const [transactionCostInEth, setTransactionCostInEth] = useState(null)
  const [transactionCostInUSD, setTransactionCostInUSD] = useState(null)
  const [swapGasRequired, setSwapGasRequired] = useState()
  const maticPrice = useMaticPrice()
  const chainId = useChainId()
  const { data: feeData, isError: isFeeError, isLoading: isFeeLoading } = useFeeData()

  useEffect(() => {
    if (chainId) {
      const { SWAP_GAS_REQUIRED } = getConfig(chainId)
      setSwapGasRequired(SWAP_GAS_REQUIRED)
    }
  }, [chainId])

  useEffect((): any => {
    (async () => {
      const query = {
        pagination: {
          limit: 10
        },
        filter: {
          networkIds: [chainId]
        }
      }
      const response = await fetch('/api/list', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(query)
      }).then(response => response.json())

      console.log('Response.data: ', response.data)
      setOrders(response.data)
    })()
  }, [])

  useEffect(() => {
    feeData &&  swapGasRequired && setTransactionCostInEth(feeData?.gasPrice * BigInt(swapGasRequired))
  },[feeData, swapGasRequired])


  useEffect(() => {
    if (!transactionCostInEth || !maticPrice) return;
    setTransactionCostInUSD(Number(transactionCostInEth / 10n**14n) * maticPrice / 10**4)
  }, [transactionCostInEth, maticPrice])


  return (<>
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >

      <Typography component="h1" variant="h5">
        Pending orders
      </Typography>
      <Typography variant="body2">
        Matic price: {maticPrice} USD
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


      <OrdersList orders={orders}/>
    </Box>
  </>)
}
