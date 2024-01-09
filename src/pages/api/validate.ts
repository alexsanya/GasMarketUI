import type { NextApiRequest, NextApiResponse } from 'next'
import validator from '../../services/validator'

type ResponseData = {
  isValid: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(404)
  }
  const { isValid, order, error } = await validator.validate(req.body)
  res.status(200).json({ isValid, order, error })
}
