import { useState, useEffect } from 'react'
import { SwapFrom } from './SwapFrom'
import useConfig from '../../hooks/useConfig'

const styles = {
  MaxButton: {
    color: '#326DC8',
    cursor: 'pointer',
    'margin-left': '3px'
  }
}

export function SwapFromPanel({ setAmountFrom, tokenData, setTokenData }) {
  const { SUPPORTED_TOKENS } = useConfig();
  const [fromValue, setFromValue] = useState(0);

  useEffect(() => {
    setAmountFrom(fromValue)
  }, [ fromValue ])


  const getNormalizedBalance = () => {
    return Number(tokenData.balance) / 10**tokenData.decimals
  }

  const setMaxBalance = () => {
    setFromValue(getNormalizedBalance())
  }

  return (
    <div class = "flex flex-col">
      <div class="flex flex-row justify-between" style={{ 'margin-bottom': '3px'}}>
        <div>Token and Amount</div>
        <div>
          Balance {getNormalizedBalance()}
          <span className="underline" style={styles.MaxButton} onClick={setMaxBalance}>Max</span>
        </div>
      </div>
      { SUPPORTED_TOKENS &&
        <SwapFrom
          supportedTokens={ SUPPORTED_TOKENS }
          setTokenData={setTokenData}
          fromValue={fromValue}
          setFromValue={setFromValue}
        /> }
    </div>
  )
}
