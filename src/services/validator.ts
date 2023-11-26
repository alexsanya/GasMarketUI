// @ts-nocheck

import { z } from 'zod'
import { Order } from './storage'
import { GAS_BROKER_ADDRESS, GAS_PROVIDER_ADDRESS } from '../config'
import { MIN_DEADLINE, ACCOUNT_ADDRESS_REGEX, SIGNATURE_REGEX } from '../constants'

import { viemClient } from '../wagmi'
import gasBrokerABI from '../resources/gasBrokerABI.json' assert { type: 'json' }

interface ValidationResult {
  isValid: boolean,
  errors?: any,
  order?: Order
}

const schema = z.object({
  signer: z.string().regex(ACCOUNT_ADDRESS_REGEX),
  networkId: z.number().min(1),
  token: z.string().regex(ACCOUNT_ADDRESS_REGEX),
  value: z.number().min(0),
  deadline: z.number().min(MIN_DEADLINE),
  reward: z.number().min(0),
  permitSignature: z.string(SIGNATURE_REGEX),
  rewardSignature: z.string(SIGNATURE_REGEX)
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
    const [permitV, permitR, permitS] = splitSignature(permitSignature)
    const [rewardV, rewardR, rewardS] = splitSignature(rewardSignature)

    try {
      await viemClient.simulateContract({
        address: GAS_BROKER_ADDRESS,
        abi: gasBrokerABI,
        functionName: 'swap', 
        account: GAS_PROVIDER_ADDRESS,
        args: [
          signer,
          token,
          value,
          deadline,
          reward,
          permitV,
          permitR,
          permitS,
          rewardV,
          rewardR,
          rewardS
        ],
        value: await viemClient.getBalance({ 
          address: GAS_PROVIDER_ADDRESS
        })
      })
      console.log('Order is valid')
    } catch (error) {
      console.log(error)
      return {
        isValid: false,
        error
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
