import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { getSession } from 'next-auth/client'

interface IUser {
  name?: string | null
  email?: string | null
  image?: string | null
}
interface IResult {
  user: IUser
  data?: unknown
}

export const withAuthServerSideProps = (
  // eslint-disable-next-line no-unused-vars
  getServerSidePropsFunc?: (c: GetServerSidePropsContext) => unknown,
) => {
  return async (
    context: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<IResult>> => {
    const session = await getSession(context)
    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }
    const { user } = session
    if (getServerSidePropsFunc) {
      return { props: { user, data: await getServerSidePropsFunc(context) } }
    }
    return { props: { user } }
  }
}
