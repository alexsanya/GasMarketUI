// @ts-nocheck

import '@rainbow-me/rainbowkit/styles.css'
import { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { OrderForm } from '../../components/NewOrderForm'
import { ProcessingScreen } from '../../components/ProcessingScreen'
import Layout from '../../components/layout'

import { ConnectButton } from '../../components/ConnectButton'
import { Connected } from '../../components/Connected'
import { Providers } from '../../app/providers'
import useConfig from '../../hooks/useConfig'

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
  const [permitSignature, setPermitSignature] = useState('')
  const {
    GAS_BROKER_ADDRESS,
    gasBrokerAbi
  } = useConfig()

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
              />)
            }
            {state === 'processing' && (
              <ProcessingScreen
                permitSignature={permitSignature}
                gasBrokerAddress={GAS_BROKER_ADDRESS}
                gasBrokerAbi={gasBrokerAbi}
              />
            )}
          </Connected>
        </Providers>

        
      </ThemeProvider>
    </Layout>

  );
}
