// @ts-nocheck

import { useAccount, useSignTypedData } from 'wagmi'
import { useState, useEffect } from 'react'

import permitTypes from '../resources/permitTypes.json' assert { type: 'json' }
import usePermitMessage from '../hooks/usePermitMessage'
import useDomain from '../hooks/useDomain'

const MessageSignerWithAddress = ({ token, value, lifetime, onSuccess }) => {
  const domain = useDomain(token)
  const { address } = useAccount()
  const message = usePermitMessage(address, token, value, lifetime)
  const [renderPermit, setRenderPermit] = useState(false)

  useEffect(() => {
    if (!renderPermit) {
      setRenderPermit(address && token && domain && message)
    }
  }, [address, token, domain, message])


  return (
    renderPermit &&
    <MessageSigner domain={domain} message={message} onSuccess={onSuccess} />
  )
}

const MessageSigner = ({ domain, message, onSuccess }) => {

  const { data, isError, isLoading, isSuccess, signTypedData } =
    useSignTypedData({
      domain,
      primaryType: 'Permit',
      types: permitTypes,
      message
  })

  useEffect(() => {

    console.log({data})
    if (data) {
      console.log('[MessageSigner] call onSuccess', { message, domain, data })
      onSuccess(message, data);
    }
  }, [data])

  useEffect(() => {
    if (signTypedData) {
      console.log('Calling signTypedData')
      signTypedData()
    }
  }, [signTypedData])



  return null
}

export default MessageSignerWithAddress 
