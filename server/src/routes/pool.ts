//FASTIFY
import { FastifyInstance } from "fastify"

//PRISMA
import { prisma } from "../lib/prisma"

//ZOD
import { z } from 'zod';

//UNIQUE ID
import ShortUniqueId from 'short-unique-id';


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

    await prisma.pool.create({
      data: {
        title,
        code
      }
    })

    return reply.status(201).send({ code })
  })
}