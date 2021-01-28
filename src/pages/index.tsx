import React, { useState, useEffect, useCallback, FormEvent } from 'react'
import useSWR from 'swr'
import { Title, Form, Repositories, Error, Loading } from '../styles/dashboard'
import { FiChevronRight } from 'react-icons/fi'
import api from '../services/api'
import Link from 'next/link'

interface Repository {
  description: string
  full_name: string
  owner: {
    login: string
    avatar_url: string
  }
}

const getDataLocalStorage = (key: string) => localStorage.getItem(key)

const Dashboard: React.FC = () => {
  const { data } = useSWR('@GithubExplorer:repositories', getDataLocalStorage)
  const [newRepo, setNewRepo] = useState('')
  const [inputError, setInputError] = useState('')
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (data) {
      setRepositories(JSON.parse(data))
    } else {
      setRepositories([])
    }
  }, [data])

  useEffect(() => {
    localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories))
  }, [repositories])

  const handleAddRepository = useCallback(async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    if (!newRepo) {
      setInputError('Digite o autor/nome do repositório')
      return
    }

    setLoading(true)
    try {
      const response = await api.get<Repository>(`repos/${newRepo}`)

      setRepositories([...repositories, response.data])
      setNewRepo('')
      setInputError('')

    } catch (error) {
      setInputError('Erro na busca por esse repositório')
    } finally {
      setLoading(false)
    }
  }, [newRepo])

  return (
    <>
      <Title>Explore respositórios no GitHub</Title>

      <Form onSubmit={handleAddRepository} hasError={!!inputError}>
        <input
          placeholder="Digite o nome do repositório"
          onChange={e => setNewRepo(e.target.value)
          }
          value={newRepo}
        />
        {loading ? <Loading>Carregando...</Loading> : <button type="submit">Pesquisar</button>}
      </Form>
      {inputError && <Error>{inputError}</Error>}
      <Repositories>
        {repositories.map(repository => {
          return (
            <Link href={`/repositories/${repository.full_name}`} key={repository.full_name} >
              <a >
                <img src={repository.owner.avatar_url} alt={repository.owner.login} />
                <div>
                  <strong>
                    {repository.full_name}
                  </strong>
                  <p>{repository.description}</p>
                </div>
                <FiChevronRight size={20} />
              </a>
            </Link>

          )
        })}
      </Repositories>
    </>
  )
}

export default Dashboard
