import React, { ChangeEvent, FormEvent, useState } from 'react'
import { signIn } from 'next-auth/client'
import { Container, Error, Loading } from '../styles/login'

const SignIn: React.FC = () => {
  const [login, setLogin] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!login) {
      setError('Informe um usuário de github')
      return
    }
    setIsLoading(true)
    setError('')
    setLogin('')
    signIn('credentials', { login })
  }

  const handlechange = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value)
    setError('')
  }

  return (
    <Container isErrored={!!error}>
      <form
        method="post"
        action="/api/auth/callback/credentials"
        onSubmit={handleSubmit}
      >
        <h1>Faça seu login</h1>
        <input
          name="login"
          type="text"
          onChange={handlechange}
          placeholder="Login"
          value={login}
        />
        {error && <Error>{error}</Error>}
        {isLoading ? (
          <Loading>
            <span>Carregando...</span>
          </Loading>
        ) : (
          <button type="submit">Sign in</button>
        )}
      </form>
    </Container>
  )
}
export default SignIn
