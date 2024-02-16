import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined'
import { SwapFrom } from './swapWidget/SwapFrom'
import { SwapTo } from './swapWidget/SwapTo'

export const SwapWidget = () => {
  return (
    <div className="flex flex-col w-full justify-between self-center gap-y-2">
      <SwapFrom />
      <ArrowDownwardOutlinedIcon style={{ margin: 'auto' }} />
      <SwapTo />
    </div>
  )
}

