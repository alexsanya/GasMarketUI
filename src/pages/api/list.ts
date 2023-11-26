// @ts-nocheck

import { z } from 'zod'
import type { NextApiRequest, NextApiResponse } from 'next'
import storage from '../../services/postgresStorage'
import { ACCOUNT_ADDRESS_REGEX } from '../../constants'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(404)
  }

  const range = z.object({ from: z.number().min(0).optional(), to: z.number().min(0).optional() })
  const filterSchema = z.object({
    signers: z.array(z.string().regex(ACCOUNT_ADDRESS_REGEX)).optional(),
    tokens: z.array(z.string().regex(ACCOUNT_ADDRESS_REGEX)).optional(),
    value: range.optional(),
    deadline: range.optional(),
    reward: range.optional()
  })
  const paginationSchema = z.object({
    limit: z.number().min(0).optional(),
    offset: z.number().min(0).optional()
  })

  const schema = z.object({
    filter: filterSchema.optional(),
    pagination: paginationSchema.optional()
  })

  const response = schema.safeParse(JSON.parse(JSON.stringify(req.body).toLowerCase()));
  if (!response.success) {
    return res.status(400).json({ status: 'BAD REQUEST', errors: response.error.errors })
  }

  const { filter, pagination } = response.data

  const result = await storage.find(filter ?? {}, pagination ?? {})
  res.status(200).json(result)
}
