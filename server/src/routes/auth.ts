import { prisma } from "../lib/prisma"
import { FastifyInstance } from "fastify"
import { z } from "zod"

export async function authRoutes(fastify: FastifyInstance){
  
  fastify.post('/users', async (request) => {
    const createUsersBody = z.object({
      access_token: z.string(),
    })

    const { access_token } = createUsersBody.parse(request.body)

    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    })

    const userData = await userResponse.json()

    const userInfoSchema = z.object({
      id: z.string(),
      email: z.string().email(),
      name: z.string(),
      picture: z.string().url() 
    })

    const userInfo = userInfoSchema.parse(userData)

    let user = await prisma.user.findUnique({
      where: {
        googleId: userInfo.id,
      }
    })

    if (!user) {
      user = prisma.user.create({
        data: {
          googleId: userInfo.id,
          name: userInfo.name,
          avatarUrl: userInfo.picture,
          email: userInfo.email,
          id: '123teste',
          createdAt: ''
        }
      })
    }

    const token = fastify.jwt.sign(
      {
        name: user?.name,
        avatarUrl: user?.avatarUrl
      },
      {
        sub: user?.id,
        expiresIn: '1 day'
      }
    )

    return { token }
  })
}