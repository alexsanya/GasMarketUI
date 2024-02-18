import { SwapFrom } from './SwapFrom'

const styles = {
  MaxButton: {
    color: '#326DC8',
    cursor: 'pointer'
  }
}

export function SwapFromPanel({ balance }) {
  return (
    <div class = "flex flex-col">
      <div class="flex flex-row justify-between" style={{ 'margin-bottom': '3px'}}>
        <div>Token and Amount</div>
        <div>Balance {balance} <span className="underline" style={styles.MaxButton}>Max</span></div>
      </div>
      <SwapFrom />
    </div>
  )
}
