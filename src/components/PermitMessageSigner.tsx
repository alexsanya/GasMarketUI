// @ts-nocheck

import { useAccount, useSignTypedData } from 'wagmi'
import { useEffect } from 'react'

import permitTypes from '../resources/permitTypes.json' assert { type: 'json' }
import usePermitMessage from '../hooks/usePermitMessage'
import useDomain from '../hooks/useDomain'


const MessageSignerWithAddress = ({ token, value, lifetime, onSuccess }) => {
  const { address, isConnected } = useAccount()
  return (
    address && token &&
    <MessageSigner address={address} value={value} token={token} lifetime={lifetime} onSuccess={onSuccess} />
  )
}

const MessageSigner = ({ address, token, value, lifetime, onSuccess }) => {
  const domain = useDomain(token)
  const message = usePermitMessage(address, token, value, lifetime)

  const { data, isError, isLoading, isSuccess, signTypedData } =
    useSignTypedData({
      domain,
      primaryType: 'Permit',
      types: permitTypes,
      message
  })

  useEffect(() => {
    if (isSuccess) {
      console.log('[MessageSigner] call onSuccess', { message, data })
      onSuccess(message, data);
    }
  }, [isSuccess])

  useEffect(() => {
    if (domain && message && !isLoading) {
      signTypedData()
    }
  }, [domain, message])



  return null
}

export default MessageSignerWithAddress 
