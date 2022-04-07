// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { setTimeout } from 'timers/promises'
import { RecipeParams } from '../../lib/types'

type Data = {
  recipes: RecipeParams[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  res.status(200).json({ recipes })
}
