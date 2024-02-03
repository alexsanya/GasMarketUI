import React from 'react';

const styles = {
  ImageContainer: {
    top: '83px',
    left: '157px',
    width: '412px',
    height: '412px',
    borderRadius: '65.92px',
    backgroundImage: 'url(./image.jpeg)',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
};

const defaultProps = {
  image: 'https://images.unsplash.com/photo-1597766363123-53fa3b1d5f6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwzfHxqdW1wc3RhcnR8ZW58MXx8fHwxNzA1NDU3MTk3fDA&ixlib=rb-4.0.3&q=80&w=1080',
}

export const Logo = (props) => {
  return (
    <div style={{
      ...styles.ImageContainer,
      margin: 'auto',
      backgroundImage: `url(${props.image ?? defaultProps.image})`,
    }} />
  );
};

