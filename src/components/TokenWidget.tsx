import React from 'react';
import { TokenDropdown } from './TokenDropdown';

const styles = {
  Text: {
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: 400,
    lineHeight: '28px',
    textAlign: 'center',
  },
};

const defaultProps = {
  text: 'Token',
};

const Label = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};


export const TokenWidget = () => {
  return (
    <div className="flex flex-col">
      <Label text="Token"/>
      <TokenDropdown />
    </div>
  );
}

