import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useContractWrite } from 'wagmi'

import { GAS_BROKER_ADDRESS } from '../config'
import useDomain from '../hooks/useDomain'
import { splitSignature } from '../services/validator'
import useEstimateEth from '../hooks/useEstimateEth'
import gasBrokerABI from '../resources/gasBrokerABI.json' assert { type: 'json' }

export function OrderCard({order}) {
  const domain = useDomain(order.token)
  const ethAmount = useEstimateEth(order.token, order.value - order.reward)

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: GAS_BROKER_ADDRESS,
    abi: gasBrokerABI,
    functionName: 'swap'
  })


  const fulfillOrder = () => {
    const [permitV, permitR, permitS] = splitSignature(order.permitSignature)
    const [rewardV, rewardR, rewardS] = splitSignature(order.rewardSignature)
    write({
      args: [
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
      ],
      value: BigInt(ethAmount) + BigInt(ethAmount)/10n
    })
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {domain && domain.name}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {order.token}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Wei required: {ethAmount ? ethAmount : "XZ"} 
        </Typography>
        <Typography variant="body2">
          Reward: {order.reward} {domain && domain.name}
        </Typography>
        <Typography variant="body2">
          Expires at: {(new Date(order.deadline*1e3)).toString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={fulfillOrder}>Fulfill</Button>
      </CardActions>
    </Card>

  )
}
