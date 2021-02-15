import React from 'react'
import { GetServerSidePropsContext } from 'next'
import Repositories from '../../components/Repositories'
import api from '../../services/api'
import { withAuthServerSideProps } from '../../hocs/withAuthServerSideProps'

interface IUser {
  name: string
  email?: string
  image?: string
}

interface IRepositoryProps {
  children: React.ReactNode
  user: IUser
  data: {
    repository: IRepository
    issues: IIssue[]
  }
}
interface IRepository {
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

interface IIssue {
  id: number
  title: string
  html_url: string
  user: {
    login: string
  }
}

const RepositoriesPage: React.FC = (props: IRepositoryProps) => {
  return <Repositories {...props} />
}

export default RepositoriesPage

const getRepositoryAndIssues = async ({
  query,
}: GetServerSidePropsContext): Promise<{
  repository: IRepository
  issues: IIssue[]
}> => {
  const repositoryName = query.repositoryName as string[]

  const parsedRepositoryName = repositoryName.join('/')

  const repository = (await api.get(`repos/${parsedRepositoryName}`)).data
  const issues = (await api.get(`repos/${parsedRepositoryName}/issues`)).data
  return {
    repository,
    issues,
  }
}

export const getServerSideProps = withAuthServerSideProps(
  getRepositoryAndIssues,
)
