import React from 'react';

const styles = {
  ImageContainer: {
    width: '45vh',
    'aspect-ratio': '1/1',
    borderRadius: '65.92px',
    backgroundImage: 'url(./image.jpeg)',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
};

const defaultProps = {
  image: 'https://static-img-hosting.s3.amazonaws.com/logo.jpeg',
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

