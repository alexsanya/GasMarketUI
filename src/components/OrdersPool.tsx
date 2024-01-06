// @ts-nocheck

import { useState, useEffect } from "react"
import { useFeeData, useNetwork } from 'wagmi'
import Box from '@mui/material/Box'
import { OrdersList } from "../components/OrdersList"
import Typography from '@mui/material/Typography'
import formatETH from '../utils/formatETH'
import useConfig from '../hooks/useConfig'
import useMaticPrice from '../hooks/useMaticPrice'
import useTransactionCosInUSD from '../hooks/useTransactionCostInUSD'

export function OrdersPool() {
  const [orders, setOrders] = useState([])
  const [transactionCostInEth, setTransactionCostInEth] = useState(null)
  const transactionCostInUSD = useTransactionCosInUSD();
  const maticPrice = useMaticPrice()
  const { chain } = useNetwork()
  const { SWAP_GAS_REQUIRED } = useConfig()
  const { data: feeData, isError: isFeeError, isLoading: isFeeLoading } = useFeeData()

  useEffect((): any => {
    (async () => {
      const query = {
        pagination: {
          limit: 10
        },
        filter: {
          networkIds: [chain.id]
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
    feeData && SWAP_GAS_REQUIRED && setTransactionCostInEth(feeData?.gasPrice * BigInt(SWAP_GAS_REQUIRED))
  },[feeData, SWAP_GAS_REQUIRED])

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
