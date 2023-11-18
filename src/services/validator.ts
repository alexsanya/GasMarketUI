import { z } from 'zod'
import { polygon } from 'wagmi/chains'
import { secp256k1 } from '@noble/curves/secp256k1'
import { Order } from './storage'
import { GAS_BROKER_ADDRESS } from '../config'
import { MIN_DEADLINE, ACCOUNT_ADDRESS_REGEX, SIGNATURE_REGEX } from '../constants'

import { defineChain, createPublicClient, http, keccak256 } from 'viem'
import { mainnet } from 'viem/chains'
import gasBrokerABI from '../resources/gasBrokerABI.json' assert { type: 'json' }

export const localFork = defineChain({
  id: polygon.id,
  name: 'Local',
  network: 'local',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:8545']
    }
  }
})

interface ValidationResult {
  isValid: boolean,
  errors?: any,
  order?: Order
}

const schema = z.object({
  signer: z.string().regex(ACCOUNT_ADDRESS_REGEX),
  token: z.string().regex(ACCOUNT_ADDRESS_REGEX),
  value: z.number().min(0),
  deadline: z.number().min(MIN_DEADLINE),
  reward: z.number().min(0),
  permitSignature: z.string(SIGNATURE_REGEX),
  rewardSignature: z.string(SIGNATURE_REGEX)
})


export const publicClient = createPublicClient({
  chain: (process.env.NODE_ENV === 'development') ? localFork : mainnet,
  transport: http()
})

export function splitSignature(signatureHex: string) {
  const rawSig = signatureHex.split('x')[1]
  return [
    `0x${rawSig.slice(-2)}`,
    `0x${rawSig.slice(0,64)}`, 
    `0x${rawSig.slice(64,-2)}`
  ]
}

class Validator {
  async validate(input: {[key: string]: any}): Promise<ValidationResult> {



    // validate schema
    const response = schema.safeParse(input);
    if (!response.success) {
      return {
        isValid: false,
        errors: response.error.errors
      }
    }
    const { signer, token, value, deadline, reward, permitSignature, rewardSignature } = response.data

    // validate using on-chain data
    const [permitV, permitR, permitS] = splitSignature(permitSignature)
    const [rewardV, rewardR, rewardS] = splitSignature(rewardSignature)
    const permitHash = keccak256(permitSignature)
    const verifyPermit = publicClient.readContract({
      address: GAS_BROKER_ADDRESS,
      abi: gasBrokerABI,
      functionName: 'verifyPermit',
      args: [
        signer,
        token,
        value,
        deadline,
        permitV,
        permitR,
        permitS
      ]
    })


    console.log({
      signer,
      reward,
      permitHash,
      rewardV,
      rewardR,
      rewardS
    })

    const verifyReward = publicClient.readContract({
      address: GAS_BROKER_ADDRESS,
      abi: gasBrokerABI,
      functionName: 'verifyReward',
      args: [
        signer,
        reward,
        permitHash,
        rewardV,
        rewardR,
        rewardS
      ]
    })

    try {
      const [permitStatus, isRewardValid] = await Promise.all([verifyPermit, verifyReward])
      if (permitStatus !== 'VALID') {
        return {
          isValid: false,
          errors: permitStatus
        }
      }
      if (!isRewardValid) {
        return {
          isValid: false,
          errors: 'Reward signature is invalid'
        }
      }
    } catch (errors) {
      console.log(errors)
      return {
        isValid: false,
        errors
      }
    }


    return {
      isValid: true,
      order: {
        ...response.data,
        signer: signer.toLowerCase(),
        token: token.toLowerCase(),
        permitSignature: permitSignature.toLowerCase(),
        rewardSignature: rewardSignature.toLowerCase()
      }
    }
  }
}

export default new Validator()
