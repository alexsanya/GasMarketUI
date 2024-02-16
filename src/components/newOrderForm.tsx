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
import { signal } from '@preact/signals-react';



import PermitMessageSigner from './PermitMessageSigner'
import RewardMessageSigner from './RewardMessageSigner'

export function OrderForm() {
  const {
    MIN_COMISSION_USDC
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

  const amount = signal(30)


  const styles = {
    SwapContainer: {
      margin: '20px'
    }
  }

  return (
    <div maxwidth="xs" className="grid h-screen grid-rows-1">
      <div className="flex flex-col justify-center">
        <div style={styles.SwapContainer} className="flex flex-col gap-y-2">
          <SwapWidget />
          <AdvancedOptions />
          <SwapButton />
        </div>
      </div>

    </div>
  )
}

