//FASTIFY
import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from '@fastify/jwt'


//ROUTES
import { poolRoutes } from "./routes/pool";
import { userRoutes } from "./routes/users";
import { guessRoutes } from "./routes/guess";
import { authRoutes } from "./routes/auth";
import { gameRoutes } from "./routes/game";


async function bootstrap() {
  const fastify = Fastify({
    logger: true
  })

  await fastify.register(cors, {
    origin: true
  })

  await fastify.register(jwt, {
    secret: 'secretFromJWT'
  })
  
  fastify.register(authRoutes)
  fastify.register(gameRoutes)
  fastify.register(poolRoutes)
  fastify.register(userRoutes)
  fastify.register(guessRoutes)

  await fastify.listen({ port: 4444, host: '0.0.0.0' })
}

bootstrap()