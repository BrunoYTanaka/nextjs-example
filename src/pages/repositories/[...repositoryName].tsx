import React from 'react'
import Repositories from '../../components/Repositories'
import api from '../../services/api'
import { WithAuth } from '../../hocs/withAuth'
import { withAuthServerSideProps } from '../../hocs/withAuthServerSideProps'
interface IUser {
  name: string
  email?: string
  image?: string
}

interface RepositoryProps {
  children: React.ReactNode,
  user: IUser
  data: {
    repository: Repository,
    issues: Issue[]
  }
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


const RepositoriesPage: React.FC = (props: RepositoryProps) => {
  return (
    <Repositories {...props} />
  )
}

export default WithAuth(RepositoriesPage)


const getRepositoryAndIssues = async ({ query }) => {
  const repositoryName = query.repositoryName as string[]

  const parsedRepositoryName = repositoryName.join('/')

  const repository = (await api.get(`repos/${parsedRepositoryName}`)).data
  const issues = (await api.get(`repos/${parsedRepositoryName}/issues`)).data

  return {
    repository,
    issues,
  }
}

export const getServerSideProps = withAuthServerSideProps(getRepositoryAndIssues)
