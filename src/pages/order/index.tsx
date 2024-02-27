// @ts-nocheck

import '@rainbow-me/rainbowkit/styles.css'
import { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { OrderForm } from '../../components/newOrderForm'
import { ProcessingScreen } from '../../components/ProcessingScreen'
import Layout from '../../components/Layout'

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
  const [state, setState] = useState('placeOrder')
  const [amountFrom, setAmountFrom] = useState(0)
  const [tokenData, setTokenData] = useState({});
  const [permitSignature, setPermitSignature] = useState('')

  return (
    <Layout>

      <ThemeProvider theme={defaultTheme}>
        <Providers>
          <ConnectButton />
          <Connected>
            {state === 'placeOrder' &&
              (<OrderForm
                setState={setState}
                permitSignature={permitSignature}
                setPermitSignature={setPermitSignature}
                amountFrom={amountFrom}
                setAmountFrom={setAmountFrom}
                tokenData={tokenData}
                setTokenData={setTokenData}
              />)
            }
            {state === 'processing' && (
              <ProcessingScreen
                permitSignature={permitSignature}
                tokenData={tokenData}
                amountFrom={amountFrom}
              />
            )}
          </Connected>
        </Providers>

        
      </ThemeProvider>
    </Layout>

  );
}
