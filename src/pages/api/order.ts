// @ts-nocheck

import type { NextApiRequest, NextApiResponse } from 'next'
import storage from '../../services/postgresStorage'
import validator from '../../services/validator'
import { Status } from '../../services/storage'
import { BROADCASTER_URL } from '../../config'
 
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
    // send order to broadcaster
    const response = await fetch(BROADCASTER_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({record: order}),
    })

    console.log({BROADCASTER_URL})
    console.log(JSON.stringify({record: order}))
    console.log(response)

    const { status } = await storage.store(order)
    if (status === Status.SUCCESS) {
      res.status(201).json({ status: 'SUCCESS' })
    } else {
      throw new Error('Failed to create order')
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ status: 'FAILURE' })
  }
}
