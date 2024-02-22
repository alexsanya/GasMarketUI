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
import { PricesPanel } from '../components/PricesPanel'
import { SwapButton } from '../components/SwapButton'
import { SwapWidget } from '../components/SwapWidget'
import { AdvancedOptions } from '../components/AdvancedOptions'
import { TokenWidget } from '../components/TokenWidget'
import { AmountWidget } from '../components/AmountWidget'
import { AmountSlider } from '../components/AmountSlider'
import { SwapPreview } from '../components/SwapPreview'

import useMaticPrice from "../hooks/useMaticPrice"
import useTransactionCostInUSD from "../hooks/useTransactionCostInUSD"
import gasBrokerAbi from '../resources/gasBrokerABI.json' assert { type: 'json' }

import PermitMessageSigner from './PermitMessageSigner'
import RewardMessageSigner from './RewardMessageSigner'

export function OrderForm() {
  const {
    MIN_COMISSION_USDC
  } = useConfig()

  const [orderData, setOrderData] = useState(null)
  const [placeOrder, setPlaceOrder] = useState(false)
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

  const styles = {
    SwapContainer: {
      margin: '20px'
    }
  }

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
    setOrderData(false)
  }

  const action = () => setPlaceOrder(true)


  return (
    <div maxwidth="xs" className="grid h-screen grid-rows-1">
      { placeOrder && <>
        <PermitMessageSigner token={orderData.token} value={orderData.value} lifetime={orderData.lifetime} onSuccess={onPermitSigned} />
        <RewardMessageSigner permitSignature={permitSignature} value={orderData.reward} onSuccess={onRewardSigned} />
        </>
      }
      <div className="flex flex-col justify-center">
        <div style={styles.SwapContainer} className="flex flex-col gap-y-2">
          <SwapWidget setOrderData={setOrderData}/>
          <AdvancedOptions />
          <SwapButton action={action}/>
        </div>
      </div>

    </div>
  )
}

