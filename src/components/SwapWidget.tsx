import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined'
import { SwapFromPanel } from './swapWidget/SwapFromPanel'
import { SwapTo } from './swapWidget/SwapTo'

export const SwapWidget = () => {
  return (
    <div className="flex flex-col w-full justify-between self-center gap-y-2">
      <SwapFromPanel balance={4892} />
      <ArrowDownwardOutlinedIcon style={{ margin: 'auto' }} />
      <SwapTo />
    </div>
  )
}

