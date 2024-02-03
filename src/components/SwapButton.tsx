import React from 'react';

const styles = {
  Button: {
    cursor: 'pointer',
    margin: 'auto',
    top: '737px',
    left: '972px',
    width: '213px',
    height: '48px',
    padding: '0px 8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row-reverse',
    gap: '9px',
    border: '0',
    boxSizing: 'border-box',
    borderRadius: '24px',
    backgroundColor: '#ffffff',
    color: '#161616',
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: '24px',
    outline: 'none',
  },
  Icon: {
    fontSize: '27px',
    width: '27px',
    height: '27px',
    color: '#161616',
    fill: '#161616',
  },
};

const IconComponent = () => (
  <svg style={styles.Icon}  viewBox="0 0 24 24">
    <path d="M0 0h24v24H0V0z" fill="none">
    </path>
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10 10-4.48 10-10zm-7-5.5 3.5 3.5-3.5 3.5V11h-4V9h4V6.5zm-6 11L5.5 14 9 10.5V13h4v2H9v2.5z">
    </path>
  </svg>
);

const defaultProps = {
  label: 'Swap',
  IconComponent,
};

export const SwapButton = (props) => {
  return (
    <button style={styles.Button}>
      <span>{props.label ?? defaultProps.label}</span>
      {
        props.IconComponent 
          ? <props.IconComponent style={styles.Icon} /> 
          : <defaultProps.IconComponent />
      }
    </button>
  );
};

