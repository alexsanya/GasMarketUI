import * as React from 'react';
import Paper from '@mui/material/Paper';
import useEstimateOutput from '../../hooks/useEstimateOutput'
import { TokenWidget } from './TokenWidget';

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
  const output = useEstimateOutput(amountFrom * 10**tokenData.decimals, tokenData.address)

  return (
    <Paper
      component="form"
      elevation={0}
      style={styles.OutputField}
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
    >
      <TokenWidget token="ETH"/>
      <div className="w-full" style={styles.OutputInput}>
        {output}
      </div>
    </Paper>
  );
}
