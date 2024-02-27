import { keccak256 } from 'viem'
import { useState, useEffect } from 'react'
import { watchContractEvent } from '@wagmi/core'
import { SwapDetails } from './SwapDetails'
import { StagesFlow } from './StagesFlow'
import { TransactionData } from './TransactionData'
import { BackButton } from './BackButton'

const styles = {
  Caption: {
    'text-align': 'center',
    'font-weight': 'bold',
    'font-size': '25px'
  }
}

export function ProcessingScreen({permitSignature, gasBrokerAddress, gasBrokerAbi}) {

  const [transactionHash, setTransactionHash] = useState('')

  useEffect(() => {
    console.log('Watching events ')
    console.log({
      permitSignature,
      gasBrokerAddress
    })
    watchContractEvent(
      {
        address: gasBrokerAddress,
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
  }, [permitSignature, gasBrokerAddress, gasBrokerAbi])


  return (
    <div maxwidth="xs" className="grid h-screen grid-rows-1">
      <div className="flex flex-col justify-center">
        <div style={{margin: '20px'}} className="flex flex-col gap-y-5">
          <h1 style={styles.Caption}>Done</h1>
          <SwapDetails fromToken={"Tether USD"} fromValue={10000000n} toToken={"ETH"} toValue={338n*10n**11n} />
          <StagesFlow />
          { transactionHash && <TransactionData hash={transactionHash} /> }
          <BackButton />
        </div>
      </div>

    </div>

  )
}
