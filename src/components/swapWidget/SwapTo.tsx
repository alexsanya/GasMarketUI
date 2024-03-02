// @ts-nocheck

import * as React from 'react';
import Paper from '@mui/material/Paper';
import useEstimateOutput from '../../hooks/useEstimateOutput'
import formatETH from '../../utils/formatETH'
import { TokenWidget } from './TokenWidget';
import { reward } from '../../signals'
import { useSignals } from '@preact/signals-react/runtime'

const styles = {
  OutputField: {
    padding: '11px',
    background: '#DFDEDE',
    'border-radius': '7px'
  },
  OutputInput: {
    'text-align': 'right'
  }
}

export const SwapTo = ({ amountFrom, tokenData }) => {
  useSignals()

  const output = useEstimateOutput(amountFrom - reward.value, tokenData.address)

  return (
    <Paper
      component="form"
      elevation={0}
      style={styles.OutputField}
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
    >
      <TokenWidget token="ETH"/>
      <div className="w-full" style={styles.OutputInput}>
        {formatETH(output)}
      </div>
    </Paper>
  );
}
