// @ts-nocheck

import { state, OrderState } from '../signals'
import CircularProgress from '@mui/material/CircularProgress'

const styles = {
  ImageContainer: {
    width: '24px',
    height: '24px',
    borderRadius: '8px',
    backgroundImage: 'url(./image.png)',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  StageName: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '22px',
    'margin-left': '7px'
  },
  StagesList: {
    background: '#dedede',
    padding: '10px',
    'border-radius': '10px'
  },
  StageItem: {
    'margin-bottom': '20px'
  }
};

const OkCircle = (props) => {
  return (
    <div style={{
      ...styles.ImageContainer,
      backgroundImage: `url('/images/okCircle.png')`,
    }} />
  );
};

const ErrorCircle = (props) => {
  return (
    <div style={{
      ...styles.ImageContainer,
      backgroundImage: `url('/images/errorCircle.png')`,
    }} />
  );
};



enum StageStatus {
  OK,
  LOADING,
  ERROR
}

const StageItem = ({status, name, last}) => {
  if (status === StageStatus.HIDDEN) {
    return null
  }
  return (
    <div className="flex flex-row" style={last ? {} : styles.StageItem}>
      {status === StageStatus.OK && <OkCircle />}
      {status === StageStatus.LOADING && <CircularProgress color="inherit" style={{width: '24px', height: '24px'}} />}
      {status === StageStatus.ERROR && <ErrorCircle />}
      <div style={styles.StageName}>{name}</div>
    </div>
  )
}


// possible states are:
// broadcasted
// invalid
// queue
// how to found out if transaction been reverted

const statusStagesMap = {
  [OrderState.SUBMITTED]: [StageStatus.LOADING],
  [OrderState.INVALID]: [StageStatus.ERROR],
  [OrderState.BROADCASTED]: [StageStatus.OK, StageStatus.OK, StageStatus.LOADING],
  [OrderState.EXPIRED]: [StageStatus.OK, StageStatus.OK, StageStatus.ERROR],
  [OrderState.REVERTED]: [StageStatus.OK, StageStatus.OK, StageStatus.OK, StageStatus.ERROR],
  [OrderState.COMPLETED]: [StageStatus.OK, StageStatus.OK, StageStatus.OK, StageStatus.OK]
}

const stageNames = [
  ["Validation", "Order is invalid"],
  ["Broadcast"],
  ["Waiting for gas provider", "Order is expired"],
  ["Order completed", "Transaction is reverted"]
]

export const StagesFlow = ({ state }) => {
  return (
    <ul style={styles.StagesList}>
      {
        statusStagesMap[state].map((status, i) => (
          <li>
            <StageItem status={status} name={status !== StageStatus.ERROR ? stageNames[i][0] : stageNames[i][1]}/>
          </li>
        ))
      }
    </ul>
  )
}
