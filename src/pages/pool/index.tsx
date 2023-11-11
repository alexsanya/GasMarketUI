import '@rainbow-me/rainbowkit/styles.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { OrdersPool } from '../../components/OrdersPool'

import { ConnectButton } from '../../components/ConnectButton'
import { Connected } from '../../components/Connected'
import { Providers } from '../../app/providers'


const defaultTheme = createTheme();

export default function Pool() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Providers>
        <ConnectButton />
        <Connected>
          <OrdersPool />
        </Connected>
      </Providers>
    </ThemeProvider>
  )
}
