import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { NextApiRequest, NextApiResponse } from 'next'
import api from '../../../services/api'

const options = {
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        login: { label: 'Usuário de Github', type: "text", placeholder: "Informe um usuário de github" },
      },
      authorize: async (credentials) => {
        const { login } = credentials
        return api.get(`/users/${login}`)
          .then((response) => {
            return response.data
          }).catch((error) => {
            console.error('AUTH ERROR: ', error);
            return null
          })
      },
    })
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login'
  },
  callbacks: {
    redirect: async (url: string, baseUrl: string) => {
      return baseUrl
    },
  }
}
export default (req: NextApiRequest, res: NextApiResponse<any>) => NextAuth(req, res, options)
