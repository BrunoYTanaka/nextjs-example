import { getSession } from 'next-auth/client'

export const withAuthServerSideProps = (getServerSidePropsFunc?: Function) => {
  return async (context: any) => {
    const session = await getSession(context);
    if (!session) {
      return {
        redirect: {
          destination: '/login'
        }
      }
    }
    const { user } = session
    if (getServerSidePropsFunc) {
      return { props: { user, data: await getServerSidePropsFunc(context) } };
    }
    return { props: { user } }
  }
}
