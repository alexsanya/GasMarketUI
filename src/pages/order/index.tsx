// @ts-nocheck

import '@rainbow-me/rainbowkit/styles.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { OrderForm } from '../../components/OrderForm'


import { ConnectButton } from '../../components/ConnectButton'
import { Connected } from '../../components/Connected'
import { Providers } from '../../app/providers'

import { useEffect } from "react"
import SocketIOClient from "socket.io-client"

const defaultTheme = createTheme();

export default function Order() {

  useEffect((): any => {
    // connect to socket server
    const socket = SocketIOClient.connect(process.env.BASE_URL, {
      path: "/api/socketio",
    });

    // log socket connection
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
    });

    // update chat on new message dispatched
    socket.on("message", (message: IMsg) => {
      console.log('Incoming message: ', message)
    });

    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect();
  }, []);

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
