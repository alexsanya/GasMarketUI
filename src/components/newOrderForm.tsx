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



  return (
    <Container component="main" maxwidth="xs">
      <cssbaseline />

      <div className="grid h-screen grid-rows-3">
        <div></div>
        <div className="row-span-2">
          <div className="grid grid-rows-6">
            <div className="flex flex-row justify-between">
              <TokenWidget />
              <AmountWidget />
            </div>
            <AmountSlider />
            <SwapPreview />
            <div></div>
            <div className="row-span-2">
              <SwapButton />
            </div>
          </div>

        </div>
      </div>
    </Container>
  )
}

