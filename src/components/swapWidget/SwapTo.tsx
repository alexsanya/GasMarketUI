import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import { TokenWidget } from './TokenWidget';

const styles = {
  OutputField: {
    padding: '6px 8px',
    background: '#DFDEDE',
    'border-radius': '7px'
  },
  OutputInput: {
    'text-align': 'right'
  }
}

export const SwapTo = () => {
  return (
    <Paper
      component="form"
      elevation={0}
      style={styles.OutputField}
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
    >
      <TokenWidget token="ETH"/>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        inputProps={{style: styles.OutputInput}}
        value="0.00388"
      />
    </Paper>
  );
}
