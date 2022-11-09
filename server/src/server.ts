//FASTIFY
import Fastify from "fastify";
import fastifyCors from "@fastify/cors";

//PRISMA
import { PrismaClient } from '@prisma/client';

//ZOD
import { z } from 'zod';

//UNIQUE ID
import ShortUniqueId from 'short-unique-id';

const prisma = new PrismaClient({
  log: ['query']
})

async function bootstrap() {
  const fastify = Fastify({
    logger: true
  })

  await fastify.register(fastifyCors, {
    origin: true
  })
  //localhost:4444/pools/count
  fastify.get('/pools/count', async() => {
    const countPools = await prisma.pool.count()
    return {
      countPools
    }
  })
  fastify.get('/users/count', async() => {
    const countUsers = await prisma.user.count()

    return {
      countUsers
    }
  })
  fastify.get('/guesses/count', async() => {
    const countGuesses = await prisma.guess.count()

    return {
      countGuesses
    }
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

  await fastify.listen({ port: 4444, host: '0.0.0.0' })
}

bootstrap()