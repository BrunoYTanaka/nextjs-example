import { getSession } from 'next-auth/client'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const session = await getSession({ req })

  if (session) {
    res.status(200).json({
      message: 'You can access this content because you are signed in.',
    })
  } else {
    res.status(403).json({
      message:
        'You must be sign in to view the protected content on this page.',
    })
  }
}
