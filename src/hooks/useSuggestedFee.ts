import { useEffect, useState } from 'react';
import { useFeeData } from "wagmi"
import useDecimals from './useDecimals'
import useConfig from './useConfig'
import useMaticPrice from './useMaticPrice'

function useSuggestedFee(token) {
  const { data: feeData, isError, isLoading } = useFeeData()
  const { SWAP_GAS_REQUIRED, MIN_COMISSION } = useConfig()
  const nativeGasTokenPrice = useMaticPrice()
  const tokenDecimals = useDecimals(token)

  const [suggestedFee, setSuggestedFee] = useState(0)

  useEffect(() => {
    if (feeData && feeData?.gasPrice && SWAP_GAS_REQUIRED && tokenDecimals) {
      const transactionFeeUSD = SWAP_GAS_REQUIRED * nativeGasTokenPrice * Number(feeData?.gasPrice) / 10**18;
      setSuggestedFee(Math.max(MIN_COMISSION, 2*transactionFeeUSD*10**tokenDecimals));
    }
  }, [feeData, SWAP_GAS_REQUIRED, MIN_COMISSION, nativeGasTokenPrice, tokenDecimals])

  return suggestedFee
}

export default useSuggestedFee
