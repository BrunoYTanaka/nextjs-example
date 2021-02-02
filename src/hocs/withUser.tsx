import React from 'react'
import { useSession } from 'next-auth/client'
import Redirect from '../components/Redirect'
import Loading from '../components/Loading'


export const withUser = (Component: React.ComponentType) => {
  const WrapperComponent: React.FunctionComponent = (): JSX.Element =>{
    const [session, loading] = useSession()

    if (loading) {
      return (<Loading/>)
    }

    if (!session && !loading) {
      return (<Redirect to="/login" />)
    }

    return (
      <Component />
    )
  }
  return WrapperComponent
}

