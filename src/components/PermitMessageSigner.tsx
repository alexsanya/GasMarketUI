import { useAccount, useSignTypedData, useContractRead } from 'wagmi'
import { useContext, useState, useEffect } from 'react'

import noncesABI from '../resources/noncesABI.json' assert { type: 'json' }
import permitTypes from '../resources/permitTypes.json' assert { type: 'json' }
import DomainProvider, { DomainContext } from './domainProvider'
import ContractDataProvider, { ContractDataContext } from './ContractDataProvider'
import useBlock from '../hooks/useBlock'
import useDomain from '../hooks/useDomain'


const MessageSignerWithDomain = ({ token, value, onSuccess }) => {
  const { address, isConnected } = useAccount()
  const block = useBlock()
  return (
    address && block &&
    <DomainProvider address={token}>
      <ContractDataProvider contract={token} abi={noncesABI} method="nonces" args={[address]}>
        <MessageSigner address={address} value={value} block={block} onSuccess={onSuccess} />
      </ContractDataProvider>
    </DomainProvider>
  )
}

const MessageSigner = ({ address, value, block, onSuccess }) => {
  const domain = useContext(DomainContext)
  const nonce = useContext(ContractDataContext)
  const message = {
    owner: address,
    spender: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
    value,
    nonce,
    deadline: block.timestamp + 3600n
  }
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
