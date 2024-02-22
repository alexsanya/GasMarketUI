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

export function ProcessingScreen() {
  return (
    <div maxwidth="xs" className="grid h-screen grid-rows-1">
      <div className="flex flex-col justify-center">
        <div style={{margin: '20px'}} className="flex flex-col gap-y-5">
          <h1 style={styles.Caption}>Done</h1>
          <SwapDetails fromToken={"Tether USD"} fromValue={10000000n} toToken={"ETH"} toValue={338n*10n**11n} />
          <StagesFlow />
          <TransactionData hash={"0x688ea0d07acadd7d74ec7c729f1d0ca0dd4bb665"} />
          <BackButton />
        </div>
      </div>

    </div>

  )
}
