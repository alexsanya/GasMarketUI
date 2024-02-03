import React from 'react';

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

const defaultProps = {
  label: 'USDT (15 availible)',
  values: [
    'Option 1',
    'Option 2',
    'Option 3',
  ],
};

export const TokenDropdown = (props) => {
  return (
    <select style={styles.Dropdown} defaultValue="">
      <option value="" disabled hidden>{props.label ?? defaultProps.label}</option>
      {(props.values ?? defaultProps.values).map((value) => (
        <option value={value} key={value}>{value}</option>
      ))}
    </select>
  );
};

