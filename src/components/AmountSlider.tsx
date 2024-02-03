import React from 'react';
import Slider from '@mui/material/Slider';

const styles = {
  Container: {
    position: 'relative',
    width: '551px',
    height: '63px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Slider: {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translate(0, -50%)',
    width: '60%',
    height: '4px',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: '10px',
    zIndex: 10,
    pointerEvents: 'none',
    opacity: 1,
  },
  Input: {
    cursor: 'pointer',
    backgroundColor: 'rgba(66, 66, 66, 1)',
    borderRadius: '10px',
    opacity: 1,
    pointerEvents: 'auto',
  },
};

export const AmountSlider = () => {
  const [value, setValue] = React.useState(60);

  const onValueChange = (event) => {
    setValue(parseInt(event.target.value, 10));
  }

  return (
    <div style={styles.Container}>
      <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
    </div>
  );
};

