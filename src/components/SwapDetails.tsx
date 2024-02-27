import { TokenWidget } from './swapWidget/TokenWidget'
import { ETHWidget } from './swapWidget/ETHWidget'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

const styles = {
  TokenCard: {
    background: '#dedede',
    padding: '10px',
    'border-radius': '7px'
  }
}

export function SwapDetails({ fromToken, fromValue, toToken, toValue }) {
  return (
    <div className="flex flex-row" style={{ width: '50%', margin: 'auto'}}>
      <TokenWidget token={fromToken} value={fromValue} style={styles.TokenCard} />
      <ArrowForwardOutlinedIcon style={{ margin: 'auto' }} />
      <ETHWidget value={toValue} style={styles.TokenCard} />
    </div>
  )
}
