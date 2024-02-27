// @ts-nocheck

import React from 'react';
import useTokens from '../hooks/useTokens';

const styles = {
  Dropdown: {
    cursor: 'pointer',
    top: '392px',
    left: '782px',
    width: '238px',
    height: '48px',
    padding: '0px 8px',
    border: '0',
    boxSizing: 'border-box',
    borderRadius: '6px',
    boxShadow: '0px 2px 8px rgba(0,0,0,0.16)',
    backgroundColor: '#393939',
    color: '#bfbfbf',
    fontSize: '18px',
    lineHeight: '24px',
    outline: 'none',
  },
};

export const TokenDropdown = (props) => {
  const tokens = useTokens(props.supportedTokens)
  return (
    <select style={styles.Dropdown} defaultValue="">
      <option value="" disabled hidden>Select token</option>
      {tokens && tokens.map(token => (
        <option value={token.address} key={token.address}>{`(${token.name}) ${Number(token.balance) / 10**Number(token.decimals)}`}</option>
      ))}
    </select>
  );
};

