// @ts-nocheck

import { useContractRead } from 'wagmi'
import { useState, useEffect } from 'react'
import useBlock from './useBlock'
import { GAS_BROKER_ADDRESS } from '../config'

import noncesABI from '../resources/noncesABI.json' assert { type: 'json' }

function usePermitMessage(address, token, value, lifetime) {
  const block = useBlock()
  const { data: nonce } = useContractRead({
    address: token,
    abi: noncesABI,
    functionName: "nonces",
    args: [address]
  })

  const [ message, setMessage ] = useState(null)

  useEffect(() => {
    if (!address || !block || (nonce === undefined)) return
    setMessage({
      owner: address,
      spender: GAS_BROKER_ADDRESS,
      value: BigInt(value),
      nonce,
      deadline: block.timestamp + BigInt(lifetime)
    })
  },
  [address, block, nonce, value])

  return message
}

export default usePermitMessage
