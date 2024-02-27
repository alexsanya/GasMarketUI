// @ts-nocheck

import React from 'react';
import { amount } from './AmountSlider';

const styles = {
  Text: {
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: 400,
    lineHeight: '28px',
    textAlign: 'center',
  },
  Input: {
    top: '390px',
    left: '1100px',
    width: '289px',
    height: '50px',
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

const Label = (props) => {
  return (
    <div style={styles.Text}>
      {props.text}
    </div>
  );
};

const InputField = (props) => {
  return (
    <input style={styles.Input} value={props.value} />
  );
};

export const AmountWidget = ({amount}) => {
  return (
    <div className="flex flex-col">
      <Label text="Amount"/>
      <InputField value={amount} />
    </div>
  );
}
