import React from 'react';

const styles = {
  Button: {
    margin: 'auto',
    cursor: 'pointer',
    top: '765px',
    left: '982px',
    width: '166px',
    height: '54px',
    padding: '0px 8px',
    border: '0',
    boxSizing: 'border-box',
    borderRadius: '2px',
    backgroundColor: '#007a4c',
    color: '#ffffff',
    fontSize: '18px',
    lineHeight: '24px',
    outline: 'none',
  },
};

const defaultProps = {
  label: 'Back',
};

export const BackButton = (props) => {
  return (
    <button style={styles.Button}>
      {props.label ?? defaultProps.label}
    </button>
  );
};

