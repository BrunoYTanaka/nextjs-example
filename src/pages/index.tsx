import React, { useState, useEffect, useCallback, FormEvent } from 'react'
import { Title, Form, Repositories, Error } from '../styles/pages/Dashboard'
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

const Dashboard: React.FC = () => {
    const [newRepo, setNewRepo] = useState('')
    const [inputError, setInputError] = useState('')
    const [repositories, setRepositories] = useState<Repository[]>(
        // () => {
        //     const storagedRepositories = localStorage.getItem('@GithubExplorer:repositories')
        //     if (storagedRepositories) {
        //         return JSON.parse(storagedRepositories)
        //     } else {
        //         return []
        //     }
        // }
        []
    )

    useEffect(() => {
        localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories))
    }, [repositories])

    const handleAddRepository = useCallback(async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()

        if (!newRepo) {
            setInputError('Digite o autor/nome do repositório')
            return
        }

        try {
            const response = await api.get<Repository>(`repos/${newRepo}`)

            setRepositories([...repositories, response.data])
            setNewRepo('')
            setInputError('')

        } catch (error) {
            setInputError('Erro na busca por esse repositório')
        }
    }, [newRepo])

    return (
        <>
            <img src="/logo.svg" alt="" />
            <Title>Explore respositórios no GitHub</Title>

            <Form onSubmit={handleAddRepository} hasError={!!inputError}>
                <input
                    placeholder="Digite o nome do repositório"
                    onChange={e => setNewRepo(e.target.value)
                    }
                    value={newRepo}
                />
                <button type="submit">Pesquisar</button>
            </Form>
            {inputError && <Error>{inputError}</Error>}
            <Repositories>
                {repositories.map(repository => {
                    return (
                        <Link href={`/repositories/${repository.full_name.replace('/', '-')}`} key={repository.full_name} >
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