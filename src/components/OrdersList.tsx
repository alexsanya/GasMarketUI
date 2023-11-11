import { OrderCard } from './OrderCard'

export function OrdersList({orders}) {
  console.log({orders})
  return (<>
    {
      orders.map(order => <OrderCard order={order}/>)
    }  
  </>)
}
