import { useState, useEffect } from 'react'
import { useChainId } from 'wagmi'
import { getConfig } from '../config'

function useConfig() {
  const chainId = useChainId()
  const [config, setConfig] = useState({})
  
  useEffect(() => {
    if (chainId) {
      setConfig(getConfig(chainId))
    }
  }, [chainId])

  return config
}

export default useConfig
