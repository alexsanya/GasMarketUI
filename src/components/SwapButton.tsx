import React from 'react';

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

const defaultProps = {
  label: 'Swap'
};

export const SwapButton = (props) => {
  return (
    <button style={styles.Button}>
      <span>{props.label ?? defaultProps.label}</span>
    </button>
  );
};

