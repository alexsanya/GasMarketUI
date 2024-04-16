// @ts-nocheck

import { useState, useEffect } from 'react'
import { reward, lifetime } from '../signals';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useSignals } from '@preact/signals-react/runtime'
import useDecimals from '../hooks/useDecimals'
import useConfig from '../hooks/useConfig'
import formatETH from '../utils/formatETH'
import useMaticPrice from '../hooks/useMaticPrice'
import useSuggestedFee from '../hooks/useSuggestedFee'
import { EVENTS_SERVER } from '../config'
import { useFeeData } from "wagmi"
import './advancedOptions.css';

const styles = {
  AdvancedButton: {
    color: '#326DC8',
    cursor: 'pointer'
  },
  RewardField: {
    padding: '11px',
    background: '#FFFFFF',
    border: '1px solid #DFDEDE',
    'border-radius': '7px'
  },
  SuggestedReward: {
    color: '#326DC8',
    cursor: 'pointer',
    'margin-left': '3px'
  },
  AdvancedOptionsPanel: {
  }
}

const RewardInput = styled(InputBase)(() => ({
  '& .MuiInputBase-root': {
    margin: 0,
  },
  '& .MuiInputBase-input': {
    margin: 0,
    padding: '11px',
    background: '#FFFFFF',
    border: '1px solid #DFDEDE',
    borderRadius: '7px'
  }
}));

export const AdvancedOptions = ({ token }) => {

  useSignals()

  const [rewardValue, setRewardValue] = useState(reward.value)
  const [ttlValue, setTtlValue] = useState(lifetime.value)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const tokenDecimals = useDecimals(token)
  const nativeGasTokenPrice = useMaticPrice()
  const { data: feeData, isError, isLoading } = useFeeData()
  const { DEFAULT_ORDER_TTL_SEC, SWAP_GAS_REQUIRED } = useConfig()
  const suggestedFee = useSuggestedFee(token)
  

  const updateRewardValue = (event: SelectChangeEvent) => {
    setRewardValue(event.target.value)
  }
  const updateTtlValue = (event: SelectChangeEvent) => {
    lifetime.value = parseInt(event.target.value)
  }
  const setSuggestedComission = () => {
    setRewardValue(suggestedFee / 10**tokenDecimals)
  }
  const setSuggestedTTL = () => {
    lifetime.value = DEFAULT_ORDER_TTL_SEC;
  }
  const toggleAdvancedSettings = () => {
    setShowAdvanced(showAdvanced => !showAdvanced)
  }

  useEffect(() => {
    setRewardValue(reward.value / 10**tokenDecimals)
  }, [tokenDecimals, reward.value])

  useEffect(() => {
    if (parseFloat(rewardValue)) {
      reward.value = rewardValue * 10**tokenDecimals
    }
  }, [rewardValue])


  const ChainPricesData = () => {
    return (
      <div className="flex flex-row gap-1">
        <div><span className="price-label">Gas price:</span> <span className="price-value">{formatETH(feeData?.gasPrice || 0)}</span></div>
        <div><span className="price-label">ETH price:</span> <span className="price-value">{nativeGasTokenPrice} USD</span></div>
        <div><span className="price-label">Swap cost:</span> <span className="price-value">{SWAP_GAS_REQUIRED * nativeGasTokenPrice * Number(feeData?.gasPrice) / 10**18} USD</span></div>
      </div>
    )
  }

  const ComissionInput = () => {
    return (
      <div className="flex flex-col">
        <div className="flex flex-row justify-between" style={{ 'margin-bottom': '3px'}}>
          <div>Comission</div>
          <div>
            Suggested value: {suggestedFee / 10**tokenDecimals}
            <span className="underline" style={styles.SuggestedReward} onClick={setSuggestedComission}>Apply</span>
          </div>
        </div>
        <RewardInput
          sx={{ ml: 1, flex: 1 }}
          value={rewardValue}
          style={{ 'margin-left': '-3px' }}
          onChange={updateRewardValue}
          inputProps={{
             classes: {
              root: {margin: 0}
             },
          }}
        />
      </div>
    )
  }

  const RewardWidget = () => {
    return (
      <div className="flex flex-col">
        <div className="flex flex-row justify-between" style={{ 'margin-bottom': '3px'}}>
          <div>Order lifetime</div>
          <div>
            Suggested value: {DEFAULT_ORDER_TTL_SEC}
            <span className="underline" style={styles.SuggestedReward} onClick={setSuggestedTTL}>Apply</span>
          </div>
        </div>
        <RewardInput
          sx={{ ml: 1, flex: 1 }}
          value={lifetime.value}
          style={{ 'margin-left': '-3px' }}
          onChange={updateTtlValue}
          inputProps={{
             classes: {
              root: {margin: 0}
             },
          }}
        />
      </div>

    )
  }

  return (
    <div style={{ margin: '10px 0'}}>
      <div className="underline" style={ showAdvanced ? { display: 'none'} : styles.AdvancedButton } onClick={toggleAdvancedSettings}>Advanced</div>
      <div className="advanced-options-panel flex flex-col gap-3" style={ showAdvanced ? {} : { display: 'none' } }> 
        <div className="divider">Advanced [<span style={styles.AdvancedButton} onClick={toggleAdvancedSettings}>Hide</span>]</div>
        <div className="flex flex-row gap-1">
          <div>
            <span className="price-label">Orders notifier:</span> <span className="price-value">{EVENTS_SERVER}</span>
          </div>
        </div>
        <ChainPricesData />
        <ComissionInput />
        <RewardWidget />
      </div>


    </div>
  )
}
