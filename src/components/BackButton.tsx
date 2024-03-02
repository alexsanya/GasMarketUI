// @ts-nocheck

import React from 'react';
import { state, OrderState } from '../signals'

const styles = {
  Button: {
    cursor: 'pointer',
    margin: 'auto',
    height: '48px',
    width: '100%',
    padding: '0px 8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row-reverse',
    gap: '9px',
    border: '0',
    boxSizing: 'border-box',
    borderRadius: '7px',
    backgroundColor: '#2A64C5',
    color: '#FFFFFF',
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: '24px',
    outline: 'none',
  }
};

export const BackButton = (props) => {
  const goBack = () => {
    state.value = OrderState.BLANK
  }

  return (
    <button style={styles.Button} onClick={goBack}>
      Back
    </button>
  );
};

