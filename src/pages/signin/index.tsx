
import '@rainbow-me/rainbowkit/styles.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { StyledOrderForm } from '../../components/StyledOrderForm'


import { ConnectButton } from '../../components/ConnectButton'
import { Connected } from '../../components/Connected'
import { Providers } from '../../app/providers'


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <Providers>
        <ConnectButton />
        <Connected>
          <StyledOrderForm />
        </Connected>
      </Providers>

      
    </ThemeProvider>
  );
}
