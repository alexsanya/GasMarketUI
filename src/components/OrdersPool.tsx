import { useState, useEffect } from "react"
import { OrdersList } from "../components/OrdersList"

export function OrdersPool() {
  const [orders, setOrders] = useState([])

  useEffect((): any => {
    (async () => {
      const query = {
        pagination: {
          limit: 10
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
    <h1>Pending orders</h1>
    <OrdersList orders={orders}/>
  </>)
}
