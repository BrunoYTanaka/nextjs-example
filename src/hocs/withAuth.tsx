import { useSession } from 'next-auth/client'
import Redirect from '../components/Redirect'
import Loading from '../components/Loading'

interface IUser {
  name: string
  email?: string
  image?: string
}

interface IProps {
  children: React.ReactNode
  data?: object,
  user?: IUser
  [x: string]: any
}

export function WithAuth(Component: React.ComponentType) {
  const authWrapper = (props: IProps) => {
    const [session, loading] = useSession()

    if (loading) {
      return <Loading />
    }

    if (!session && !loading) {
      return <Redirect to="/login" />
    }
    return (
      <Component {...props} />
    )
  }
  return authWrapper
}
