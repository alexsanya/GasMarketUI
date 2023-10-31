import type { NextApiRequest, NextApiResponse } from 'next'
import storage from '../../services/sqliteStorage'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res.status(404)
  }

  const result = await storage.find({}, {})
  res.status(200).json(result)
}
