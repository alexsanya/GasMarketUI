import { parseAbiItem } from 'viem'
import { publicClient } from '../../services/validator'
import storage from '../../services/sqliteStorage'
import { GAS_BROKER_ADDRESS } from '../../config'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(404)
  }

  const logs = await publicClient.getLogs({  
    address: GAS_BROKER_ADDRESS,
    event: parseAbiItem('event Swap(bytes32 permitHash)'), 
    fromBlock: `${await storage.getLatestBlock()}`,
    toBlock: 	'latest'
  })

  console.log(logs)

  const block = await publicClient.getBlock()

  console.log(`Cleaning orders starting from block ${block.timestamp}`)

  await storage.cleanUp(block.timestamp, [])

  res.status(200).json(logs)
}
