import { useState, useEffect } from 'react'
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined'
import { SwapFromPanel } from './swapWidget/SwapFromPanel'
import { SwapTo } from './swapWidget/SwapTo'

export const SwapWidget = ({ setOrderData }) => {
  const [amountFrom, setAmountFrom] = useState(0)
  const [tokenData, setTokenData] = useState({});

  useEffect(() => {
    setOrderData({
      token: tokenData.address,
      value: amountFrom * 10**tokenData.decimals,
      reward: 500000,
      lifetime: 500
    })
    console.log({tokenData})
  }, [ amountFrom, tokenData])

  return (
    <div className="flex flex-col w-full justify-between self-center gap-y-2">
      <SwapFromPanel setAmountFrom={setAmountFrom} tokenData={tokenData} setTokenData={setTokenData} />
      <ArrowDownwardOutlinedIcon style={{ margin: 'auto' }} />
      <SwapTo amountFrom={amountFrom} tokenData={tokenData} />
    </div>
  )
}

