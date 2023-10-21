import { useState, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import PermitMessageSigner from './PermitMessageSigner'
import RewardMessageSigner from './RewardMessageSigner'


export function StyledOrderForm() {

  const [orderData, setOrderData] = useState(null)
  const [permitSignature, setPermitSignature] = useState('')
  const [permitMessage, setPermitMessage] = useState(null)

  const orderForm = useRef();

  const handleSubmit = event => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    setOrderData({
      token: data.get('token'),
      value: data.get('value'),
      reward: data.get('reward'),
      lifetime: data.get('lifetime')
    })

  };

  const onPermitSigned = (message, signature) => {
    setPermitMessage(message)
    setPermitSignature(signature)
  }

  const onRewardSigned = async (message, rewardSignature) => {
    const { token, value, reward } = orderData
    const order = {
      signer: permitMessage.owner,
      token,
      value,
      deadline: permitMessage.deadline.toString(),
      reward,
      permitSignature,
      rewardSignature
    }
    await fetch('/api/order', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
    orderForm.current.reset()
    setOrderData(null)
    setPermitMessage(null)
    setPermitSignature('')
  }


  return (
    <Container component="main" maxWidth="xs">
      { orderData && <>
        <PermitMessageSigner token={orderData.token} value={orderData.value} lifetime={orderData.lifetime} onSuccess={onPermitSigned} />
        <RewardMessageSigner permitSignature={permitSignature} value={orderData.reward} onSuccess={onRewardSigned} />
        </>
      }
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Make an order
        </Typography>
        <Box ref={orderForm} component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="token"
            label="Token address"
            name="token"
            autoComplete="token"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="token"
            label="Value"
            name="value"
            autoComplete="value"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="reward"
            label="Reward"
            name="reward"
            autoComplete="value"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lifetime"
            label="Lifetime"
            name="lifetime"
            autoComplete="value"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign and publish
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

