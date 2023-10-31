import { Order } from './storage'

interface ValidationResult {
  isValid: boolean,
  order?: Order
}

class Validator {
  async validate(input: any): Promise<ValidationResult> {
    return {
      isValid: true,
      order: input as Order
    }
  }
}

export default new Validator()
