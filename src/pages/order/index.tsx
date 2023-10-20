import '@rainbow-me/rainbowkit/styles.css'

import { ConnectButton } from '../../components/ConnectButton'
import { Connected } from '../../components/Connected'
import { Providers } from '../../app/providers'
import { OrderForm } from '../../components/OrderForm'

export function Order() {
  return (
    <Providers>
      <ConnectButton />

      <Connected>
        <h2>Order details</h2>
        <OrderForm />
      </Connected>
    </Providers>
  )
}

export default Order
