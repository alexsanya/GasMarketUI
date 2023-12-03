// @ts-nocheck

import '@rainbow-me/rainbowkit/styles.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { OrderForm } from '../../components/OrderForm'

import { ConnectButton } from '../../components/ConnectButton'
import { Connected } from '../../components/Connected'
import { Providers } from '../../app/providers'

const defaultTheme = createTheme();

export default function Order() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Providers>
        <ConnectButton />
        <Connected>
          <OrderForm />
        </Connected>
      </Providers>

      
    </ThemeProvider>
  );
}
