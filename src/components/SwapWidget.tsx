import { useState, useEffect } from 'react'
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined'
import { SwapFromPanel } from './swapWidget/SwapFromPanel'
import { SwapTo } from './swapWidget/SwapTo'

import { reward, lifetime } from '../signals'

export const SwapWidget = ({ setOrderData, amountFrom, setAmountFrom, tokenData, setTokenData }) => {

  useEffect(() => {
    setOrderData({
      token: tokenData.address,
      value: amountFrom,
      reward: reward.value,
      lifetime: lifetime.value
    })
    console.log({tokenData})
  }, [ amountFrom, tokenData])

  return (
    <div className="flex flex-col w-full justify-between self-center gap-y-2">
      <SwapFromPanel amountFrom={amountFrom} setAmountFrom={setAmountFrom} tokenData={tokenData} setTokenData={setTokenData} />
      <ArrowDownwardOutlinedIcon style={{ margin: 'auto' }} />
      <SwapTo amountFrom={amountFrom} tokenData={tokenData} />
    </div>
  )
}

