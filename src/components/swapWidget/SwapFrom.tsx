import * as React from 'react';
import { useState, useEffect } from 'react';
import {  effect } from "@preact/signals-core";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import { TokenWidget } from './TokenWidget';

import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from '@mui/material/MenuItem';
import useTokens from '../../hooks/useTokens'; 

const BootstrapInput = styled(InputBase)(() => ({
  '& .MuiInputBase-input': {
    border: '1px solid #DFDEDE',
    margin: '3px',
    borderRadius: 4,
    padding: '8px',
    background: '#EDEDED'
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


export const SwapFrom = ({ setTokenData, supportedTokens, fromValue, setFromValue }) => {
  const tokens = useTokens(supportedTokens);
  const [token, setToken] = React.useState('USDT');
  const [inputValue, setInputValue] = useState();

  const updateFromToken = (event: SelectChangeEvent) => {
    setToken(event.target.value);
    const token = tokens.find(({name}) => name === event.target.value);
    setTokenData(token);
  };

  const updateFromValue = (event: SelectChangeEvent) => {
    setFromValue(event.target.value)
  }

  useEffect(() => {
    if (tokens && tokens.length) {
      setToken(tokens[0].name)
      setTokenData(tokens[0]);
    }
  }, [tokens])


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
        onChange={updateFromToken}
        inputProps={{ "aria-label": "Without label" }}
        input={<BootstrapInput />}
      >
        {
          tokens && tokens.map(tokenData => (
            <MenuItem value={tokenData.name}>
              <TokenWidget token={tokenData.name} />
            </MenuItem>
          ))
        }
      </Select>

      <InputBase
        sx={{ ml: 1, flex: 1 }}
        inputProps={{style: styles.OutputInput}}
        value={fromValue}
        onChange={updateFromValue}
      />
    </Paper>
  );
}
