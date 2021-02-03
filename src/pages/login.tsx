import React, { ChangeEvent, FormEvent, useState } from 'react'
import { signIn } from 'next-auth/client'
import { Container, Error } from '../styles/login'


export default function SignIn() {
  const [login, setLogin] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!login) {
      setError('Informe um usuário de github')
      return
    }
    setError('')
    setLogin('')
    await signIn('credentials', { login })
  }

  const handlechange = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value)
    setError('')
  }

  return (
    <Container isErrored={!!error}>
      <form method='post' action='/api/auth/callback/credentials' onSubmit={handleSubmit}>
        <h1>Faça seu login</h1>
        <input name='login' type='text' onChange={handlechange} placeholder="Login" value={login} />
        {error && (
          <Error>
            {error}
          </Error>
        )}
        <button type='submit'>Sign in</button>
      </form>
    </Container>
  )
}
