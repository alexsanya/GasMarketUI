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
import { useFeeData } from "wagmi"

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
  }
}

const RewardInput = styled(InputBase)(() => ({
  '& .MuiInputBase-root': {
    margin: 0,
  },
  '& .MuiInputBase-input': {
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
  const { DEFAULT_ORDER_TTL_SEC, SWAP_GAS_REQUIRED, MIN_COMISSION } = useConfig()
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

  return (
    <>
      <div className="underline" style={styles.AdvancedButton} onClick={toggleAdvancedSettings}>
        {showAdvanced ? 'Hide' : 'Advanced'}
      </div>
      <div className="flex flex-col" style={ showAdvanced ? {} : { display: 'none' } }>
        <div className="flex flex-row gap-1">
          <div>Gas price: {formatETH(feeData?.gasPrice || 0)} /</div>
          <div>ETH price: {nativeGasTokenPrice} USD /</div>
          <div>Swap cost: {SWAP_GAS_REQUIRED * nativeGasTokenPrice * Number(feeData?.gasPrice) / 10**18} USD</div>
        </div>
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
          onChange={updateRewardValue}
          inputProps={{
             classes: {
              root: {margin: 0}
             },
          }}
        />
      </div>


      <div className="flex flex-col" style={ showAdvanced ? {} : { display: 'none' } }>
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
          onChange={updateTtlValue}
          inputProps={{
             classes: {
              root: {margin: 0}
             },
          }}
        />
      </div>


    </>
  )
}
