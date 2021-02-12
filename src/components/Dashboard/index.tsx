import React, {
  useState,
  useEffect,
  useCallback,
  FormEvent,
  forwardRef,
  createRef,
  useMemo,
  Fragment,
} from 'react'
import useSWR from 'swr'
import { FiChevronRight, FiXCircle } from 'react-icons/fi'
import NextLink, { LinkProps } from 'next/link'
import { Title, Form, Repositories, Error, Loading } from './styles'
import api from '../../services/api'

interface IProps extends LinkProps {
  children: React.ReactNode
  href: string
}
const Link = forwardRef<HTMLAnchorElement, IProps>(
  ({ children, href, ...rest }: IProps, ref) => (
    <NextLink href={href}>
      <a ref={ref} {...rest}>
        {children}
      </a>
    </NextLink>
  ),
)

interface Repository {
  id: number
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

  const [hasNewElement, setHasNewElement] = useState(false)

  const refs = useMemo(
    () => repositories.map(() => createRef<HTMLAnchorElement>()),
    [repositories],
  )

  useEffect(() => {
    if (data) {
      setRepositories(JSON.parse(data))
    } else {
      setRepositories([])
    }
  }, [data])

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories),
    )
  }, [repositories])

  const handleAddRepository = useCallback(
    async (event: FormEvent<HTMLFormElement>): Promise<void> => {
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
        setHasNewElement(true)
      } catch (error) {
        setInputError('Erro na busca por esse repositório')
      } finally {
        setLoading(false)
      }
    },
    [newRepo, repositories],
  )

  const handleRemoveRepository = useCallback(
    (repository: Repository) => {
      const newRepositories = repositories.filter(
        repo => repo.id !== repository.id,
      )

      setRepositories(newRepositories)
    },
    [repositories],
  )

  useEffect(() => {
    if (hasNewElement && refs[refs.length - 1].current) {
      refs[refs.length - 1].current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
      })
      setHasNewElement(false)
    }
  }, [refs, hasNewElement])

  return (
    <>
      <Title>Explore respositórios no GitHub</Title>
      <Form onSubmit={handleAddRepository} hasError={!!inputError}>
        <input
          placeholder="Digite o nome do repositório"
          onChange={e => setNewRepo(e.target.value)}
          value={newRepo}
        />
        {loading ? (
          <Loading>Carregando...</Loading>
        ) : (
          <button type="submit">Pesquisar</button>
        )}
      </Form>
      {inputError && <Error>{inputError}</Error>}
      <Repositories>
        {repositories.map((repository, index) => {
          return (
            <div key={repository.full_name}>
              <button
                type="button"
                onClick={() => handleRemoveRepository(repository)}
              >
                <FiXCircle />
              </button>
              <Link
                ref={refs[index]}
                href={`/repositories/${repository.full_name}`}
              >
                <img
                  src={repository.owner.avatar_url}
                  alt={repository.owner.login}
                />
                <div>
                  <strong>{repository.full_name}</strong>
                  <p>{repository.description}</p>
                </div>
                <FiChevronRight size={20} />
              </Link>
            </div>
          )
        })}
      </Repositories>
    </>
  )
}

export default Dashboard
