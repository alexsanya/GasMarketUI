import { usePublicClient } from 'wagmi'
import { useEffect, useState } from 'react';

function useBlock() {
  const client = usePublicClient()
  const [block, setBlock] = useState<any>(null)

  useEffect(() => {
      async function fetchBlock() {
          try {
              const block = await client.getBlock()
              setBlock(block)
          } catch (error) {
              console.error('Error fetching block:', error)
          }
      }

      fetchBlock()
  }, [client])

  return block
}

export default useBlock
