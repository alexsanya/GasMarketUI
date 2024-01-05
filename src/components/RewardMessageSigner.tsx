// @ts-nocheck

import { useEffect } from "react"
import { keccak256 } from 'viem'
import { useAccount, useSignTypedData } from 'wagmi'
import useConfig from '../hooks/useConfig'
import useDomain from '../hooks/useDomain'
import rewardTypes from '../resources/rewardTypes.json' assert { type: 'json' }

const RewardMessageSigner = ({permitSignature, value, onSuccess}) => {
  const { GAS_BROKER_ADDRESS } = useConfig()
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
    console.log('[RewardMessageSigner] ', permitSignature)
    if (domain && permitSignature && value && !isLoading) {
      console.log({domain, message})
      signTypedData()
    }
  }, [domain, value, permitSignature])

  return null
}

export default RewardMessageSigner
