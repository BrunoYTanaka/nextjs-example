import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Header, RepositoryInfo, Issues, Loading } from '../../styles/pages/Repository'
import api from '../../services/api'
import { GetServerSideProps } from 'next'


interface RepositoryProps {
  repositoryName: string | string[]
}

interface Repository {
  full_name: string
  description: string
  stargazers_count: number
  forks_count: number
  open_issues_count: number
  owner: {
    login: string
    avatar_url: string
  }
}

interface Issue {
  id: number
  title: string
  html_url: string
  user: {
    login: string
  }
}

const Repositories: React.FC<RepositoryProps> = ({ repositoryName }: RepositoryProps) => {
  const [repository, setRepository] = useState<Repository | null>(null)
  const [issues, setIssues] = useState<Issue[]>([])
  const router = useRouter()

  useEffect(() => {
    const parsedRepositoryName = Array.isArray(repositoryName) ? repositoryName[0].replace('-', '/') : repositoryName.replace('-', '/')

    api.get(`repos/${parsedRepositoryName}`).then(response => {
      setRepository(response.data)
    })

    api.get(`repos/${parsedRepositoryName}/issues`).then(response => {
      setIssues(response.data)
    })
  }, [router.query])

  return (
    <>
      <Header>
        <img src="/logo.svg" alt="Github Explorer" />
        <Link href="/">
          <a>
            <FiChevronLeft size={16} />
                        Voltar
                    </a>
        </Link>
      </Header>
      {!repository && <Loading>Carregando...</Loading>}
      {repository && (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}
      <Issues>
        {issues.map(issue => (
          <a key={issue.id} href={issue.html_url}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>

  )
}

export default Repositories

export const getServerSideProps: GetServerSideProps<RepositoryProps> = async ({ query }) => {
  const { repositoryName } = query
  return {
    props: {
      repositoryName
    },
  }
}
