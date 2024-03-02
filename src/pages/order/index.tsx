// @ts-nocheck

import '@rainbow-me/rainbowkit/styles.css'
import { useState, useEffect } from 'react'
import { useSignals } from '@preact/signals-react/runtime'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { OrderForm } from '../../components/newOrderForm'
import { ProcessingScreen } from '../../components/ProcessingScreen'
import Layout from '../../components/Layout'

import { ConnectButton } from '../../components/ConnectButton'
import { Connected } from '../../components/Connected'
import { Providers } from '../../app/providers'
import useConfig from '../../hooks/useConfig'
import { state, reward, lifetime, OrderState } from '../../signals'

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
  const { MIN_COMISSION, DEFAULT_ORDER_TTL_SEC } = useConfig()
  const [amountFrom, setAmountFrom] = useState(0)
  const [tokenData, setTokenData] = useState({})
  const [permitSignature, setPermitSignature] = useState('')

  useSignals()

  useEffect(() => {
    reward.value = MIN_COMISSION
    lifetime.value = DEFAULT_ORDER_TTL_SEC
  }, [MIN_COMISSION, DEFAULT_ORDER_TTL_SEC])

  return (
    <Layout>

      <ThemeProvider theme={defaultTheme}>
        <Providers>
          <ConnectButton />
          <Connected>
            {state.value === OrderState.BLANK &&
              (<OrderForm
                permitSignature={permitSignature}
                setPermitSignature={setPermitSignature}
                amountFrom={amountFrom}
                setAmountFrom={setAmountFrom}
                tokenData={tokenData}
                setTokenData={setTokenData}
              />)
            }
            {state.value !== OrderState.BLANK && (
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
