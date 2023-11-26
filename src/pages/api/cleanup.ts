// @ts-nocheck

import type { NextApiRequest, NextApiResponse } from 'next'
import { parseAbiItem } from 'viem'
import { publicClient } from '../../services/validator'
import storage from '../../services/postgresStorage'
import { GAS_BROKER_ADDRESS } from '../../config'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(404)
  }

  const latestCheckedBlock = await storage.getLatestBlock()

  const logs = await publicClient.getLogs({  
    address: GAS_BROKER_ADDRESS,
    event: parseAbiItem('event Swap(bytes32 permitHash)'), 
    fromBlock: `${latestCheckedBlock}`,
    toBlock: 	'latest'
  })
  
  const closedOrders = logs.map(event => event.args.permitHash)

  const block = await publicClient.getBlock()

  console.log(`Cleaning orders starting from block ${latestCheckedBlock}`)

  await storage.cleanUp(block.timestamp, closedOrders)

  res.status(200).json(logs)
}
