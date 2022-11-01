//FASTIFY
import Fastify from "fastify";
import fastifyCors from "@fastify/cors";

//PRISMA
import { PrismaClient } from '@prisma/client'

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

  await fastify.listen({ port: 4444, host: '0.0.0.0' })
}

bootstrap()