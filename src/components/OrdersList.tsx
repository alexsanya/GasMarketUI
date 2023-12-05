import { OrderCard } from './OrderCard'

export function OrdersList({orders}) {
  console.log({orders})
  return orders.length ? (<>
    {
      orders.map((order, i) => <OrderCard key={i} order={order}/>)
    }  
  </>) : <h2>No pending orders for now...</h2>
}
