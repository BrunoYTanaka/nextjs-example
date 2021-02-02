import { GetServerSideProps } from 'next'
import React from 'react'
import Repositories from '../../components/Repositories'
import api from '../../services/api'

interface RepositoryProps {
  repository: Repository,
  issues: Issue[]
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


const RepositoriesPage = (props: RepositoryProps) => {
  return (
    <Repositories {...props} />
  )
}

export default RepositoriesPage

export const getServerSideProps: GetServerSideProps<RepositoryProps> = async ({ query }) => {

  const repositoryName = query.repositoryName as string[]

  const parsedRepositoryName = repositoryName.join('/')

  const repository = (await api.get(`repos/${parsedRepositoryName}`)).data
  const issues = (await api.get(`repos/${parsedRepositoryName}/issues`)).data

  return {
    props: {
      repository,
      issues,
    },
  }
}
