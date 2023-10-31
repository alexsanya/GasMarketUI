import { z } from 'zod'
import { Order } from './storage'
import { MIN_DEADLINE, ACCOUNT_ADDRESS_REGEX, SIGNATURE_REGEX } from '../constants'


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

class Validator {
  async validate(input: {[key: string]: any}): Promise<ValidationResult> {

    const response = schema.safeParse(input);
    if (!response.success) {
      return {
        isValid: false,
        errors: response.error.errors
      }
    }
    const { signer, token, value, deadline, reward, permitSignature, rewardSignature } = response.data

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
