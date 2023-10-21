import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  status: string
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(404)
  }
  console.log(req.body)
  res.status(201).json({ status: 'Order created' })
}
