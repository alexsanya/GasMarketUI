
const styles = {
  ImageContainer: {
    top: '255px',
    left: '860px',
    width: '34px',
    'margin-left': '-18px',
    height: '34px',
    borderRadius: '8px',
    backgroundImage: 'url(./image.png)',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  StageName: {
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: 400,
    lineHeight: '28px',
    'margin-left': '7px'
  },
  StagesList: {
    'margin-left': '33px',
    'border-left': '4px solid white'
  },
  StageItem: {
    'margin-bottom': '20px'
  }
};

const defaultProps = {
  image: '/images/okCircle.png',
}

const OkCircle = (props) => {
  return (
    <div style={{
      ...styles.ImageContainer,
      backgroundImage: `url(${props.image ?? defaultProps.image})`,
    }} />
  );
};


enum StageStatus {
  OK,
  ERROR
}


const StageItem = ({status, name, last}) => {
  return (
    <div className="flex flex-row" style={last ? {} : styles.StageItem}>
      <OkCircle />
      <div style={styles.StageName}>{name}</div>
    </div>
  )
}

export const StagesFlow = () => {
  return (
    <ul style={styles.StagesList}>
      <li>
        <StageItem status={StageStatus.OK} name="Validation" />
        <StageItem status={StageStatus.OK} name="Order broadcasted" />
        <StageItem status={StageStatus.OK} name="Waiting for gas provider" />
        <StageItem status={StageStatus.OK} name="Confirming 10/10 confirmations" />
        <StageItem status={StageStatus.OK} name="Order completed" last={true} />
      </li>
    </ul>
  )
}
