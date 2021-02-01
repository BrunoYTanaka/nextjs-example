import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const options = {
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        login: { label: 'Usuário de Github', type: "text", placeholder: "Informe um usuário de github" },
      },
      authorize: async (credentials) => {
        const { login } = credentials
        return axios.get(`https://api.github.com/users/${login}`)
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
      return Promise.resolve(baseUrl)
    },
  }
}
export default (req: NextApiRequest, res: NextApiResponse<any>) => NextAuth(req, res, options)
