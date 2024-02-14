// @ts-nocheck

import '@rainbow-me/rainbowkit/styles.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { OrderForm } from '../../components/NewOrderForm'
import { OrderFlow } from '../../components/OrderFlow'
import Layout from '../../components/layout'

import { ConnectButton } from '../../components/ConnectButton'
import { Connected } from '../../components/Connected'
import { Providers } from '../../app/providers'

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#ffffff',
    }
  },
});

export default function Order() {
  return (
    <Layout>

      <ThemeProvider theme={defaultTheme}>
        <Providers>
          <ConnectButton />
          <Connected>
            <OrderForm />
          </Connected>
        </Providers>

        
      </ThemeProvider>
    </Layout>

  );
}
