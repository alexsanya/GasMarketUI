// @ts-nocheck

import type { NextApiRequest, NextApiResponse } from 'next'
import { parseAbiItem } from 'viem'
import { CHAINS, getViemClient } from '../../wagmi'
import storage from '../../services/postgresStorage'
import { getConfig } from '../../config'


async function cleanUpOrders(networkId) {
  const latestCheckedBlock = await storage.getLatestBlock(networkId)
  const { GAS_BROKER_ADDRESS } = getConfig(networkId)
  const viemClient = getViemClient(networkId) 

  const logs = await viemClient.getLogs({  
    address: GAS_BROKER_ADDRESS,
    event: parseAbiItem('event Swap(bytes32 permitHash)'), 
    fromBlock: BigInt(latestCheckedBlock),
    toBlock: 	'latest'
  })
  
  const closedOrders = logs.map(event => event.args.permitHash)
  console.log({networkId, GAS_BROKER_ADDRESS, closedOrders, logs})

  const block = await viemClient.getBlock()

  console.log(`Cleaning orders for chain ${networkId} starting from block ${latestCheckedBlock}`)

  await storage.cleanUp(block.timestamp, closedOrders, networkId)
  return closedOrders
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(404)
  }

  const closedOrders = await Promise.all(CHAINS.map(chain => cleanUpOrders(chain.id)))


  res.status(200).json(closedOrders.reduce((result, ordersList, index) => ({
    ...result,
    [CHAINS[index].id]: ordersList
  }), {}))
}
