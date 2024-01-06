// @ts-nocheck

import { useState, useEffect } from "react"
import { useNetwork } from 'wagmi'
import Box from '@mui/material/Box'
import { OrdersList } from "../components/OrdersList"
import { PricesPanel } from "../components/PricesPanel"
import Typography from '@mui/material/Typography'

export function OrdersPool() {
  const [orders, setOrders] = useState([])
  const { chain } = useNetwork()

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
      <PricesPanel />

      <OrdersList orders={orders}/>
    </Box>
  </>)
}
