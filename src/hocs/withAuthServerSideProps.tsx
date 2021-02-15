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

export const withAuthServerSideProps = <T,>(
  getServerSidePropsFunc?: (
    // eslint-disable-next-line no-unused-vars
    c: GetServerSidePropsContext,
  ) => Promise<T | IResult>,
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
      return getServerSidePropsFunc(context)
        .then(response => {
          return {
            props: {
              user,
              data: response,
            },
          }
        })
        .catch(() => {
          return {
            notFound: true,
          }
        })
    }
    return { props: { user } }
  }
}
