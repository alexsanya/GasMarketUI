import moment from 'moment'
import { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import LinkIcon from '@mui/icons-material/Link'
import Typography from '@mui/material/Typography'
import { usePrepareContractWrite, useContractWrite, useFeeData } from 'wagmi'

import { GAS_BROKER_ADDRESS, EXPLORER_URL } from '../config'
import useDomain from '../hooks/useDomain'
import useDecimals from '../hooks/useDecimals'
import { splitSignature } from '../services/validator'
import useEstimateEth from '../hooks/useEstimateEth'
import useTransactionCostInUSD from '../hooks/useTransactionCostInUSD'
import useEstimateSwapGas from '../hooks/useEstimateSwapGas'
import formatETH from '../utils/formatETH'
import gasBrokerABI from '../resources/gasBrokerABI.json' assert { type: 'json' }

function TransactionUSDcost({costInWei}) {
  const transactionCostInUSD = useTransactionCostInUSD(costInWei)
  return (
    <span>{transactionCostInUSD ? transactionCostInUSD : 'estimating...'}</span>
  )
}


export function OrderCard({order}) {
  const { data: feeData, isError: isFeeError, isLoading: isFeeLoading } = useFeeData()
  const domain = useDomain(order.token)
  const decimals = useDecimals(order.token)
  const ethAmount = useEstimateEth(order.token, order.value - order.reward)

  const [permitV, permitR, permitS] = splitSignature(order.permitSignature)
  const [rewardV, rewardR, rewardS] = splitSignature(order.rewardSignature)
  const args = [
    order.signer,
    order.token,
    order.value,
    order.deadline,
    order.reward,
    permitV,
    permitR,
    permitS,
    rewardV,
    rewardR,
    rewardS
  ]
  const value = ethAmount && (BigInt(ethAmount) + BigInt(ethAmount)/10n)
  const swapGas = useEstimateSwapGas(args, value)
  const [transactionCostInEth, setTransactionCostInEth] = useState(null)
  const { config, error } = usePrepareContractWrite({
    address: GAS_BROKER_ADDRESS,
    abi: gasBrokerABI,
    functionName: 'swap',
    args,
    value
  })

  const { data, isLoading, isSuccess, write } = useContractWrite(config)

  useEffect(() => {
    if (!feeData || !swapGas) return;
    setTransactionCostInEth(feeData?.gasPrice * BigInt(swapGas))
  }, [feeData, swapGas])

  const fulfillOrder = () => {
    write()
  }

  return (
    <Card sx={{ minWidth: 275, marginBottom: 5 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {domain && domain.name}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <span>
            {order.token}
            <a href={EXPLORER_URL + order.token} target="_blank">
              <LinkIcon style={{"vertical-align": "-6px", "cursor": "pointer"}} />
            </a>
          </span>
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          ETH required: {ethAmount ? formatETH(ethAmount) : 'estimating...'}
        </Typography>



        <Typography variant="body2">
          Reward: {decimals && (order.reward / 10**decimals)} {domain && domain.name}
        </Typography>
        <Typography variant="body2">
          Expires: {moment(order.deadline*1e3).fromNow()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={fulfillOrder} endIcon={<SendIcon />} disabled={error !== null}>
          Fulfill
        </Button>
      </CardActions>
    </Card>

  )
}
