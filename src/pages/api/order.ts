import type { NextApiRequest, NextApiResponse } from 'next'
import storage from '../../services/sqliteStorage'
import validator from '../../services/validator'
import { Status } from '../../services/storage'
 
type ResponseData = {
  status: string
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(404)
  }
  const { order, errors, isValid } = await validator.validate(req.body)
  if (!isValid) {
    return res.status(400).json({ status: 'BAD REQUEST', errors })
  }
  try {
    const { status } = await storage.store(order)
    if (status === Status.SUCCESS) {
      res?.socket?.server?.io?.emit("message", order)
      res.status(201).json({ status: 'SUCCESS' })
    } else {
      throw new Error('Failed to create order')
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ status: 'FAILURE' })
  }
}
