import { useAccount, useContractRead } from 'wagmi'
import { useState, useEffect } from 'react'
import useBlock from './useBlock'
import noncesABI from '../resources/noncesABI.json' assert { type: 'json' }

function usePermitMessage(address, token, value) {
  const block = useBlock()
  const { data: nonce } = useContractRead({
    address: token,
    abi: noncesABI,
    functionName: "nonces",
    args: [address]
  })

  const [ message, setMessage ] = useState({})

  useEffect(() => {
    if (!address || !block || (nonce === undefined)) return;
    setMessage({
      owner: address,
      spender: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
      value,
      nonce,
      deadline: block.timestamp + 3600n
    })
  },
  [address, block, nonce, value])

  return message
}

export default usePermitMessage
