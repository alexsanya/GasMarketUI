import { useEffect } from "react"
import { keccak256 } from '@ethersproject/keccak256'
import { useAccount, useSignTypedData } from 'wagmi'
import { GAS_BROKER_ADDRESS } from '../config'
import useDomain from '../hooks/useDomain'
import rewardTypes from '../resources/rewardTypes.json' assert { type: 'json' }

const RewardMessageSignerWithAddress = ({permitSignature, value, onSuccess}) => {
  const { address, isConnected } = useAccount()
  return (
    address &&
    <RewardMessageSigner
      address={address}
      permitSignature={permitSignature}
      value={value}
      onSuccess={onSuccess}
    />
  )
}

const RewardMessageSigner = ({address, permitSignature, value, onSuccess}) => {
  const domain = useDomain(GAS_BROKER_ADDRESS)

  const message = {
    value,
    permitHash: permitSignature && keccak256(permitSignature)
  }

  const { data, isError, isLoading, isSuccess, signTypedData } =
    useSignTypedData({
      domain,
      primaryType: 'Reward',
      types: rewardTypes,
      message
    })

  useEffect(() => {
    if (isSuccess) {
      onSuccess(message, data);
    }
  }, [isSuccess])


  useEffect(() => {
    if (permitSignature && value) {
      signTypedData()
    }
  }, [value, permitSignature])

  return null
}

export default RewardMessageSignerWithAddress
