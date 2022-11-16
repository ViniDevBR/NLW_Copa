//FASTIFY
import { FastifyInstance } from "fastify"

//PRISMA
import { prisma } from "../lib/prisma"

//ZOD
import { z } from 'zod';

//UNIQUE ID
import ShortUniqueId from 'short-unique-id';
import { authenticate } from "../plugins/authenticate";


export async function poolRoutes(fastify: FastifyInstance){

  //localhost:4444/pools/count
  fastify.get('/pools/count', async() => {
    const countPools = await prisma.pool.count()

    return { countPools }
  })

  fastify.post('/pools', async(request, reply) => {
    const createPoolBody = z.object({
      title: z.string(),
    })

    const { title } = createPoolBody.parse(request.body)
    const generate = new ShortUniqueId({ length: 6 })
    const code = String(generate()).toUpperCase()


    try {
      await request.jwtVerify()

      await prisma.pool.create({
        data: {
          title,
          code,
          ownerId: request.user.sub,

          participants: {
            create: {
              userId: request.user.sub
            }
          }
        }
      })
    } catch {
      await prisma.pool.create({
        data: {
          title,
          code,
          ownerId: request.user.sub
        }
      })
    }

    return reply.status(201).send({ code })
  })

  fastify.post('/pools/join', {onRequest: [authenticate]}, async (request, reply) => {
    const joinPoolBody = z.object({
      code: z.string()
    })

    const { code } = joinPoolBody.parse(request.body)

    const pool = await prisma.pool.findUnique({
      where: {
        code,
      },
      include: {
        participants: {
          where: {
            userId: request.user.sub
          }
        }
      }
    })

    if(!pool) {
      return reply.status(400).send({
        message: 'Poll not found'
      })
    }

    if(pool.participants.length > 0){
      return reply.status(205).send({
        message: 'Você ja é um participante'
      })
    }

    if(!pool.ownerId){
      await prisma.pool.update({
        where: {
          id: pool.id
        },
        data: {
          ownerId: request.user.sub
        }
      })
    }

    await prisma.participants.create({
      data: {
        poolId: pool.id,
        userId: request.user.sub
      }
    })

    return reply.status(201).send()
  })

  fastify.get('/pools', {onRequest: [authenticate]}, async (request) => {
    const pools = await prisma.pool.findMany({
      where: {
        participants: {
          some: {
            userId: request.user.sub
          }
        }
      },
      include: {
        _count: {
          select: {
            participants: true
          }
        },
        participants: {
          select: {
            id: true,

            users: {
              select: {
                avatarUrl: true
              }
            }
          },
          take: 4
        },
        owner: {
          select: {
            name: true,
            id: true
          }
        }
      }
    })

    return { pools }
  })

  fastify.get('/pools/:poolId', {onRequest: [authenticate]}, async (request, reply) => {
    const getPoolParams = z.object({
      poolId: z.string()
    })

    const { poolId } = getPoolParams.parse(request.params)

    const pool = await prisma.pool.findFirst({
      include: {
        _count: {
          select: {
            participants: true
          }
        },
        participants: {
          select: {
            id: true,

            users: {
              select: {
                avatarUrl: true
              }
            }
          },
          take: 4
        },
        owner: {
          select: {
            name: true,
            id: true
          }
        }
      },
      where: {
        id: poolId,
        participants: {
          some: {
            userId: request.user.sub
          }
        }
      },
    })

    return { pool }
  })
}