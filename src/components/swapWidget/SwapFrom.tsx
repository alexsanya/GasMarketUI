import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import { TokenWidget } from './TokenWidget';

import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from '@mui/material/MenuItem';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    border: '1px solid #DFDEDE',
    margin: '3px',
    borderRadius: 4,
    padding: '8px',
    background: '#EDEDED'
  }
}));

const CustomFormControl = styled(FormControl)(({ theme }) => ({
  '.MuiFormControl-root': {
    margin: '3px'
  }
}));

const styles = {
  OutputField: {
    padding: '2px 8px 2px 0px',
    background: '#FFFFFF',
    border: '1px solid #DFDEDE',
    'border-radius': '7px'
  },
  OutputInput: {
    'text-align': 'right'
  }
}

export const SwapFrom = () => {
  const [token, setToken] = React.useState('USDT');

  const handleChange = (event: SelectChangeEvent) => {
    setToken(event.target.value);
  };


  return (
    <Paper
      component="form"
      elevation={0}
      style={styles.OutputField}
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
    >
      <Select
        value={token}
        displayEmpty
        inputProps={{style: {padding:'5px'}}}
        onChange={handleChange}
        inputProps={{ "aria-label": "Without label" }}
        input={<BootstrapInput />}
      >
        <MenuItem value="ETH">
          <TokenWidget token="ETH" />
        </MenuItem>
        <MenuItem value="USDT">
          <TokenWidget token="USDT" />
        </MenuItem>
      </Select>

      <InputBase
        sx={{ ml: 1, flex: 1 }}
        inputProps={{style: styles.OutputInput}}
        value="10"
      />
    </Paper>
  );
}
