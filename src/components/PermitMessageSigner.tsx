import { useAccount, useSignTypedData } from 'wagmi'
import { useEffect } from 'react'

import permitTypes from '../resources/permitTypes.json' assert { type: 'json' }
import usePermitMessage from '../hooks/usePermitMessage'
import useDomain from '../hooks/useDomain'


const MessageSignerWithDomain = ({ token, value, onSuccess }) => {
  const { address, isConnected } = useAccount()
  return (
    address && token &&
    <MessageSigner address={address} value={value} token={token} onSuccess={onSuccess} />
  )
}

const MessageSigner = ({ address, token, value, onSuccess }) => {
  const domain = useDomain(address)
  const message = usePermitMessage(address, token, value)

  const { data, isError, isLoading, isSuccess, signTypedData } =
    useSignTypedData({
      domain,
      primaryType: 'Permit',
      types: permitTypes,
      message
  })

  useEffect(() => {
    if (isSuccess) {
      onSuccess(message, data);
    }
  }, [isSuccess])


  return (
    <button
      onClick={() => signTypedData()}
    >
      Publish order
    </button>
  )
}

export default MessageSignerWithDomain 
