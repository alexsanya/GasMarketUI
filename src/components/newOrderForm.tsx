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
import useSuggestedFee from '../hooks/useSuggestedFee'
import { state, reward, OrderState } from '../signals'
import { PricesPanel } from '../components/PricesPanel'
import { SwapButton, DisabledSwapButton } from '../components/SwapButton'
import { SwapWidget } from '../components/SwapWidget'
import { AdvancedOptions } from '../components/AdvancedOptions'

export function OrderForm({ amountFrom, setAmountFrom, tokenData, setTokenData }) {
  const {
    MIN_COMISSION_USDC
  } = useConfig()

  const [orderData, setOrderData] = useState({})
  const [placeOrder, setPlaceOrder] = useState(false)
  const suggestedFee = useSuggestedFee(tokenData.address)

  const { data: feeData, isError: isFeeError, isLoading: isFeeLoading } = useFeeData()
  const { chain } = useNetwork()

  useEffect(() => {
    reward.value = suggestedFee
  }, [ suggestedFee ])

  const styles = {
    SwapContainer: {
      margin: '20px'
    }
  }


  const ORDER_EXPIRATION_GAP = 2000

  const startTimer = orderTTL => {
    console.log(`Order will expire in ${orderTTL} milliseconds`)
    setTimeout(() => {
      if (OrderState.BROADCASTED) {
        state.value = OrderState.EXPIRED
      }
    }, orderTTL + ORDER_EXPIRATION_GAP)
  }

  const onRewardSigned = async (order) => {
    state.value = OrderState.SUBMITTED

    const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      })
    if (response.ok) {
      state.value = OrderState.BROADCASTED
      console.log(order)
      startTimer(order.deadline*1000 - Date.now())
      setOrderData(null)
    } else {
      state.value = OrderState.INVALID
      setOrderData(null)
    }
    setOrderData(false)
  }


  return (
    <div maxwidth="xs" className="grid h-screen grid-rows-1">
      <div className="flex flex-col justify-center">
        <div style={styles.SwapContainer} className="flex flex-col gap-y-2">
          <SwapWidget 
            setOrderData={setOrderData}
            amountFrom={amountFrom}
            setAmountFrom={setAmountFrom}
            tokenData={tokenData}
            setTokenData={setTokenData}

          />
          <AdvancedOptions token={orderData.token}/>
          { (orderData.value &&
            (<SwapButton
              token={orderData.token}
              value={orderData.value}
              reward={orderData.reward}
              lifetime={orderData.lifetime}
              onOrderSigned={onRewardSigned}/>)) || <DisabledSwapButton />}
        </div>
      </div>

    </div>
  )
}

