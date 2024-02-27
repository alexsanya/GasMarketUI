// @ts-nocheck

import { keccak256 } from 'viem'
import { useState, useEffect } from 'react'
import { watchContractEvent } from '@wagmi/core'
import { SwapDetails } from './SwapDetails'
import { StagesFlow } from './StagesFlow'
import { TransactionData } from './TransactionData'
import { BackButton } from './BackButton'
import useEstimateOutput from '../hooks/useEstimateOutput'
import useConfig from '../hooks/useConfig'

const styles = {
  Caption: {
    'text-align': 'center',
    'font-weight': 'bold',
    'font-size': '25px'
  }
}

export function ProcessingScreen({permitSignature, tokenData, amountFrom}) {

  const [transactionHash, setTransactionHash] = useState('')

  const {
    GAS_BROKER_ADDRESS,
    gasBrokerAbi
  } = useConfig()

  useEffect(() => {
    console.log('Watching events ')
    console.log({
      permitSignature,
      GAS_BROKER_ADDRESS
    })
    watchContractEvent(
      {
        address: GAS_BROKER_ADDRESS,
        abi: gasBrokerAbi,
        eventName: 'Swap',
      },
      (events) => {
        const permitHash = keccak256(permitSignature);
        console.log({permitSignature, permitHash});
        const swapEvent = events.find(event => event.args.permitHash === permitHash)
        if (swapEvent) {
          setTransactionHash(swapEvent.transactionHash);
        }
      }
    )
  }, [permitSignature, GAS_BROKER_ADDRESS, gasBrokerAbi])


  const output = useEstimateOutput(amountFrom, tokenData.address)
  console.log({
    amountFrom,
    token: tokenData.address
  })

  return (
    <div maxwidth="xs" className="grid h-screen grid-rows-1">
      <div className="flex flex-col justify-center">
        <div style={{margin: '20px'}} className="flex flex-col gap-y-5">
          <h1 style={styles.Caption}>Done</h1>
          <SwapDetails fromToken={tokenData.name} fromValue={amountFrom} toToken={"ETH"} toValue={output} />
          <StagesFlow />
          { transactionHash && <TransactionData hash={transactionHash} /> }
          <BackButton />
        </div>
      </div>

    </div>

  )
}
