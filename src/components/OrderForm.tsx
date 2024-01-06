// @ts-nocheck

import { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { useFeeData, useNetwork } from 'wagmi'
import { watchContractEvent } from '@wagmi/core'
import { keccak256 } from 'viem'
import formatETH from '../utils/formatETH'
import useConfig from '../hooks/useConfig'

import useMaticPrice from "../hooks/useMaticPrice"
import useTransactionCostInUSD from "../hooks/useTransactionCostInUSD"
import gasBrokerAbi from '../resources/gasBrokerABI.json' assert { type: 'json' }


import PermitMessageSigner from './PermitMessageSigner'
import RewardMessageSigner from './RewardMessageSigner'

export function OrderForm() {
  const {
    USDC_ADDRESS,
    GAS_BROKER_ADDRESS,
    DEFAULT_ORDER_TTL_SEC,
    MIN_COMISSION_USDC,
    EXPLORER_URL,
    GAS_UNIT_NAME
  } = useConfig()

  const [orderData, setOrderData] = useState(null)
  const [permitSignature, setPermitSignature] = useState('')
  const [permitMessage, setPermitMessage] = useState(null)
  const [successTabOpened, setSuccessTabOpened] = useState(false)
  const [errorTabOpened, setErrorTabOpened] = useState(false)
  const [suggestedReward, setSuggestedReward] = useState(MIN_COMISSION_USDC)

  const maticPrice = useMaticPrice()
  const transactionCostInUSD = useTransactionCostInUSD()
  const [state, setState] = useState('initial')
  const [transactionHash, setTransactionHash] = useState(null)

  const { data: feeData, isError: isFeeError, isLoading: isFeeLoading } = useFeeData()
  const { chain } = useNetwork()

  const orderForm = useRef();

  useEffect(() => {
    setSuggestedReward(Math.max(transactionCostInUSD! * 3, MIN_COMISSION_USDC) / 10**6)
    orderForm.current.elements["token"].value = USDC_ADDRESS
    orderForm.current.elements["reward"].value = suggestedReward
    orderForm.current.elements["lifetime"].value = DEFAULT_ORDER_TTL_SEC
  }, [transactionCostInUSD, USDC_ADDRESS, DEFAULT_ORDER_TTL_SEC])


  useEffect(() => {
    console.log('Watiching events ', permitSignature)
    watchContractEvent(
      {
        address: GAS_BROKER_ADDRESS,
        abi: gasBrokerAbi,
        eventName: 'Swap',
      },
      (events) => {
        const permitHash = keccak256(permitSignature);
        console.log({permitSignature, permitHash});
        const swapEvent = events.find(event => event.args.permitHash === permitHash)
        if (swapEvent) {
          setTransactionHash(swapEvent.transactionHash);
          setState('completed');
        }
      }
    )
  }, [permitSignature])


  const handleSubmit = event => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    setOrderData({
      token: data.get('token'),
      value: Math.round(parseFloat(data.get('value')!) * 10**6),
      reward: Math.round(parseFloat(data.get('reward')!) * 10**6),
      lifetime: data.get('lifetime')!
    })

  };

  const onPermitSigned = (message, signature) => {
    console.log('Permit message signed')
    setPermitMessage(message)
    setPermitSignature(signature)
  }

  const onRewardSigned = async (message, rewardSignature) => {
    const { token, value, reward } = orderData
    const order = {
      signer: permitMessage.owner,
      networkId: chain.id,
      token,
      value,
      deadline: parseInt(permitMessage.deadline),
      reward,
      permitSignature,
      rewardSignature
    }

    setState('pending')
    const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      })
    if (response.ok) {
      setSuccessTabOpened(true)
      orderForm.current.reset()
      setOrderData(null)
      setPermitMessage(null)
      setPermitSignature('')
    } else {
      setOrderData(null)
      setErrorTabOpened(true)
      setState('error')
    }
  }
  
  const closeSuccessTab = () => {
    setSuccessTabOpened(false)
  }

  const closeErrorTab = () => {
    setErrorTabOpened(false)
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
        <Typography variant="body2">
          Gas price: {feeData && formatETH(feeData?.gasPrice)}
        </Typography>
        <Typography variant="body2">
          {GAS_UNIT_NAME} price: {maticPrice} USD
        </Typography>
        <Typography variant="body2">
          Transaction cost: {transactionCostInUSD} USD
        </Typography>
        <Typography variant="body2">
          Suggested reward: {suggestedReward} USD
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
            id="value"
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
            defaultValue={DEFAULT_ORDER_TTL_SEC}
            autoFocus
          />
          {state === 'initial' &&
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign and publish
            </Button>
          }
          {state === 'pending' &&
            <Button fullWidth>
              Pending <CircularProgress disableShrink />
            </Button>
          }
          {state === 'completed' && 
            <span>
              Transaction hash:<br/>
              <a href={EXPLORER_URL + `tx/${transactionHash}`} target="_blank" rel="noreferrer">
                {transactionHash}
              </a>
            </span>
          }
          {state === 'error' &&
            <span>Error</span>
          }
        </Box>
      </Box>
      <Snackbar 
        open={successTabOpened}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={closeSuccessTab}
      >
        <Alert onClose={closeSuccessTab} severity="success" sx={{ width: '100%' }}>
          Order is published
        </Alert>
      </Snackbar>
      <Snackbar 
        open={errorTabOpened}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={closeErrorTab}
      >
        <Alert onClose={closeErrorTab} severity="error" sx={{ width: '100%' }}>
          There was an error
        </Alert>
      </Snackbar>


    </Container>
  )
}

